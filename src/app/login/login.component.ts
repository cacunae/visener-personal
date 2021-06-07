import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Md5 } from 'ts-md5';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error:boolean = false;

  constructor(private dataService : DataService, private router : Router, public snackBar: MatSnackBar) {
    this.dataService.user = null;
    localStorage.clear();
  }

  ngOnInit(): void {
  }

  login() {
  }

  validaUsuario(){
    this.error = false;
    this.dataService.login(this.email, Md5.hashStr(this.password)).then((result:any) => {
      if(result.rows && result.rows[0] && result.rows[0].id){
        this.dataService.getData("/" + result.rows[0].value.role).then((features: any) => {
          let tmpFeatures:any[] = [];
          for (let feature of features.features) {
            let index = features.features.findIndex((item: any) => item.name === feature.name);
            if (index > -1) {
              tmpFeatures.push(feature);
            };
          }

          if (tmpFeatures.length > 0) {
            result.rows[0].value.features = tmpFeatures;
          }
          this.dataService.setUser(result.rows[0].value);
        if(this.dataService.user.entity === "professional"){
          this.router.navigateByUrl("/professional");
        }else if(this.dataService.user.entity === "patient"){
          this.router.navigateByUrl("/patient");
        }else{
          this.router.navigateByUrl("/login");
          this.snackBar.open('Hubo un problema al cargar su perfil.', 'ERR', {duration: 5000});
        }
        });
      }else{
        this.error = true;
        this.snackBar.open('Usuario o contrasela errónea.', 'ERR', {duration: 5000});
      }
    });
  }
}
