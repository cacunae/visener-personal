import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogInteractionComponent } from '../dialog-interaction/dialog-interaction.component';
import { ViewPostsComponent } from 'src/app/old-professional/view-posts/view-posts.component';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-programs',
  templateUrl: './add-program.component.html',
})
export class AddProgramComponent implements OnInit {
  todayDate: Date = new Date();
  public program: any = { entity: "program", patient: "", professional: "", title: "", content: "",posts: [], objective: "", detail: "", weekdays: [], interactions: [], duration: 1 };
  public posts:any[] = [];
  public interactions:any[] = [];
  public myForm: FormGroup;
  public week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  public loading:boolean = true;
  range = new FormGroup({start: new FormControl(), end: new FormControl() });
  selectedOptions: any;
  index: any;
  id: any;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _formBuilder: FormBuilder, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async createForm(){
    this.program.professional = this.dataService.user._id;
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      await this.dataService.getData("/" + this.id).then((result: any) => {
        this.program = result;
      });
      if (this.program.posts) {
        for(let post of this.program.posts)
        await this.dataService.getData("/" + post).then((postDetail: any) => {
          this.posts.push(postDetail);
        })
      }
      if (this.program.interactions) {
        for(let interaction of this.program.interactions)
        await this.dataService.getData("/" + interaction).then((interactionDetail: any) => {
          this.interactions.push(interactionDetail);
        })
      }
    }
    this.loading = false;
  }

  setDays(interaction: any, dayname: string) {
    if (interaction.weekdays.findIndex((day: string) => day === dayname) < 0) {
      interaction.weekdays.push(dayname);
      console.log("dayname", interaction.weekdays)
    } else {
      interaction.weekdays.splice(interaction.weekdays.findIndex((day: string) => day === dayname), 1);
      console.log("dayname", interaction.weekdays)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.program.interactions, event.previousIndex, event.currentIndex);
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.program.posts, event.previousIndex, event.currentIndex);
  }

  delInteraction(index: any) {
    this.program.interactions.splice(index, 1);
    this.interactions.splice(index, 1);
  }

  delPost(index: any) {
    this.program.posts.splice(index, 1);
    this.posts.splice(index, 1);
  }

  publicar() {
    //if(this.program.posts.length>0 && this.program.interactions.length>0) {
    if(this.program.interactions.length>0) {
      this.program.datetime = moment().format('YYYYMMDDHHmmss')
      this.dataService.postData(this.program).then((result: any) => {
        if(this.id){
          this.snackBar.open('Programa actualizado correctamente.', 'OK', { duration: 3000 });
        }else{
          this.snackBar.open('Programa creado correctamente.', 'OK', { duration: 3000 });
        }
        this.router.navigateByUrl("/professional/programs"); 
      });
    } else {
      this.snackBar.open('Debes agregar al menos una tarea y un post.', 'ERR', { duration: 3000 });
    }
  }

  newPost() {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: {text:'add-program'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if(this.program.posts.findIndex((post:any) => post === result.value._id) < 0){
          this.program.posts.push(result.value._id);
          this.posts.push(result.value);
        }else{
          alert("El post seleccionado ya fue agregado anteriormente.")
        }
      }
    });
  }

  newInteraction() {
    const dialogRef = this.dialog.open(DialogInteractionComponent, {
      width: '520px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(this.program.interactions.findIndex((interaction:any) => interaction === result.value._id) < 0){
          this.program.interactions.push(result.value._id);
          this.interactions.push(result.value);
        }else{
          alert("La tarea seleccionada ya fue agregada anteriormente.")
        }
      }
    });
  }

  getDay() {
    this.range;
    console.log(this.range)
  }

}