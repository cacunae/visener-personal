import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssociateComponent } from './view-posts/associate.component';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {
  public user: any;

  constructor(public http:HttpClient, public dialog: MatDialog, public post: MatDialog, public router: Router) {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
    }else{
      localStorage.getItem("user")
      this.router.navigateByUrl("/professional/treatments");
    }
   }

  ngOnInit(): void {
  }

  popup(){
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: {comment: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cerrarSesion(){
    localStorage.clear();
  }

}
