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
  public patient:any = { entity: "patient", name: "", username: "", password: "", state: "enabled", enabled: "false"};
  public companies:any[] = [];
  public hide = true;
  public angForm: FormGroup;
  public id:string = "";
  public passwordConfirm:string = "";
  public passwordTemp:string = "";
  public loading:boolean = true;
  public actionLoading:boolean = false;

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
        this.passwordTemp = result.password;
        this.patient.password = "";
      });
    }
    await this.dataService.getData("/_design/view/_view/companies").then((companies:any) =>{
      this.companies = companies.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
    });

    this.angForm = this._fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      company: ["", Validators.required],
      password: [""]
    });
    this.loading = false;
  }

  publicar(){
    this.actionLoading = true;
    if(this.angForm.valid){
      if((this.patient.password==this.passwordConfirm && this.patient.password != "") ){
        this.patient.password = Md5.hashStr(this.patient.password);
        this.patient.datetime = this.patient.datetime = moment().format("YYYYMMDDHHmm");
        this.dataService.postData(this.patient).then((result:any)=>{
          this.snackBar.open('Paciente actualizado correctamente.', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/professional/patients");
          this.actionLoading = false;
        });
      }else if(this.patient.password==this.passwordConfirm && this.patient._id){
        this.patient.password = this.passwordTemp;
        this.dataService.postData(this.patient).then((result:any)=>{
          this.snackBar.open('Paciente actualizado correctamente.', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/professional/patients");
          this.actionLoading = false;
        });
      }else{
        this.snackBar.open('Las contraseñas no coinciden.', 'ERROR', { duration: 3000 });
        this.actionLoading = false;
      }
    }else{
      this.snackBar.open('Debe ingresar toda la información del paciente.', 'ERROR', { duration: 3000 });
      this.actionLoading = false;
    }
  }
}