import { Component, Input, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-interaction',
  templateUrl: './dialog-interaction.component.html',
  styleUrls: ['./dialog-interaction.component.css']
})

export class DialogInteractionComponent implements OnInit {
  public data:any = {selection:null};
  @Input() interaction:any;
  @Input() interactionId:string;
  @Input() resizable:boolean;
  @Input() selectable:boolean;
  @Input() removable:boolean;
  @Input() multiple:boolean;
  @Input() feedback:boolean;
  public compressed:any = false;
  public search="";

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogInteractionComponent>) {
  }

  ngOnInit(): void {
    if(this.resizable){
      this.compressed = true;
    }
  }

  select(interaction:any){
   /* if(this.data.selection == interaction){
      this.data.selection = null;
    }else{
      this.data.selection = interaction;
    }*/
  }


  onNoClick(){
    this.dialogRef.close();
  }

}
