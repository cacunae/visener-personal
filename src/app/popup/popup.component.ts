import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { WeblogComponent } from '../dialog-weblog/weblog.component';
import { PasswordComponent } from '../dialog-password/password.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  public data:any;
  email: string;
  password: string;
  public comment:string = "";
  public user: any;
  public role: any;
  public paciente: any;

  constructor(public popUpRef: MatDialogRef<PopupComponent>, private dataService : DataService, private router : Router, public dialog: MatDialog,public post: MatDialog) {
    this.role = localStorage.getItem("role");
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear();
    this.popUpRef.close();
    this.router.navigateByUrl("/login");
  }

  cambiarPassword(){
    const dialogRef = this.dialog.open(PasswordComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment = result;
    });
    this.popUpRef.close();
  }

  onNoClick(){
    this.popUpRef.close();
  }

  viewWeblog(){
    const dialogRef = this.dialog.open(WeblogComponent, {
      width: '400px',
      data: {comment: this.comment}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment = result;
    });
    this.popUpRef.close();
  }
}
