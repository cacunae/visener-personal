import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DataService } from '../../services/data.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { DialogInteractionComponent } from '../../dialog-interaction/dialog-interaction.component';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAttachmentComponent } from 'src/app/administrator/dialog-attachment/dialog-attachment.component';
import { ViewPostsComponent } from '../view-posts/view-posts.component';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {
  todayDate : Date = new Date();
  public treatment:any = {entity:"treatment", patient: "", professional: "", title: "", content: "", objective: "", detail: "", weekdays:[], interactions:[], startDate: "", endDate: ""};
  public myForm : FormGroup;
  public interactions:any[];
  public patients:any[];
  content:any;
  public week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  comments:any;
  usuario:any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selectedOptions:any;
  list:any;
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  index:any;
  id:any;
  post:any = {image: "",title: "", subtitle:"", content:"",poll: { type: 'none', relation: '' }}
  public postName: string = '';
  public postSubtitle: string = '';
  public postContent: string = '';
  public postPollType: string = '';
  public postPollQuestion: string = '';
  public postPollOptions: string = '';
  public postPollOptionsDescription: string='';
  postImage: any;
  postPoll: any;
  postPost: any;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _formBuilder: FormBuilder, private _fb : FormBuilder, public dataService : DataService, public dialog: MatDialog) { 
    this.usuario = localStorage.getItem("user");
    this.treatment.professional = localStorage.getItem("id");
    this.addInteraction()
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.treatment.title = result.title;
        this.treatment.content = result.content;
        this.treatment.objective = result.objective;
        this.treatment.startDate = result.startDate;
        this.treatment.endDate = result.endDate;
        this.treatment.patient = result.patient;
        this.treatment.interactions = result.interactions;
        this.treatment.post = result.post;
        this.dataService.listById(this.treatment.post).then((post:any) =>{
          this.postName = post.title;
        })
      }); 
    }
  }

  ngOnInit(): void {
    this.getPatients();
  }

  setDays(interaction:any, dayname:string){
    if(interaction.weekdays.findIndex((day:string) => day === dayname)<0){
      interaction.weekdays.push(dayname);
      console.log("dayname",interaction.weekdays)
    }else{
      interaction.weekdays.splice(interaction.weekdays.findIndex((day:string) => day === dayname));
      console.log("dayname",interaction.weekdays)
    }
  }

  getPatients(){
    this.dataService.getData("/_design/view/_view/patients-by-professional").then((patients:any) =>{
      this.patients = patients.rows;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.treatment.interactions, event.previousIndex, event.currentIndex);
  }

  addInteraction() {
    this.treatment.interactions.push({id: this.treatment.interactions.length+1, interaction:"", title: "", subtitle: "", repetitions: "", weekdays:[], iterations:1, series: "", rest: "", content: "", poll: {type:'none', relation: ''}});
  }

  delInteraction(index:any){
    this.treatment.interactions.splice(index, 1);
    if(this.treatment.interactions.length ==0){this.addInteraction();}
  }

  publicar(){
    if(this.treatment.patient && this.treatment.title && this.treatment.content && this.treatment.startDate && this.treatment.endDate){
      if(this.id){
        this.dataService.listById(this.id).then((result:any) =>{
          result.patient = this.treatment.patient;
          result.title = this.treatment.title;
          result.content = this.treatment.content;
          result.objective = this.treatment.objective;
          result.starDate = this.treatment.startDate;
          result.endDate = this.treatment.endDate;
          result.interactions = this.treatment.interactions;
          result.post = this.treatment.post;
          this.dataService.postData(result).then((result:any) =>{
            this.snackBar.open('Programa Actualizado correctamente', 'OK', {duration: 3000});
            this.router.navigateByUrl("/professional/treatments");
          })
        })
      }else{
        this.treatment.datetime = moment().format('YYYYMMDDHHmmss')
        this.dataService.postData(this.treatment).then((result: any) =>{
          alert("Programa publicado correctamente");
          this.router.navigateByUrl("/professional/treatments");
        });
      }
    }else{
      this.snackBar.open('Debe ingresar todos los datos', 'ERROR', {duration: 3000});
    }
  }

  openPost() {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: {text:'add-treatment'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.treatment.post = result.value._id;
      this.postName = result.value.title;
      this.postSubtitle = result.value.subtitle;
      this.postContent = result.value.content;
      this.postPoll = result.value.poll;
      if(result.value.poll){
        for(let poll of result.value.poll){
          this.postPollType = poll.type;
          this.postPollQuestion = poll.question;
          this.postPollOptions = poll.options;
          for(let option of poll.options){
            this.postPollOptionsDescription = option.description;
          }
        }
      }
      this.postImage = result.value.image;
    });
  }

  openDialogInteraction(interaction:any){
    const dialogRef = this.dialog.open(DialogInteractionComponent, {
      width: '520px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.getData("/" + result).then((dbinteraction:any) =>{
          interaction.interaction = dbinteraction._id;
          interaction.title = dbinteraction.title;
          interaction.image = dbinteraction.image;
          interaction.subtitle = dbinteraction.subtitle;
          interaction.series = dbinteraction.series;
          interaction.repetitions = dbinteraction.repetitions;
          interaction.weekdays = dbinteraction.weekdays;
          interaction.iterations = dbinteraction.iterations;
          interaction.rest = dbinteraction.rest;
          interaction.postId = dbinteraction.post;
          interaction.poll = dbinteraction.poll;
          this.dataService.getData("/" + dbinteraction.post).then((dbinteractionPost:any) =>{
            interaction.post = dbinteractionPost;
            console.log("interaction:", interaction);
          });
        });    
      }
    });
  }

  getDay(){
    this.range;
  }

}
