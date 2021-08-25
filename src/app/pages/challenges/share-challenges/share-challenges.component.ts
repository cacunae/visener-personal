import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-share-challenges',
  templateUrl: './share-challenges.component.html'
})
export class ShareChallengesComponent implements OnInit {
  arreglo:any;
  idGroup:any;
  member:any[] = [];
  patients:any[] = [];
  groups:any[] = [];

  constructor(public snackBar: MatSnackBar, public dataService: DataService, public dialogRef: MatDialogRef<ShareChallengesComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.arreglo = data;
  }

  ngOnInit(): void {
    this.getPatientGroup();
  }

  getPatientGroup(){
    this.dataService.getData("/_design/view/_view/members-by-group").then((members: any) => {
      for(let member of members.rows){
        if(member.value.patient == this.dataService.user._id){
            this.member.push(member.value.group);
          for(let mem of this.member){
            this.dataService.getData("/_design/view/_view/members-by-group?key=\""+mem+"\"").then((result:any)=>{
              for(let patients of result.rows){
                this.dataService.getData("/"+patients.value.patient).then((patient:any)=>{
                  if(patient._id != this.dataService.user._id){
                    if(this.patients.find((pa) => pa._id == patient._id) === undefined){
                      this.patients.push(patient);
                    }                   
                  }
                })
              }
            })
          }
          this.dataService.getData("/"+member.value.group).then((group:any)=>{
            this.groups.push(group);
          })
        }
      }
  });     
  }

  onNoClick(){
    this.dialogRef.close();
  }

  save(){
    for (let patient of this.patients) {
      if (patient.selected) {
        console.log("POST REALIZADO", patient._id)
        this.dataService.postData({ entity: "challenge-invitation", patient:this.dataService.user._id , guest: patient._id, program: this.arreglo._id, datetime: moment().format('YYYYMMDDHHmmss') }).then((result:any) => {
          if(result.ok){
            this.dialogRef.close("ok");
            this.snackBar.open('Desafío compartido correctamente', 'OK', { duration: 3000 });
          }else{
            this.dialogRef.close("err");
          }
        })  
      }
    }
    for(let group of this.groups){
      if(group.selected){
        console.log("POST REALIZADO", group)
        this.dataService.getData("/_design/view/_view/members-by-group?key=\""+group._id+"\"").then((members:any)=>{
          for(let member of members.rows ){
            if(member.value.patient != this.dataService.user._id){
              console.log("result:", member)
              this.dataService.postData({ entity: "challenge-invitation", patient:this.dataService.user._id , guest: member.value.patient, program: this.arreglo._id, datetime: moment().format('YYYYMMDDHHmmss') }).then((result:any) => {
                if(result.ok){
                  this.dialogRef.close("ok");
                  this.snackBar.open('Desafío compartido con el grupo correctamente', 'OK', { duration: 3000 });
                }else{
                  this.dialogRef.close("err");
                }
              })
            }
          }
        })
      }
    }
  }

}
