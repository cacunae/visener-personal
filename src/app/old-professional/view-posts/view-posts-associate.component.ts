import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AssociateComponent } from './associate.component';

@Component({
  selector: 'app-view-posts-associate',
  templateUrl: './view-posts-associate.component.html'
})
export class ViewPostsAssociateComponent implements OnInit {
  public posts:any[] = [];
  public demo:boolean = false;
  public demo2:boolean = false;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.dataService.getData("/_design/view/_view/posts").then((posts: any) => {
      this.posts = posts.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
    });
  }

}
