import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DialogAttachmentComponent } from '../dialog-attachment/dialog-attachment.component';
import * as moment from 'moment';
import { ViewPostsComponent } from '../posts/view-posts.component';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

@Component({
  selector: 'app-add-interaction',
  templateUrl: 'add-interaction.component.html'
})
export class AddInteractionComponent implements OnInit {
  todayDate: Date = new Date();
  public interaction: any = { entity: "interaction", state: "active", title: null, subtitle: null, iterations: 1, repetitions: 1, series: 1, rest: 1, content: null, weekdays: [], poll: { type: 'slider', relation: 'series' } };
  public myForm: FormGroup;
  public week: any[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  public feedback: any[] = [{ id: "slider", value: "Slider" },{ id: "slider2", value: "Slider2" }, { id: "state", value: "Estados (Caritas)" }, { id: "yesno", value: "Opciones (Sí/No)" }];
  public relations: any[] = [{ id: "ejercicio", value: "Feedback asociado a ejercicio" }, { id: "series", value: "Feedback asociado a series" }];
  public postName: string = '';
  public postSubtitle: string = '';
  public postContent: string = '';
  public postPollType: string = '';
  public postPollQuestion: string = '';
  public postPollOptions: string = '';
  public postPollOptionsDescription: string='';
  public max;
  public min;
  public id: any; 
  postImage: any;
  postPoll: any;
  postPost: any;
  public actionLoading:boolean = false;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _formBuilder: FormBuilder, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.interaction.professional = this.dataService.user._id;
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.interaction = result
        if(result.poll.type=='slider2'){
          this.max = result.poll.max;
          this.min = result.poll.min;
        }
        this.dataService.listById(this.interaction.post).then((post:any) =>{
          this.postName = post.title;
          this.postSubtitle = post.subtitle;
          this.postContent = post.content;
          this.postPoll = post.poll;
          this.postImage = post.image;
          for(let poll of this.postPoll){
            this.postPollType = poll.type;
            this.postPollQuestion = poll.question;
            this.postPollOptions = poll.options;
            for(let option of poll.options){
              this.postPollOptionsDescription = option.description;
            }
          }
        });
      });
    }
  }

  ngOnInit(): void {
  }

  setDays(interaction: any, dayname: string) {
    if (interaction.weekdays.findIndex((day: string) => day === dayname) < 0) {
      interaction.weekdays.push(dayname);
    } else {
      interaction.weekdays.splice(interaction.weekdays.findIndex((day: string) => day === dayname), 1);
    }
  }

  publicar(){
    this.actionLoading = true;
    if (this.interaction.series <= 0 || this.interaction.repetitions <= 0 || this.interaction.rest < 0 || this.interaction.iterations <= 0){
      this.actionLoading = false;
      this.snackBar.open('Revise los valores, no pueden ser negativos', 'OK', { duration: 3000 });
    }else if(this.interaction.poll.type=="slider" || this.interaction.poll.type=='slider2'){
      if(this.interaction.post && this.interaction.title && this.interaction.iterations > 0 &&
        this.interaction.subtitle && this.interaction.image && //this.interaction.content && 
        this.interaction.series > 0 && this.interaction.repetitions > 0 && this.interaction.rest >= 0){
          if(this.interaction.poll.question){
            if(this.interaction.poll.type=='slider2'){
              this.interaction.poll.max = this.max;
              this.interaction.poll.min = this.min;
            }
            this.dataService.postData(this.interaction).then((result: any) => {
              this.actionLoading = false;
              this.snackBar.open('Tarea creada correctamente', 'OK', { duration: 3000 });
              this.router.navigateByUrl("/professional/interactions");
            });
          }else{
            this.actionLoading = false;
            this.snackBar.open('Ingrese una pregunta', 'OK', { duration: 3000 });
          }
      }else{
        this.actionLoading = false;
        this.snackBar.open('Ingrese todos los datos', 'OK', { duration: 3000 });
      }
    }else if(this.interaction.poll.type=="state" || this.interaction.poll.type=="yesno"){
      if(this.interaction.post && this.interaction.title && this.interaction.iterations > 0 &&
        this.interaction.subtitle && this.interaction.image && //this.interaction.content && 
        this.interaction.series > 0 && this.interaction.repetitions > 0 && this.interaction.rest >= 0){
          this.dataService.postData(this.interaction).then((result: any) => {
            this.actionLoading = false;
            this.snackBar.open('Tarea creada correctamente', 'OK', { duration: 3000 });
            this.router.navigateByUrl("/professional/interactions");
          });
      }else{
        this.actionLoading = false;
        this.snackBar.open('Ingrese todos los datos', 'OK', { duration: 3000 });
      }
    }
    console.log(this.interaction)
  }

  openAttachment() {
    const dialogRef = this.dialog.open(DialogAttachmentComponent, {
      width: '520px',
      data: {filter: true}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.interaction.image = result.selection;
    });
  }

  openPost() {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: {text:'add-interaction'}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        this.interaction.post = result.value._id;
        this.postName = result.value.title;
        this.postSubtitle = result.value.subtitle;
        this.postContent = result.value.content;
        this.postPoll = result.value.poll;
        for(let poll of result.value.poll){
          this.postPollType = poll.type;
          this.postPollQuestion = poll.question;
          this.postPollOptions = poll.options;
          for(let option of poll.options){
            this.postPollOptionsDescription = option.description;
          }
        }
        this.postImage = result.value.image;
      }
    });
  }

}