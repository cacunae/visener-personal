import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-del-patients',
  templateUrl: './dialog-del-patients.component.html',
  styleUrls: ['./dialog-del-patients.component.css']
})
export class DialogDelPatientsComponent implements OnInit {
  event:boolean = false;

  constructor(public dataService: DataService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogDelPatientsComponent>) { 

  }

  ngOnInit(): void {
  }

  confirm(event:any){
    this.event = event.checked;
  }

  onNoClick(){
    this.dialogRef.close();
  }

  delPatient(){
    console.log("event2", this.event)
    if(this.event == true){
      this.dataService.getData("/_design/view/_view/relations-by-patient?key=\""+this.dataService.user._id+"\"&include_docs=true").then((professionals: any) => {
        if(professionals.rows){
          for(let professional of professionals.rows){
            console.log("proff::", professional)
            this.dataService.deleteById(professional.value.doc._id + "?rev=" + professional.value.doc._rev);
          } 
        }
        this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\""+this.dataService.user._id+"\"&include_docs=true").then((treatments: any) => {
          if(treatments.rows){
            for(let treatment of treatments.rows){
              console.log("treatments:", treatment.value.doc._id, treatment.value.doc._rev)
              this.dataService.deleteById(treatment.value.doc._id + "?rev=" + treatment.value.doc._rev);
            }
          }
          this.dataService.getData("/_design/view/_view/feedback-by-user?key=\""+this.dataService.user._id+"\"&include_docs=true").then((comments: any) => {
            if(comments.rows){
              for(let comment of comments.rows){
                console.log("comments:", comment)
                this.dataService.deleteById(comment.value._id + "?rev=" + comment.value._rev)
              }
            }
          })
        })
        this.dataService.deleteById(this.dataService.user._id + "?rev=" + this.dataService.user._rev);
        alert("Paciente Eliminado Correctamente");
        localStorage.clear();
        location.reload();
      })    
    }else{
      this.snackBar.open('Debe aceptar los términos antes de continuar.', 'ERR', { duration: 3000 });
    }
    console.log("info:",this.dataService.user)
  }

}
