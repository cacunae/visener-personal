import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-password/password.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog-program',
  templateUrl: 'dialog-program.component.html',
  styleUrls: ['dialog-program.component.css']
})

export class DialogProgramComponent implements OnInit {
  public param:any = {selection: ''};
  public programs:any;
  public search:string  = "";

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<DialogProgramComponent>,  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log("DialogProgramComponent constructor data:", data);
    if(!this.data){this.data = {text:''};}

    this.dataService.getData("/_design/view/_view/programs").then((file:any) =>{
      this.programs = file.rows;
    });
  }

  ngOnInit(): void {
  }

  select(program:any){
    console.log("Pro", program);
    if(this.param.selection._id == program.value._id){
      this.param.selection = null;
    }else{
      this.param.selection = program.value;
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
