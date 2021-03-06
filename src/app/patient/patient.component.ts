import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../pages/popup/popup.component';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EnableComponent } from './enable.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { PopupConfigurationComponent } from '../pages/popup-configuration/popup-configuration.component';
import { NgLocalization } from '@angular/common';
import { getMatIconNameNotFoundError } from '@angular/material/icon';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  public posts: any[] = [];
  public treatments: any[] = [];
  public comment: string = "";
  public user: any;
  public idPaciente: any;
  public loadingTreatments: boolean = false;
  public texto: any[] = ["Hola"];
  mentions: any[] = [];
  mention: any [] = [];
  patientName: any[] = [];
  postTitle: any[] = [];
  id: any;
  interaction: any;
  todayDate: Date = new Date(moment().format('DDMMYYYY'));
  d = new Date();
  n = this.d.getDay();
  day: any;
  hidden: boolean = false;
  currentDay: any = new Date();
  dateTime: any;
  programs:any[] = [];
  invitations: any[] = [];
  patients:any[] = [];
  treatment:any = {};
  interactions:any[] = [];
  patientId:any;
  notificationLength: number = 0;

  constructor(public http: HttpClient, public post: MatDialog, public dialog: MatDialog, public router: Router, public dataService: DataService, public zone: NgZone, public snackBar: MatSnackBar) {
    moment.locale('es');
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.user = this.dataService.user;
      switch (new Date().getDay()) {
        case 1: this.day = "Lunes"; break;
        case 2: this.day = "Martes"; break;
        case 3: this.day = "Mi??rcoles"; break;
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
    this.getEnable();
    this.getMentions();
    this.getChallenges()
  }

  mensaje() {
    let nombre: string = this.user.name;
    if (this.d.getHours() <= 12) {
      this.texto[0] = "Buenos d??as, " + nombre.split(" ")[0] + " ??qu?? tal te va?";
    } else if (this.d.getHours() >= 12 && this.d.getHours() < 19) {
      this.texto[0] = "Buenas tardes, " + nombre.split(" ")[0] + " ??no tienes ninguna tarea pendiente?.";
    } else if (this.d.getHours() >= 19) {
      this.texto[0] = "Buenas noches, " + nombre.split(" ")[0] + " ??c??mo estuvo tu d??a?";
    }
  }

  cerrarSaludo() {
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

  popupConfiguration() {
    const dialogRef = this.dialog.open(PopupConfigurationComponent, {
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
      this.posts = posts.rows.sort((a: any, b: any) => { return Number(a.doc.datetime) - Number(b.doc.datetime) });
      for (let index in this.posts) {
        for (let post of this.posts) {
          if (post.value.doc) {
            if (post.value.doc.startDate > moment().format("DDMMYYYY")) {
              var indice = this.posts.indexOf(post.value.doc._id);
              this.posts.splice(indice, 1);
              this.posts[index].value = this.posts[index].doc;
            } else if (post.value.doc.startDate == moment().format("DDMMYYYY")) {
              this.posts[index].value = this.posts[index].doc;
            } else {
              this.posts[index].value = this.posts[index].doc;
            }
          } else {
            this.posts[index].value = this.posts[index].doc;
          }
        }
      }
    }).then((a) => {
      for (let iterator of this.posts) {
        if (iterator.doc.invitation) {
          
          this.posts.unshift(this.posts.splice(this.posts.findIndex(item => item._id === iterator.value._id), 1)[0]); 
        }
      } 
    })
  }

  async getTreatments() {
    this.loadingTreatments = true;
    let tmpTreatments = [];
    let now = moment().format("YYYYMMDD");
    await this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.dataService.user._id + "\"").then((treatments: any) => {
      for (let treatment of treatments.rows) {
        if (now >= moment(treatment.value.doc.startDate).format("YYYYMMDD") && now <= moment(treatment.value.doc.endDate).format("YYYYMMDD") && treatment.value.doc.interactions.length > 0) {
          tmpTreatments.push(treatment.value.doc);
        }
      }
      tmpTreatments = tmpTreatments.sort((a: any, b: any) => { return Number(b.datetime) - Number(a.datetime) });
    });
    for (let treatment of tmpTreatments) {
      for (let interaction of treatment.interactions) {
        await this.dataService.getData("/_design/view/_view/polls-by-interaction?key=[\"" + treatment._id + "\",\"" + interaction._id + "\",\"" + moment().format("YYYYMMDD") + "\"]").then((polls: any) => {
          interaction.responses = polls.rows.length + 1;
          if (polls.rows && polls.rows.length > 0) {
            if ((interaction.params.poll.type == 'slider' || interaction.params.poll.type == 'slider2') && interaction.params.series == polls.rows.length) {
              interaction.params.poll.areOk = false;
              interaction.params.poll.sliderQuestion = true;
            } else if ((interaction.params.poll.type == 'slider' || interaction.params.poll.type == 'slider2') && interaction.params.series < polls.rows.length) {
              interaction.params.poll.areOk = false;
            } else if ((interaction.params.poll.type != 'slider' || interaction.params.poll.type != 'slider2') && interaction.params.iterations <= polls.rows.length) {
              interaction.params.poll.areOk = false;
            } else {
              interaction.params.poll.areOk = true;
            }
          } else {
            interaction.params.poll.areOk = true;
          }
        });

        /* Elimina aquellas tareas que no sean de este d??a particular */
        await this.dataService.getData("/" + interaction._id).then((response) => {
          interaction.detail = response;
          if (interaction.detail.weekdays.findIndex((day: string) => day.toLowerCase().replace('??', 'e') === moment().format('dddd').toLowerCase().replace('??', 'e')) < 0) {
            interaction.params.poll.areOk = false;
          }
        });
      }
    }
    this.treatments = tmpTreatments;
    this.loadingTreatments = false;

    /* A??ade los post de los tratamientos activos al muro */
    for (let treatment of this.treatments) {
      this.dataService.getData("/" + treatment.program).then((program: any) => {
        for (let post of program.posts) {
          if (now >= moment(treatment.startDate).add(post.params.init - 1, 'day').format("YYYYMMDD") && now <= moment(treatment.startDate).add(post.params.init - 1, 'day').add(post.params.long, 'day').format("YYYYMMDD")) {
            this.dataService.getData("/" + post._id).then((result: any) => {
              this.posts.push({ comments: [], value: result, doc: { liked: false, likes: 0, value: result } });
            });
          }
        }
      });
    }

    //this.posts.sort((a: any, b: any) => { return Number(a.doc.datetime) - Number(b.doc.datetime) });

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
        location.reload();
      }
    });
  }

  putPost(postId: string) {
    let post: any = {};
    let temp: any[] = []
    var myDiv = document.getElementById('main');
    myDiv.scrollTop = 0;
    this.dataService.getData("/" + postId).then((response) => {
      for (let index in this.posts) {
        if (this.posts[index].value._id === postId) {
          temp.push(this.posts[index].value._id)
        }
      }
      if (temp.includes(postId)) {
        this.posts.unshift(this.posts.splice(this.posts.findIndex(item => item.value._id === postId), 1)[0]);
      } else {
        this.posts.unshift({ value: response });
      }
    });
  }


  getEnable() {
    if (this.user.enabled == "false" && this.user.entity == "patient") {
      const dialogRef = this.dialog.open(EnableComponent, {
        width: '1000px'
      });
    } else if (this.user.enabled == undefined || this.user.enabled == null) {
      this.snackBar.open('Hemos hecho una actualizaci??n a nuestros t??rminos y condiciones.', 'OK', { duration: 5000 });
    }
  }

  toggleBadgeVisibility(mention: any) {
    console.log("mentionToggle:", mention)
    this.hidden = false;
    if(mention.value.viewed == false){
      this.notificationLength = this.notificationLength - 1;
    }
    mention.value.viewed = true;
    this.dataService.postData(mention.value);
  }

  viewComment(postId: any) {
    var myDiv = document.getElementById('main');
    myDiv.scrollTop = 0;
    let temp: any[] = [];
    this.dataService.getData("/" + postId).then((response) => {
      for (let index in this.posts) {
        if (this.posts[index].value._id === postId) {
          temp.push(this.posts[index].value._id)
        }
      }
      if (temp.includes(postId)) {
        this.posts.unshift(this.posts.splice(this.posts.findIndex(item => item.value._id === postId), 1)[0]);
      } else {
        this.posts.unshift({ value: response });
      }
    });
  }

  getChallenges(){
    this.dataService.getData("/_design/view/_view/challenges-invitation?key=\"" + this.dataService.user._id + "\"").then((invitations:any)=>{
      this.invitations = invitations.rows;
      if(this.invitations){
        for(let invitation of invitations.rows){
          this.dataService.getData("/"+invitation.value.program).then((programs:any)=>{
            this.programs.push(programs);
          })
          this.dataService.getData("/"+invitation.value.patient).then((patient:any)=>{
            this.patients.push(patient);
          })
        }
      }
    })
  }

  getMentions() {
    let temp: any[] = []
    this.notificationLength = 0;
    this.dataService.getData("/_design/view/_view/comments-by-mention?key=\"" + this.dataService.user._id + "\"").then((mentions: any) => {
      if (mentions.rows.length > 0) {
        this.mentions = mentions.rows;
        for (let mention of this.mentions) {
          if (mention.value.viewed) {
            this.hidden = true
          } else {
            this.notificationLength = this.notificationLength + 1;
            this.hidden = false
          }
          let datetime: any = new Date(mention.value.datetime);
          this.dateTime = Math.floor((this.currentDay - datetime) / 1000 / 60 / 60 / 24);
          this.dataService.getData("/" + mention.value.patient).then((patients: any) => {
            mention.value.patient = patients.name         
          })
          this.dataService.getData("/" + mention.value.post).then((post: any) => {
            this.postTitle = post.title;
          })
          console.log("PATIENT:", mention) 
        }
        for(let men of this.mentions){
          if(!men.value.viewed){
            this.mentions.unshift(this.mentions.splice(this.mentions.findIndex(item => item.value._id === men.value._id), 1)[0]);
          }
        }
       /* if (temp.includes(postId)) {
          this.posts.unshift(this.posts.splice(this.posts.findIndex(item => item.value._id === postId), 1)[0]);
        } else {
          this.posts.unshift({ value: response });
        }*/
      } else {
        this.mentions.length == 0;
      }
    });
  }

  acceptChallenge(invitation:any){
    this.dataService.getData("/"+invitation.value.program).then((data:any)=>{
      this.interactions = data.interactions;
      this.treatment = {entity:"treatment", state:"active", program: invitation.value.program, patient:this.dataService.user._id,startDate: new Date(), endDate: moment().format("2021-08-31T15:43:24.000Z"),interactions:data.interactions ,datetime: Date.now()}
      this.dataService.postData(this.treatment).then((result:any)=>{
      this.snackBar.open("Invitaci??n Aceptada Correctamente");
      this.dataService.deleteById(invitation.value._id + "?rev=" + invitation.value._rev).then((result:any)=>{
        location.reload();
      })
    })
    })
  }

  rejectChallenge(invitation:any){
      this.dataService.deleteById(invitation.value._id + "?rev=" + invitation.value._rev).then((result:any)=>{
        this.snackBar.open("Invitaci??n rechazada correctamente")
        location.reload();
      })
  }

  removePost(postID){
    let temp:any[] = [];
    this.dataService.getData("/" + postID).then((response) => {
      for(let index in this.posts) {
        if(this.posts[index].value._id === postID){
          temp.push(this.posts[index].value._id)
        }
      }
      if(temp.includes(postID)){
        this.posts.unshift(this.posts.splice(this.posts.findIndex(item => item.value._id === postID), 1)[0]);
      } else {
        this.posts.unshift({value: response});
      }
    });
  }
}
