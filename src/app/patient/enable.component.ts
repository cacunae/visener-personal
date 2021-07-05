import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enable',
  templateUrl: './enable.component.html'
})
export class EnableComponent implements OnInit {
  public acepto:boolean = false;

  constructor(public router: Router, public dialog: MatDialog, public dataService: DataService, public snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
  }

  aceptar(){
    if(this.acepto){
      this.dataService.getData("/" + this.dataService.user._id).then((result:any)=>{
        result.state = "enabled";
        this.dataService.postData(result).then(() => {
          this.snackBar.open('Usuario habilitado. Ingrese nuevamente.', 'OK', {duration: 5000});
          this.router.navigateByUrl("/login");
        });
      });
    }else{
      this.snackBar.open('Debe aceptar las condiciones', 'ERR', {duration: 5000});
    }
  }
}
