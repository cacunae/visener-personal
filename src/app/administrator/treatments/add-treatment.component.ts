import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DialogInteractionComponent } from 'src/app/dialog-interaction/dialog-interaction.component';
import { ViewPostsComponent } from 'src/app/professional/view-posts/view-posts.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-treatments',
  templateUrl: './add-treatment.component.html',
})
export class AddTreatmentComponent implements OnInit {
  todayDate: Date = new Date();
  public treatment: any = { entity: "treatment", patient: "", professional: "", title: "", content: "",post: [], objective: "", detail: "", weekdays: [], interactions: [], startDate: "", endDate: "" };
  public myForm: FormGroup;
  public interactions: any[];
  public patients: any[];
  content: any;
  public week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  comments: any;
  usuario: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selectedOptions: any;
  list: any;
  index: any;
  id: any;
  post: any[] = [];
  posts: any[] = [];

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _formBuilder: FormBuilder, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.usuario = localStorage.getItem("user");
    this.treatment.professional = localStorage.getItem("id");
    this.addInteraction();
    this.posts = [];
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.treatment.image = result.image;
        this.treatment.title = result.title;
        this.treatment.content = result.content;
        this.treatment.objective = result.objective;
        this.treatment.startDate = result.startDate;
        this.treatment.endDate = result.endDate;
        this.treatment.patient = result.patient;
        this.treatment.interactions = result.interactions;
        if (result.post) {
          this.posts = result.post;
          for(let post of this.posts){
            console.log("POSTS::", post)
            this.dataService.listById(post).then((post: any) => {
              this.post.push(post.title);
              console.log("POSTS2::", post)
            })
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getPatients();
  }

  setDays(interaction: any, dayname: string) {
    if (interaction.weekdays.findIndex((day: string) => day === dayname) < 0) {
      interaction.weekdays.push(dayname);
      console.log("dayname", interaction.weekdays)
    } else {
      interaction.weekdays.splice(interaction.weekdays.findIndex((day: string) => day === dayname));
      console.log("dayname", interaction.weekdays)
    }
  }

  getPatients() {
    this.dataService.getData("/_design/view/_view/patients-by-professional").then((patients: any) => {
      this.patients = patients.rows;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.treatment.interactions, event.previousIndex, event.currentIndex);
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.post, event.previousIndex, event.currentIndex);
  }

  addInteraction() {
    this.treatment.interactions.push({ id: this.treatment.interactions.length + 1, interaction: "", title: "", subtitle: "", repetitions: "", weekdays: [], iterations: 1, series: "", rest: "", content: "", poll: { type: 'none', relation: '' } });
  }

  delInteraction(index: any) {
    this.treatment.interactions.splice(index, 1);
    if (this.treatment.interactions.length == 0) { this.addInteraction(); }
  }

  delPost(index: any) {
    this.post.splice(index, 1);
    if (this.post.length == 0) { this.post = [] }
    console.log(this.post)
  }

  publicar() {
    if (this.id) {
      this.dataService.listById(this.id).then((result: any) => {
        result.patient = this.treatment.patient;
        result.title = this.treatment.title;
        result.content = this.treatment.content;
        result.objective = this.treatment.objective;
        result.starDate = this.treatment.startDate;
        result.endDate = this.treatment.endDate;
        result.interactions = this.treatment.interactions;
        result.post = this.posts;
        console.log(result)
        this.dataService.postData(result).then((result: any) => {
          this.snackBar.open('Programa actualizado correctamente', 'OK', { duration: 3000 });
           this.router.navigateByUrl("/administrator/treatments"); 
        }) 
      })
    } else if(this.posts) {
      console.log("treat", this.posts, this.treatment.post)
      this.treatment.post = this.posts;
      this.treatment.datetime = moment().format('YYYYMMDDHHmmss')
      this.dataService.postData(this.treatment).then((result: any) => {
        this.snackBar.open('Programa creado correctamente.', 'OK', { duration: 3000 });
        this.router.navigateByUrl("/administrator/treatments"); 
      });
    } else {
      this.snackBar.open('Debes agregar al menos una tarea y un post.', 'ERR', { duration: 3000 });
    }
  }

  openPost() {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: {text:'add-treatment'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.value._id != this.posts){
        this.post.push(result.value.title);
        this.posts.push(result.value._id);
      }else{
        alert("El post seleccionado ya fue agregado anteriormente")
      }
    });
  }

  openDialogInteraction(interaction: any) {
    const dialogRef = this.dialog.open(DialogInteractionComponent, {
      width: '520px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("RESULT::", result)
      if (result) {
        this.dataService.getData("/" + result).then((dbinteraction: any) => {
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
          this.dataService.getData("/" + dbinteraction.post).then((dbinteractionPost: any) => {
            interaction.post = dbinteractionPost;
            console.log("interaction:", interaction);
          });
        });
      }
    });
  }

  getDay() {
    this.range;
    console.log(this.range)
  }

}
