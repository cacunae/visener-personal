import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-password/password.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-attachment',
  templateUrl: 'dialog-attachment.component.html',
  styleUrls: ['dialog-attachment.component.css']
})

export class DialogAttachmentComponent implements OnInit {
  public param:any = {};
  public attachments:any;
  public search:string  = "";

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogAttachmentComponent>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if(!this.data){this.data = {text:''};}
    this.dataService.getData("/_design/view/_view/attachments").then((attachments:any) =>{
      this.attachments = attachments.rows.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
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
