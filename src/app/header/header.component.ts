import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title:string;
  @Input() backLink:string;
  @Input() rightLink:string;
  @Input() rightIcon:string;
  @Input() rightText:string;
  @Input() event:boolean = false;
  @Output() rightEvent = new EventEmitter<string>();

  public user:any = "";

  constructor(public dialog:MatDialog, public dataService:DataService) {
    this.user = this.dataService.user;
  }

  popup(){
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  clickEvent(){
    this.rightEvent.emit("click");
  }

}

