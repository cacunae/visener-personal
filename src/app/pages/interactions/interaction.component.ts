import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() interaction:any;
  @Input() resizable:boolean;
  @Input() removable:boolean;
  @Input() origin:string;
  @Output() event = new EventEmitter<string>();
  public compressed:any = false;
  public interact:boolean = true;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
    if(this.origin == 'add-program'){
      this.interact = false;
      this.dataService.getData("/" + this.interaction).then((interaction) => {
        this.interaction = interaction;
      });
    }
    if(this.resizable){
      this.compressed = true;
    }
  }

  clickEvent(){
    this.event.emit("click");
  }
  
}