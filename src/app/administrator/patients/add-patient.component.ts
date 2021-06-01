import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html'
})
export class AddPatientComponent implements OnInit {
  public post: any = {}
  username: any;
  role: any;
  password: any;
  passwordConfirm: any;
  datetime :any;
  name: any;
  entity: any;
  show: boolean;
  hide = true;
  angForm: FormGroup;
  email: any;
  public patients: any = null;
  id: any;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.show = true;
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.name = result.name;
        this.email = result.username;
      });
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.angForm = this._fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  postPatient(){
    if(this.id){
      if(this.password==this.passwordConfirm){
        this.dataService.listById(this.id).then((result:any) =>{
          result.name = this.name;
          result.username = this.email;
          result.password = Md5.hashStr(this.password);
          result.datetime = this.datetime = moment().format("YYYYMMDDHHmm");
          this.dataService.postData(result).then((result: any) =>{
            this.snackBar.open('Paciente Actualizado correctamente', 'OK', {duration: 3000});
            this.router.navigateByUrl("/administrator/patients");
          });
        })
      }else{
        this.snackBar.open('Las contrasñas no coinciden', 'ERROR', { duration: 3000 });
      }
  }else if(this.password==this.passwordConfirm){
        this.post.entity="patient"
        this.post.name = this.name;
        this.post.username = this.email;
        this.post.password = Md5.hashStr(this.password);
        this.post.datetime = this.datetime = moment().format("YYYYMMDDHHmm");
        this.dataService.postData(this.post).then((result:any) => {
        this.snackBar.open('Paciente creado correctamente', 'OK', {duration: 3000});
        this.router.navigateByUrl("/administrator/patients");
      })
    }
  }
}