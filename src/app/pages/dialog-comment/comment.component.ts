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
  relations:any;
  name:any[] = [];
  items:any;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<CommentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    
  }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/relations-by-patient?key=\""+ this.dataService.user._id+"\"").then((results:any)=>{
      this.relations = results.rows;
      for(let relation of this.relations){
        console.log("relations:", this.relations, relation)
        this.dataService.getData("/"+ relation.value.doc.professional).then((professional:any) =>{
          this.name.push(professional.name);
          if(this.name.length == this.relations.length){
            this.items = this.name;
            console.log("items:", this.items)
          }
        })
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
