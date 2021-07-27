import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-re-asing',
  templateUrl: './dialog-re-asing.component.html',
  styleUrls: ['./dialog-re-asing.component.css']
})
export class DialogReAsingComponent implements OnInit {
  professionals: any[];
  idProfessional: any;
  idPatients:any[] = [];
  loading:boolean = true; 
  
  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogReAsingComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.idProfessional = data.professional;
  }

  ngOnInit(): void {
    this.getPatients()
  }

  async getPatients() {
    let tmpProfessional:any[] = [];
    let relProfessional:any[] = [];

    await this.dataService.getData("/_design/view/_view/professionals").then((professionals: any) => {
      tmpProfessional = professionals.rows;
    });
    await this.dataService.getData("/_design/view/_view/relations-by-professional?key=\""+this.idProfessional+"\"&include_docs=true").then((professional: any) => {
      relProfessional = professional.rows;
      for(let name of professional.rows){
        console.log("rel:", name.value.doc.patient)
      }
    });
    for(let professional of tmpProfessional){
      if(relProfessional.findIndex((item:any) => item.value.doc.professional === professional.value._id) >= 0){
        professional.disabled = true;
      }
    }
    this.loading = false;
    this.professionals = tmpProfessional;
  }

  save() {
    this.dataService.getData("/_design/view/_view/relations-by-professional?key=\""+this.idProfessional+"\"&include_docs=true").then((professional: any) => {
      for(let name of professional.rows){
         for (let professional of this.professionals) {
        if (professional.selected) {
          console.log("rel:", name.value.doc.patient)
          this.dataService.postData({ entity: "relation", patient: name.value.doc.patient, professional: professional.value.doc._id, datetime: moment().format('YYYYMMDDHHmmss') }).then((result:any) => {
            console.log("result:", result)
            if(result.ok){
              this.dialogRef.close("ok");
            }else{
              this.dialogRef.close("err");
            }
        })
      }
    }
      }
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
