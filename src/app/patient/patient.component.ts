import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../pages/popup/popup.component';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public posts:any[] = [];
  public treatments:any[] = [];
  public comment:string = "";
  public usuario:any;
  public idPaciente:any;
  public loadingTreatments:boolean = false;

  id:any;
  interaction:any;
  todayDate:Date = new Date();
  d = new Date();
  n = this.d.getDay();
  day:any;

  constructor(public http: HttpClient, public post: MatDialog, public dialog: MatDialog, public router: Router, public dataService: DataService) {
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.usuario = this.dataService.user;
      switch (new Date().getDay()) {
        case 1: this.day = "Lunes"; break;
        case 2: this.day = "Martes"; break;
        case 3: this.day = "Miércoles"; break;
        case 4: this.day = "Jueves"; break;
        case 5: this.day = "Viernes"; break;
        case 6: this.day = "Sabado"; break;
        case 7: this.day = "Domingo";
      }
    }
  }

  ngOnInit(): void {
    this.getPosts();
    this.getTreatments();
  }

  popup() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: { comment: this.comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment = result;
    });
  }

  cerrarSesion() {
    this.dataService.user = null;
    localStorage.clear();
  }

  getPosts() {
    this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.dataService.user._id + "\"&include_docs=true").then((posts: any) => {
      this.posts = posts.rows.sort((a:any, b:any) => { return Number(a.doc.datetime) - Number(b.doc.datetime) });
      console.log("posts", posts);
      for (let index in this.posts) {
        this.posts[index].value = this.posts[index].doc;
        this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.posts[index].value._id + "\"").then((likes: any) => {
          this.posts[index].likes = likes.rows.length;
          this.posts[index].liked = 'false';
          if (likes.rows.length > 0) {
            for(let like of likes.rows){
              if(like.value.patient == this.dataService.user._id){
                this.posts[index].liked = 'true';
                this.posts[index].like = { _id: like.value._id, _rev: like.value._rev };
              }
            }
          }
        });
        this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + this.posts[index].value._id + "\"").then((comments: any) => {
          this.posts[index].comments = [];
          comments.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
          for (let comment of comments.rows) {
            this.posts[index].comments.push({ name: comment.value.name, text: comment.value.text });
          }
        });
      }
    });
  }

  async getTreatments() {
    this.loadingTreatments = true;
    let tmpTreatments = [];
    let now = moment().format("YYYYMMDD");
    await this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.dataService.user._id + "\"").then((treatments: any) => {
      for(let treatment of treatments.rows){
        if(now >= moment(treatment.value.doc.startDate).format("YYYYMMDD") && now <= moment(treatment.value.doc.endDate).format("YYYYMMDD") && treatment.value.doc.interactions.length>0){
          tmpTreatments.push(treatment.value.doc);
        }
      }
      tmpTreatments = tmpTreatments.sort((a:any, b:any) => { return Number(b.datetime) - Number(a.datetime) });
    });
    for(let treatment of tmpTreatments){
      for(let interaction of treatment.interactions){
        await this.dataService.getData("/_design/view/_view/polls-by-interaction?key=[\"" + treatment._id + "\",\"" + interaction._id + "\",\"" + moment().format("YYYYMMDD") + "\"]").then((polls: any) => {
          interaction.responses = polls.rows.length + 1;
          console.log("interaction: type:" + interaction.params.poll.type + ", iterations:" + interaction.params.iterations + ", series:" + interaction.params.series + ", responses:" + polls.rows.length + ', condition:' + (interaction.params.poll.type!='slider' && interaction.params.iterations < polls.rows.length))
          if (polls.rows && polls.rows.length > 0) {
            if (interaction.params.poll.type=='slider' && interaction.params.series == polls.rows.length) {
              interaction.params.poll.areOk = false;
              interaction.params.poll.sliderQuestion = true;
            }else if (interaction.params.poll.type=='slider' && interaction.params.series < polls.rows.length) {
              interaction.params.poll.areOk = false;
            }else if (interaction.params.poll.type != 'slider' && interaction.params.iterations <= polls.rows.length) {
              interaction.params.poll.areOk = false;
            }else{
              interaction.params.poll.areOk = true;
            }  
          }else{
            interaction.params.poll.areOk = true;
          }
        });

        await this.dataService.getData("/" + interaction._id).then((response) => {
          interaction.detail = response;
        });
      }
    }
    console.log(tmpTreatments);
    this.treatments = tmpTreatments;
    this.loadingTreatments = false;
  }

  responseInteraction(interaction: any, treatment: any) {
    let feedback = {
      entity: "poll", 
      treatment: treatment._id, 
      interaction: interaction.detail._id, 
      patient: this.dataService.user._id,
      question: interaction.params.poll.question, 
      slider: interaction.params.poll.slider, 
      sliderend: interaction.params.poll.sliderend,
      slidermax: interaction.params.poll.repetitions, 
      state: interaction.params.poll.state, 
      yesno: interaction.params.poll.yesno, 
      datetime: moment().format('YYYYMMDDHHmmss'), 
      date: moment().format('YYYYMMDD') 
    };
    this.http.post(this.dataService.databaseAPI, feedback).subscribe((result: any) => {
      if (result.ok) {
        this.getTreatments();
      }
    });
  }

  async putPost(postId:string) {
    let post:any = {};
    await this.dataService.getData("/" + postId).then((response) => {
      post = { value: response };
    });
    if(this.posts[0].value._id !== post.value._id){
      this.posts.unshift(post);
      let index = 0;
      this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.posts[index].value._id + "\"").then((likes: any) => {
        if (likes.rows.length > 0) {
          this.posts[index].liked = 'true';
          this.posts[index].like = { _id: likes.rows[0].value._id, _rev: likes.rows[0].value._rev };
        } else {
          this.posts[index].liked = 'false';
        }
      });
      this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + this.posts[index].value._id + "\"").then((comments: any) => {
        this.posts[index].comments = [];
        comments.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
        for (let comment of comments.rows) {
          this.posts[index].comments.push({ name: comment.value.name, text: comment.value.text });
        }
      });
    }
  }

}
