import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, Inject, Output, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { now } from 'moment';
import { withLatestFrom } from 'rxjs-compat/operator/withLatestFrom';
import { DataService } from 'src/app/services/data.service';


export interface DialogData {
  text: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  relations: any;
  name: any[] = [];
  items: any[] = [];
  idMention:any[] = [];
  mention: any={};
  text:any;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<CommentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, @Inject(MAT_DIALOG_DATA) public post: DialogData) {
    this.mention.post = post;
  }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/patients").then((patients: any) => {
      for(let patient of patients.rows){
        this.name.push(patient.value.name);
        this.idMention.push(patient.value._id)
        this.items = this.name;
      }
    })
  }

  mentions($event) {
      this.dataService.getData("/_design/view/_view/patients").then((patients: any) => {
        for(let patient of patients.rows){
          if($event == "@"+patient.value.name){
            this.mention.patient = this.dataService.user._id;
            this.mention.mention = patient.value.name;
            this.mention.idMention = patient.value._id;
            this.mention.entity = "mention";
            this.mention.post = this.mention.post.post;
            this.mention.dateTime = Date.now();
          }
        }
        this.mention.text = $event;
      })
  }

  sendMentions(){
    console.log("mention:", this.mention)
    this.dataService.postData(this.mention)
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
