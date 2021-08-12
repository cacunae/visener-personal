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
  public terms:boolean = false;
  public politics:boolean = false;
  public user:any = this.dataService.user;
  constructor(public router: Router, public dialog: MatDialog, public dataService: DataService, public snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
  }

  aceptar(){
    if(this.terms && this.politics){
      this.dataService.getData("/" + this.dataService.user._id).then((result:any)=>{
        result.enabled = "true";
        this.dataService.postData(result).then(() => {
          this.snackBar.open('Términos aceptados correctamente.', 'OK', {duration: 5000});
        });
      });
    }else{
      const dialogRef = this.dialog.open(EnableComponent, {
        width: '1000px'
      });
      this.snackBar.open('Debe aceptar las condiciones', 'ERROR', {duration: 5000});
    }
  }
}
