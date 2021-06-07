import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../pages/dialog-comment/comment.component';
import { DataService } from '../services/data.service';
import { AssociateComponent } from '../old-professional/view-posts/associate.component';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() demo: any = false;
  @Input() demo2: any = false;
  @Input() demo3: any = false;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
  }

  openComment(post: any) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '400px',
      data: { text: '' }
    });

    dialogRef.afterClosed().subscribe((text) => {
      let comment = { entity: "comment", datetime: moment().format('YYYYMMDDHHmmss'), post: post.value._id, patient: localStorage.getItem("id"), name: localStorage.getItem("user"), text: text };
      this.dataService.postData(comment).then((result:any) => {
        if (result.ok) {}
      });
      if (!post.comments) { post.comments = []; }
      post.comments.push({ name: localStorage.getItem("user"), text: text });
    });
  }

  like(post: any) {
    if (post.liked == 'false') {
      let like = { entity: "like", post: post.value._id, patient: localStorage.getItem("id"), datetime: moment().format('YYYYMMDDHHmmss') };
      this.dataService.postData(like).then((result:any) => {
        if (result.ok) {
          this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.post.value._id + "\"").then((likes: any) => {
            this.post.likes = likes.rows.length;
            this.post.liked = 'false';
            if (likes.rows.length > 0) {
              for(let like of likes.rows){
                if(like.value.patient == localStorage.getItem("id")){
                  this.post.liked = 'true';
                  this.post.like = { _id: like.value._id, _rev: like.value._rev };
                }
              }
            }
          });
        }
      });
    } else {
      this.http.delete(this.dataService.databaseAPI + "/" + post.like._id + "?rev=" + post.like._rev).subscribe((result: any) => {
        post.liked = 'false';
        this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.post.value._id + "\"").then((likes: any) => {
          this.post.likes = likes.rows.length;
          if (likes.rows.length > 0) {
            for(let like of likes.rows){
              if(like.value.patient == localStorage.getItem("id")){
                this.post.liked = 'true';
                this.post.like = { _id: like.value._id, _rev: like.value._rev };
              }
            }
          } else {
            this.post.liked = 'false';
          }
        });
      });
    }
  }

  responsePost(post: any) {
    let responses: any[] = []; 
    let poll = { entity: "poll", post: post.value._id, patient: localStorage.getItem("id"), datetime: moment().format('YYYYMMDDHHmmss'), responses: responses };
    for (let question of post.value.poll) {
      if (question.response) {
        responses.push({ id: question.id, question: question.question, response: question.response })
      }
    }
    this.dataService.postData(poll).then((result: any) => {
      if (result.ok) { }
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