import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../dialog-comment/comment.component';
import { DataService } from '../../services/data.service';
import { AssociateComponent } from '../../old-professional/view-posts/associate.component';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post:any;
  @Input() postId:string;
  @Input() resizable:boolean;
  @Input() selectable:boolean;
  @Input() removable:boolean;
  @Input() multiple:boolean;
  @Input() feedback:boolean;
  @Output() event = new EventEmitter<string>();
  public compressed:any = false;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
    if(this.postId){
      this.dataService.getData("/" + this.postId).then((post) => {
        this.post = {value: post};
      });
    }
    if(this.feedback){
      this.getComments(this.post);
      this.getLikes(this.post);
    }
    if(this.resizable){
      this.compressed = true;
    }
  }

  getComments(post:any){
    this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + post.value._id + "\"").then((comments: any) => {
      post.comments = [];
      comments.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
      for (let comment of comments.rows) {
        post.comments.push({ name: comment.value.name, text: comment.value.text });
      }
    });
  }

  getLikes(post:any){
    this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + post.value._id + "\"").then((likes: any) => {
      post.likes = likes.rows.length;
      post.liked = 'false';
      if (likes.rows.length > 0) {
        for(let like of likes.rows){
          if(like.value.patient == this.dataService.user._id){
            post.liked = 'true';
            post.like = { _id: like.value._id, _rev: like.value._rev };
          }
        }
      }
    });
  }

  openComment(post: any) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '400px',
      data: { text: '' }
    });
    dialogRef.afterClosed().subscribe((text) => {
      let comment = { entity: "comment", datetime: moment().format('YYYYMMDDHHmmss'), post: post.value._id, patient: this.dataService.user._id, name: this.dataService.user.name, text: text };
      if (text != null && text.trim() != "") {
        this.dataService.postData(comment).then((result:any) => {    
          post.comments.push({ name: this.dataService.user.name , text: text });
        });
      }
      if (!post.comments) { post.comments = []; } 
    });
  }

  like(post: any) {
    if (post.liked == 'false') {
      let like = { entity: "like", post: post.value._id, patient: this.dataService.user._id, datetime: moment().format('YYYYMMDDHHmmss') };
      this.dataService.postData(like).then((result:any) => {
        if (result.ok) {
          this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.post.value._id + "\"").then((likes: any) => {
            this.post.likes = likes.rows.length;
            this.post.liked = 'false';
            if (likes.rows.length > 0) {
              for(let like of likes.rows){
                if(like.value.patient == this.dataService.user._id){
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
              if(like.value.patient == this.dataService.user._id){
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
    let poll = { entity: "poll", post: post.value._id, patient: this.dataService.user._id, datetime: moment().format('YYYYMMDDHHmmss'), responses: responses };
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

  clickEvent(){
    this.event.emit("click");
  }
}