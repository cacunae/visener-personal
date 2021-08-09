import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../pages/dialog-password/password.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html'
})
export class ViewGroupsComponent implements OnInit {
  public groups:any[] = [];
  public search: string="";

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.getGroups()
  }

  getGroups() {
    this.dataService.getData("/_design/view/_view/groups").then((posts: any) => {
      this.groups = posts.rows.sort((a:any, b:any) => { if(a.value.title && b.value.title) {return a.value.title.localeCompare(b.value.title);} });
    });
  }

}