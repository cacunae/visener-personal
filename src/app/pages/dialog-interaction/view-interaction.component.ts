import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/old-professional/view-posts/associate.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-interaction',
  templateUrl: './view-interaction.component.html',
  styleUrls: ['./view-interaction.component.css']
})
export class ViewInteractionComponent implements OnInit {
  public interactions:any[] = [];
  public search: string="";

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.getInteraction();
  }

  getInteraction(){
    this.dataService.getData("/_design/view/_view/interactions").then((interactions:any) =>{
      this.interactions = interactions.rows.sort((a:any, b:any)=>{ return Number(b.value.subtitle) - Number(a.value.subtitle)});
    });
  }
}
