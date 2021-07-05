import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { WeblogComponent } from '../dialog-weblog/weblog.component';
import { PasswordComponent } from '../dialog-password/password.component';
import { DisableComponent } from '../dialog-disable/disable.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  public features:any[] = [];
  public data:any;
  public user:any = {};

  constructor(public popUpRef: MatDialogRef<PopupComponent>, public dataService: DataService, public router : Router, public dialog: MatDialog,public post: MatDialog) {
  }

  ngOnInit(): void {
    this.features = this.dataService.user.features;
    this.user = this.dataService.user;
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
    });
    this.popUpRef.close();
  }

  onNoClick(){
    this.popUpRef.close();
  }

  viewWeblog(){
    const dialogRef = this.dialog.open(WeblogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    this.popUpRef.close();
  }

  deshabilitarUsuario(){
    const dialogRef = this.dialog.open(DisableComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    this.popUpRef.close();
  }
}
