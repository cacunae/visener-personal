import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../pages/dialog-password/password.component';
import { DataService } from '../../services/data.service';
import { AssociateComponent } from './associate.component';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html'
})
export class ViewPostsComponent implements OnInit {
  public posts:any[] = [];
  public search: string="";

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.dataService.getData("/_design/view/_view/posts").then((posts: any) => {
      this.posts = posts.rows.sort((a:any, b:any) => { if(a.value.title && b.value.title) {return a.value.title.localeCompare(b.value.title);} });
    });
  }

}
