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
  public patient:any = { entity: "patient", name: "", username: "", password: "" };
  public hide = true;
  public angForm: FormGroup;
  public id:string = "";
  public passwordConfirm:string = "";
  public passwordTemp:string = "";

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.dataService.getData("/" + this.id).then((result:any) => {
        this.patient = result;
        this.passwordTemp = result.password;
        this.patient.password = "";
      });
    }
    this.createForm();
  }

  createForm() {
    this.angForm = this._fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      password: [""],
    });
  }

  publicar(){
    if(this.angForm.valid){
      if((this.patient.password==this.passwordConfirm && this.patient.password != "") ){
        this.patient.password = Md5.hashStr(this.patient.password);
        this.patient.datetime = this.patient.datetime = moment().format("YYYYMMDDHHmm");
        this.dataService.postData(this.patient).then((result:any)=>{
          this.snackBar.open('Paciente actualizado correctamente', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/administrator/patients");
        });
      }else if(this.patient.password==this.passwordConfirm && this.patient._id){
        this.patient.password = this.passwordTemp;
        this.dataService.postData(this.patient).then((result:any)=>{
          this.snackBar.open('Paciente actualizado correctamente', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/administrator/patients");
        });
      }else{
        this.snackBar.open('Las contraseñas no coinciden', 'ERROR', { duration: 3000 });
      }
    }
  }
}