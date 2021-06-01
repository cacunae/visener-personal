import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dialog-interaction',
  templateUrl: './dialog-interaction.component.html',
  styleUrls: ['./dialog-interaction.component.css']
})

export class DialogInteractionComponent implements OnInit {
  public data:any = {selection:null};
  public interactions:any;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogInteractionComponent>) {
    this.dataService.getData("/_design/view/_view/interactions").then((interactions:any) =>{
      this.interactions = interactions.rows.sort((a:any, b:any)=>{ return Number(b.value.subtitle) - Number(a.value.subtitle)});
    });
  }

  ngOnInit(): void {
  }

  select(interactions){
    if(this.data.selection == interactions.value._id){
      this.data.selection = null;
    }else{
      this.data.selection = interactions.value._id;
    }
  }


  onNoClick(){
    this.dialogRef.close();
  }

}
