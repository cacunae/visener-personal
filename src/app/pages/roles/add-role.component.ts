import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { Md5 } from 'ts-md5';
import { ThisReceiver } from '@angular/compiler/src/expression_parser/ast';

@Component({
  selector: 'app-add-role',
  templateUrl: 'add-role.component.html'
})
export class AddRoleComponent implements OnInit {
  public companies:any[] = [];
  public role:any = { entity: "role", company: "", name: "", datetime: "", features: [] };
  public features:any[] = [];
  public angForm: FormGroup;
  public id:string = "";
  public new:any[] = [];
  public loading:boolean = true;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async createForm() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    await this.dataService.getData("/features").then((result:any) => {
      this.features = result.features.sort((a:any, b:any)=>{ return Number(a.order) - Number(b.order)});
    });

    await this.dataService.getData("/companies").then((result:any) => {
      this.companies = result.companies;
    });

    if(this.id) {
      await this.dataService.getData("/" + this.id).then((result:any) => {
        this.role = result;
      });
    }
    this.angForm = this._fb.group({
      name: ["", Validators.required],
      company: ["", Validators.required],
    });
    this.loading = false;
  }

  updFeature(pfeature:string, porder:number, paction:string, checked:boolean){
    if(checked){
      if(this.role.features.findIndex((feature:any) => feature.name === pfeature)<0){
        this.role.features.push({name: pfeature, order: porder, actions: [] });
      }
      this.role.features[this.role.features.findIndex((feature:any) => feature.name === pfeature)].actions.push(paction);
    }else{
      this.role.features[this.role.features.findIndex((feature:any) => feature.name === pfeature)].actions.splice(paction, 1);
    }
  }

  publicar(){
    if(this.angForm.valid && this.role.features?.length>0){
      this.role.datetime = moment().format("YYYYMMDDHHmm");
      this.dataService.postData(this.role).then((result:any)=>{
        if(this.id){
          this.snackBar.open('Perfil actualizado correctamente.', 'OK', { duration: 3000 });
        }else{
          this.snackBar.open('Perfil creado correctamente.', 'OK', { duration: 3000 });
        }
        this.router.navigateByUrl("/professional/roles");
      });
    }else{
      this.snackBar.open('Ingrese todos los valores.', 'ERR', { duration: 3000 });
    }
  }
}