import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html'
})

export class AssociateComponent implements OnInit {
  public patients:any[] = [];
  public idProfessional:string = "";

  constructor(public router: Router, public dataService: DataService, public dialogRef: MatDialogRef<AssociateComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.idProfessional = this.dataService.user._id;
    this.dataService.getData("/_design/view/_view/relations-by-professional?key=\""+this.idProfessional+"\"&include_docs=true").then((patients: any) => {
      this.patients = patients.rows;
    }); 
  }

  save() {
    for (let patient of this.patients) {
      if (patient.selected) {
        this.dataService.postData({ entity: "publication", post: this.data.text, patient: patient.value._id, professional: this.idProfessional, datetime: moment().format('YYYYMMDDHHmmss') }).then((result: any) => {
          this.dialogRef.close();
        })
      }
    }
    alert("Asociación realizada correctamente.");
  }

  onNoClick(){
    this.dialogRef.close();
    this.router.navigateByUrl("/professional/view-posts");
  }
}
