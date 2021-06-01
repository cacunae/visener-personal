import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error:boolean = false;

  constructor(private dataService : DataService, private router : Router) {
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
      localStorage.setItem("user",result.rows[0].value.name);
      localStorage.setItem("email",this.email);
      localStorage.setItem("role",result.rows[0].value.entity);
      localStorage.setItem("id",result.rows[0].value._id);
      if(localStorage.getItem("role") == "administrator"){
        this.router.navigateByUrl("/administrator");
      }else if(localStorage.getItem("role") == "professional"){
        this.router.navigateByUrl("/professional");
      }else if(localStorage.getItem("role") == "patient"){
        this.router.navigateByUrl("/patient");
      }else{
        this.router.navigateByUrl("/login");
      }
    }else{
      this.error = true;
    }
    })
  }
}
