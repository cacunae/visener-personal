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
  public professional:any = { entity: "professional", role: "Kinesiólogo", name: "", username: "", password: "", granted: false};
  public roles:any[] = [];
  public companies:any[] = [];
  public hide:boolean = true;
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
    await this.dataService.getData("/_design/view/_view/roles").then((roles: any) => {
      this.roles = roles.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
    });
    await this.dataService.getData("/_design/view/_view/companies").then((companies:any) =>{
      this.companies = companies.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      await this.dataService.getData("/" + this.id).then((result: any) => {
        this.professional = result;
        this.passwordTemp = result.password;
        this.professional.password = "";
      });
    }    
    this.angForm = this._fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      role: ["", Validators.required],
      password: [""],
      company: ["", Validators.required],
      position: ["", Validators.required],
      professional: [""],
    });
    this.loading = false;
  }

  publicar() {
    this.actionLoading = true;
    if(this.angForm.valid){
      if((this.professional.password==this.passwordConfirm && this.professional.password != "") ){
        this.professional.password = Md5.hashStr(this.professional.password);
        this.professional.datetime = this.professional.datetime = moment().format("YYYYMMDDHHmm");
        this.dataService.postData(this.professional).then((result:any)=>{
          this.actionLoading = false;
          this.snackBar.open('Profesional actualizado correctamente', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/professional/professionals");
        });
      }else if(this.professional.password==this.passwordConfirm && this.professional._id){
        this.professional.password = this.passwordTemp;
        this.dataService.postData(this.professional).then((result:any)=>{
          this.actionLoading = false;
          this.snackBar.open('Profesional actualizado correctamente', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/professional/professionals");
        });
      }else{
        this.actionLoading = false;
        this.snackBar.open('Las contraseñas no coinciden', 'ERROR', { duration: 3000 });
      }
    }
  }

}