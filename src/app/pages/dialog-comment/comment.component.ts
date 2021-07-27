import { Component, OnInit, Inject, Output } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  patients:any;
  name:any[] = [];
  items:any;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<CommentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    
  }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/patients").then((result:any)=>{
      this.patients = result.rows;
      for(let patient of this.patients){
        this.name.push(patient.value.name)
        this.items = this.name;
      }
    })
  }

  onSelect($event){
    console.log("event:")
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
