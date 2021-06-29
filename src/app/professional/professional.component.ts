import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html'
})
export class ProfessionalComponent implements OnInit {
  public roleName: string = "";
  public features: any[] = [];
  public message: string;
  public expirationTime:number = environment.expirationTime;
  public grantAccess:boolean = false;
  public acepto:boolean = false;

  constructor(public router: Router, public dialog: MatDialog, public dataService: DataService, public snackBar:MatSnackBar) {
    this.dataService.session = moment().unix();
  }

  getActivity(){
    let now:any = moment().unix();
    if(now - this.dataService.session > this.expirationTime){
      this.router.navigateByUrl("/login");
      this.snackBar.open('Sesión Expirada', 'OK', { duration: 7000 });
    }else{
      setTimeout(() => {this.getActivity()}, 10000);
    }
  }

  ngOnInit(): void {
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else if (!this.dataService.user.granted) {
      this.grantAccess = true;
    } else {
      setTimeout(() => {this.getActivity()}, 10000);
      this.dataService.getData("/features").then((features: any) => {
        this.dataService.getData("/" + this.dataService.user.role).then((roleFeatures: any) => {
          this.roleName = roleFeatures.name;
          for (let feature of roleFeatures.features) {
            let index = features.features.findIndex((item: any) => item.name === feature.name);
            if (index>-1 && features.features.length>0 && feature.actions.length>0) {
              feature.title = features.features[index].title;
              feature.icon = features.features[index].icon;
              this.features.push(feature);
            };
          }

          if (this.features.length > 0) {
            this.dataService.user.features = this.features;
            for(let feature of this.features){
              if(feature.actions.length>0){
                this.router.navigateByUrl(feature.actions[0]);
                break;
              }
            }
          } else {
            this.message = "No tiene funcionalidades para operar.";
          }
        });
      });
    }
  }

  aceptar(){
    if(this.acepto){
      this.dataService.getData("/" + this.dataService.user._id).then((result:any)=>{
        console.log(result);
        result.granted = true;
        this.dataService.postData(result).then(() => {
          this.snackBar.open('Condiciones aceptadas. Ingrese nuevamente.', 'OK', {duration: 5000});
          this.router.navigateByUrl("/login");
        });
      });
    }else{
      this.snackBar.open('Debe aceptar las condiciones', 'ERR', {duration: 5000});
    }
  }
}
