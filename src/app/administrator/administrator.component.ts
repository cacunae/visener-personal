import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './patients/add-patient.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { AddProfessionalComponent } from './professionals/add-professional.component';
import { InteractionsComponent } from './interactions/interactions.component';
import { AddInteractionComponent } from './interactions/add-interaction.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AddAttachmentComponent } from './attachments/add-attachment.component';
import { PopupComponent } from '../popup/popup.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  public logeado: boolean = false;
  public user: any;
  public idProfessional: any;
  public paciente: any;
  public contenido = null;
  public click: boolean = false;
  public arreglo: any[] = [];
  arre: number = 1;
  series: number = 1;
  arr: any[] = [];
  polls: any;
  state: any = 1;
  rev: any
  result: any[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('htmlData') htmlData: ElementRef;
  statedate: any;

  constructor(public http: HttpClient, public dialog: MatDialog, public post: MatDialog, public router: Router, private dataService: DataService) {
    if (!localStorage.getItem("user")) {
      this.router.navigateByUrl("/login");
    }else{
      this.user = localStorage.getItem("user");
      this.router.navigateByUrl("/administrator/interactions");
    }
  }

  ngOnInit(): void {
  }

  popup() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: { comment: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cerrarSesion() {
    localStorage.clear();
  }
}