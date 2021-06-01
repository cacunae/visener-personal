import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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

  public user:string = "";
  public role:string = "";
  constructor(public dialog:MatDialog) {
    this.user = localStorage.getItem("user");
    this.role = localStorage.getItem("role");
    if(this.role == "administrator"){
      this.role = "Administrador";
    }else if(this.role == "professional"){
      this.role = "Profesional";
    }else if(this.role == "patient"){
      this.role = "Usuario";
    }
  }

  popup(){
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: {comment: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  clickEvent(){
    this.rightEvent.emit("click");
  }

}

