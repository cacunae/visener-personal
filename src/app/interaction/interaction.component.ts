import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../pages/dialog-comment/comment.component';
import { DataService } from '../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() interaction:any;
  @Input() origin:string;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
    if(this.origin == 'add-treatment'){
      this.dataService.getData("/" + this.interaction).then((interaction) => {
        this.interaction = interaction;
      });
    }
  }

}