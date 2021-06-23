import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../pages/dialog-password/password.component';
import { DataService } from '../../services/data.service';
import { AssociateComponent } from './associate.component';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {
  public posts:any[] = [];
  public demo:boolean = false;
  public demo2:boolean = false;
  public search:string ="";

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    if(data && (data.text==="add-interaction" || data.text==="add-program")){
      this.demo = true;
    }
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.dataService.getData("/_design/view/_view/posts").then((posts: any) => {
      this.posts = posts.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
    });
  }

  selectPost(post: any){
    const dialogRef = this.dialog.open(AssociateComponent, {
      width: '400px',
      data: { text: post.value._id }
    });

    dialogRef.afterClosed().subscribe((text) => {
    });
  }

}
