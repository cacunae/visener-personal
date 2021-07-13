import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-password/password.component';
import { DataService } from '../../services/data.service';
import { CommentComponent } from '../dialog-comment/comment.component';
import { AssociateComponent } from '../../pages/posts/associate.component';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-program',
  templateUrl: 'dialog-program.component.html',
  styleUrls: ['dialog-program.component.css']
})

export class DialogProgramComponent implements OnInit {
  @Input() program:any = {};
  @Input() postId:string;
  @Input() resizable:boolean;
  @Input() selectable:boolean;
  @Input() removable:boolean;
  @Input() multiple:boolean;
  @Input() feedback:boolean;
  @Output() event = new EventEmitter<string>();
  public posts: any[] = [];
  public compressed:any = false;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
    if(this.resizable){
      this.compressed = true;
      this.posts = this.program.value.posts;
    }
  }

  selectProgram(program: any){
    this.program = program;
  }

  clickEvent(){
    this.event.emit("click");
  }
}