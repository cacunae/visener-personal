import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html'
})
export class AddProfessionalComponent implements OnInit {
  cardImageBase64: string;
  arreglo: any[] = [];
  public post: any = {}
  public idPatient: any;
  idProfessional: any;
  username: any;
  role: any;
  password: any;
  name: any;
  entity: any;
  show: boolean;
  hide = true;
  angForm: FormGroup;
  email: any;
  datetime: string;
  id: string;
  passwordConfirm: any;
  passwordTemp:string;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.show = true;
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.name = result.name;
        this.email = result.username;
        this.passwordTemp = result.password;
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

  postProfessional() {
    if (this.id) {
      if(this.password==this.passwordConfirm || (this.password != undefined && this.password!="")){
        this.dataService.listById(this.id).then((result: any) => {
          result.name = this.name;
          result.username = this.email;
          result.password = Md5.hashStr(this.password);
          result.datetime = this.datetime = moment().format("YYYYMMDDHHmm");
          this.dataService.postData(result).then((result:any)=>{
            this.snackBar.open('Profesional actualizado correctamente', 'OK', { duration: 3000 });
            this.router.navigateByUrl("/administrator/professionals");
          });
        });
      }else if(this.password==this.passwordConfirm){
        this.dataService.listById(this.id).then((result: any) => {
          result.name = this.name;
          result.username = this.email;
          result.password = this.passwordTemp;
          result.datetime = this.datetime = moment().format("YYYYMMDDHHmm");
          this.dataService.postData(result).then((result:any)=>{
            this.snackBar.open('Profesional actualizado correctamente', 'OK', { duration: 3000 });
            this.router.navigateByUrl("/administrator/professionals");
          });
        });
      }else{
        this.snackBar.open('Las contraseñas no coinciden', 'ERROR', { duration: 3000 });
      }
    }else if (this.password == this.passwordConfirm) {
      this.post.entity = "professional";
      this.post.role = "Kinesiólogo"
      this.post.name = this.name;
      this.post.username = this.email;
      this.post.password = Md5.hashStr(this.password);
      this.post.datetime = this.datetime = moment().format("YYYYMMDDHHmm");
      this.dataService.postData(this.post).then((result: any) => {
        this.snackBar.open('Profesional creado correctamente', 'OK', { duration: 3000 });
        this.router.navigateByUrl("/administrator/professionals");
      })
      }else{
        this.snackBar.open('Las contraseñas no coinciden', 'ERROR', {duration: 3000});
      }
  }


}