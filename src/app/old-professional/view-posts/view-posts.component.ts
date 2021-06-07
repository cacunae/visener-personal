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
  public demo:boolean = false;
  public demo2:boolean = false;

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if(data && (data.text==="add-interaction" || data.text==="add-treatment")){
      this.demo = true;
    }
  }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.dataService.getData("/_design/view/_view/posts").then((posts: any) => {
      this.posts = posts.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
    });
  }

}
