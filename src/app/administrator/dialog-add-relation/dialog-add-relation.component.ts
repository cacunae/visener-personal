import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-add-relation',
  templateUrl: './dialog-add-relation.component.html',
  styleUrls: ['./dialog-add-relation.component.css']
})
export class DialogAddRelationComponent implements OnInit {
  patients: any[];
  idProfessional: any;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogAddRelationComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.idProfessional = data.professional;
  }

  ngOnInit(): void {
    this.getPatients()
  }

  getPatients() {
    this.dataService.getData("/_design/view/_view/patients").then((patients: any) => {
      this.patients = patients.rows;
    });
  }

  save() {
    for (let patient of this.patients) {
      if (patient.selected) {
        this.dataService.postData({ entity: "relation", patient: patient.value._id, professional: this.idProfessional, datetime: moment().format('YYYYMMDDHHmmss') }).then((result:any) => {
          if(result.ok){
            this.dialogRef.close("ok");
          }else{
            this.dialogRef.close("err");
          }
        })
      }
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
  
}



