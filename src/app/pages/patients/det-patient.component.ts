import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-det-patient',
  templateUrl: './det-patient.component.html'
})
export class DetPatientComponent implements OnInit {
  public patient:any = { entity: "patient", name: "", username: "", password: "" };
  public companies:any[] = [];
  public hide = true;
  public angForm: FormGroup;
  public id:string = "";
  public loading:boolean = true;
  public posts:any[] = [];
  public treatments:any[] = [];

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async createForm() {
    this.loading = true;

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      await this.dataService.getData("/" + this.id).then((result:any) => {
        this.patient = result;
      });
    }

    await this.getPosts();
    await this.getTreatments();
    this.loading = false;
  }

  async getPosts(){
    await this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.id + "\"").then((posts: any) => {
      this.posts = posts.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
    });
  }

  async getTreatments(){
    await this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.id + "\"").then((treatments: any) => {
      this.treatments = treatments.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
    });
  }

  removePost(publication:any){
    publication.state = "deleted";
    this.dataService.postData(publication).then((result) => {
      this.snackBar.open('Publicación eliminada correctamente.', 'OK', { duration: 3000 });
      this.getPosts();
    });
  }

  removeProgram(treatment:any){
    treatment.state = "deleted";
    this.dataService.postData(treatment).then((result) => {
      this.snackBar.open('Publicación eliminada correctamente.', 'OK', { duration: 3000 });
      this.getTreatments();
    });
  }

}