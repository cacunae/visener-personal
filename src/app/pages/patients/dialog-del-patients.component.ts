import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-del-patients',
  templateUrl: './dialog-del-patients.component.html'
})
export class DialogDelPatientsComponent implements OnInit {
  event:boolean = false;
  password: any;
  confirmPassword:any;

  constructor(public dataService: DataService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogDelPatientsComponent>) { 
  }

  ngOnInit(): void {
    this.dataService.getData("/"+this.dataService.user._id).then((pass:any)=>{
      this.password = pass.password;
    })
  }

  confirm(event:any){
    this.event = event.checked;
  }

  onNoClick(){
    this.dialogRef.close();
  }

  delPatient(){
      if(this.event == true){
        if(this.password == Md5.hashStr(this.confirmPassword)){
        this.dataService.getData("/_design/view/_view/relations-by-patient?key=\""+this.dataService.user._id+"\"&include_docs=true").then((professionals: any) => {
          if(professionals.rows){
            for(let professional of professionals.rows){
              this.dataService.deleteById(professional.value.doc._id + "?rev=" + professional.value.doc._rev);
            } 
          }
          this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\""+this.dataService.user._id+"\"&include_docs=true").then((treatments: any) => {
            if(treatments.rows){
              for(let treatment of treatments.rows){
                this.dataService.deleteById(treatment.value.doc._id + "?rev=" + treatment.value.doc._rev);
              }
            }
            this.dataService.getData("/_design/view/_view/feedback-by-user?key=\""+this.dataService.user._id+"\"&include_docs=true").then((comments: any) => {
              if(comments.rows){
                for(let comment of comments.rows){
                  this.dataService.deleteById(comment.value._id + "?rev=" + comment.value._rev)
                }
              }
            })
            this.dataService.getData("/_design/view/_view/like-by-post?key=\""+this.dataService.user._id+"\"&include_docs=true").then((likes: any) => {
              if(likes.rows){
                for(let like of likes.rows){
                  console.log("comments:", like)
                  this.dataService.deleteById(like.value._id + "?rev=" + like.value._rev)
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
        this.snackBar.open('La contraseña no coincide', 'ERR', { duration: 3000 });
      }
      console.log("info:",this.dataService.user)
    }else{
      this.snackBar.open('Debe aceptar los términos antes de continuar.', 'ERR', { duration: 3000 });
    }
  }

}
