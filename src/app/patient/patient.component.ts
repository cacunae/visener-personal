import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../pages/popup/popup.component';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public posts:any[] = [];
  public treatments:any[] = [];
  public comment:string = "";
  public user:any;
  public idPaciente:any;
  public loadingTreatments:boolean = false;
  public texto:any[] = ["Hola"];
  
  id:any;
  interaction:any;
  todayDate:Date = new Date();
  d = new Date();
  n = this.d.getDay();
  day:any;

  constructor(public http: HttpClient, public post: MatDialog, public dialog: MatDialog, public router: Router, public dataService: DataService, public zone: NgZone) {
    moment.locale('es');
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.user = this.dataService.user;
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
    this.mensaje();
  }
  
  mensaje(){
    let nombre: string = this.user.name;
    if(this.d.getHours() <= 12){
      this.texto[0] = "Buenos días, " + nombre.split(" ")[0] + " ¿qué tal te va?";
    } else if(this.d.getHours() >= 12 && this.d.getHours() < 19){
      this.texto[0] = "Buenas tardes, " + nombre.split(" ")[0] + " ¿no tienes ninguna tarea pendiente?.";
    } else if(this.d.getHours() >= 19){
      this.texto[0] = "Buenas noches, " + nombre.split(" ")[0] + " ¿cómo estuvo tu día?";
    }
  }

  cerrarSaludo(){
    document.getElementById("saludo").style.display = "none";
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
      for (let index in this.posts) {
        this.posts[index].value = this.posts[index].doc;
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
          if (polls.rows && polls.rows.length > 0) {
            if ((interaction.params.poll.type=='slider' || interaction.params.poll.type=='slider2') && interaction.params.series == polls.rows.length) {
              interaction.params.poll.areOk = false;
              interaction.params.poll.sliderQuestion = true;
            }else if ((interaction.params.poll.type=='slider' || interaction.params.poll.type=='slider2') && interaction.params.series < polls.rows.length) {
              interaction.params.poll.areOk = false;
            }else if ((interaction.params.poll.type != 'slider' || interaction.params.poll.type != 'slider2') && interaction.params.iterations <= polls.rows.length) {
              interaction.params.poll.areOk = false;
            }else{
              interaction.params.poll.areOk = true;
            }  
          }else{
            interaction.params.poll.areOk = true;
          }
        });
 
        /* Elimina aquellas tareas que no sean de este día particular */
        await this.dataService.getData("/" + interaction._id).then((response) => {
          interaction.detail = response;
          if(interaction.detail.weekdays.findIndex((day:string) => day.toLowerCase().replace('é', 'e') === moment().format('dddd').toLowerCase().replace('é', 'e') ) < 0){
            interaction.params.poll.areOk = false;
          }
        });
      }
    }
    this.treatments = tmpTreatments;
    this.loadingTreatments = false;

    /* Añade los post de los tratamientos activos al muro */
    for(let treatment of this.treatments){
      this.dataService.getData("/" + treatment.program).then((program:any) => {
        for(let post of program.posts){
          if(now >= moment(treatment.startDate).add(post.params.init-1, 'day').format("YYYYMMDD") && now <= moment(treatment.startDate).add(post.params.init-1, 'day').add(post.params.long, 'day').format("YYYYMMDD")){
            this.dataService.getData("/" + post._id).then((result:any) => {
                this.posts.push({comments: [], value: result, doc: {liked:false, likes: 0, value: result}});
            });
          }
        }
      });
    }
    
    this.posts.sort((a:any, b:any) => { return Number(a.doc.datetime) - Number(b.doc.datetime) });

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

  putPost(postId:string) {
    let post:any = {};
    this.dataService.getData("/" + postId).then((response) => {
      if(this.posts[0].value._id !== postId){
        this.posts.unshift({ value: response });
      }
    });
  }

}
