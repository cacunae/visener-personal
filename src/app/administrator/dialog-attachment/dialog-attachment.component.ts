import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/dialog-password/password.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-attachment',
  templateUrl: './dialog-attachment.component.html',
  styleUrls: ['./dialog-attachment.component.css']
})

export class DialogAttachmentComponent implements OnInit {
  public param:any = {};
  public attachments:any;
  public search:string  = "";

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogAttachmentComponent>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log("DialogAttachmentComponent constructor data:", data);
    if(!this.data){this.data = {text:''};}

    this.dataService.getData("/_design/view/_view/attachments").then((file:any) =>{
      this.attachments = file.rows;
    });
  }

  ngOnInit(): void {
  }

  select(attachment:any){
    if(this.param.selection == attachment.value._id){
      this.param.selection = null;
      this.param.entity = null;
    }else{
      this.param.selection = attachment.value._id;
      this.param.entity = attachment.value.entity;
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
