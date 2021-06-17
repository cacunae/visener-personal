import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ViewPostsComponent } from '../view-posts/view-posts.component';

@Component({
  selector: 'app-view-programs',
  templateUrl: './view-programs.component.html'
})
export class ViewTreatmentsComponent implements OnInit {
  public programs: any[] = [];
  public treat: any = {};
  public patients: any[] = [];
  public selectedValue: string;
  public selectedValue2: string;
  public post: any[] = [];
  public posts: any[] = [];

  constructor(private dataService: DataService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.posts = [];
    this.dataService.getData("/_design/view/_view/programs").then((programs:any) => {
      this.programs = programs.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
      console.log(this.programs)
    });
    this.dataService.getData("/_design/view/_view/relations-by-professional?key=\"" + this.dataService.user._id + "\"&include_docs=true").then((patient:any) => {
      this.patients = patient.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
      console.log(this.patients)
    });
  }

  changeClient(element) {
    console.log("selected --->" + this.selectedValue);
    this.dataService.getData("/" + this.selectedValue).then((treatment: any) => {
      console.log("TREATMENT::", treatment)
      this.treat = treatment;
      this.posts = treatment.post;
      for(let posts of this.posts){
        this.dataService.getData("/" + posts).then((post: any) => {
          this.post.push(post.title);
          console.log("POSTS:::", this.post)
        })
      }
    }) 
  }

  changeClient2(element) {
    console.log("selected2 --->" + this.selectedValue2);
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.post, event.previousIndex, event.currentIndex);
  }

  delPost(index: any) {
    this.post.splice(index, 1);
    if (this.post.length == 0) { this.post = [] }
    console.log(this.post)
  }

  openPost() {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px'
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


  publicar() {
    console.log("PATIENT::", this.selectedValue, this.selectedValue2)
    this.dataService.getData("/" + this.selectedValue).then((result: any) => {
      result.patient = this.selectedValue2;
      result.title = this.treat.title;
      result.post = this.selectedValue;
      result.objective = this.treat.objective;
      result.content = this.treat.content;
      console.log("Result", this.treat)
      this.dataService.postData(result);
        this.snackBar.open('Programa Asociado correctamente', 'OK', { duration: 3000 });
        this.router.navigateByUrl("/professional/programs");
    })
  }

}