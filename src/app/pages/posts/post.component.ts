import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../dialog-comment/comment.component';
import { DataService } from '../../services/data.service';
import { AssociateComponent } from './associate.component';
import * as moment from 'moment';
import { PatientComponent } from '../../patient/patient.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  providers: [PatientComponent],
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() postId: string;
  @Input() idMention: any;
  @Input() resizable: boolean;
  @Input() selectable: boolean;
  @Input() removable: boolean;
  @Input() multiple: boolean;
  @Input() feedback: boolean;
  @Input() datetime: boolean;
  @Output() event = new EventEmitter<string>();
  public compressed: any = false;
  public program: any = {};
  public publication: any;
  public loading: boolean = false;
  public mostrar: boolean = true;
  public favourite: any = {};
  public toggle = true;
  private reporte:string;
  private obj:any;
  razones: string[] = ['Lenguaje inapropiado', 'Lenguaje ofensivo', 'Desnudos', 'Violencia', 'Spam']
  check: boolean = false;
  

  constructor(public dialog: MatDialog, public router: Router, public http: HttpClient, public dataService: DataService, private comp: PatientComponent, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.postId) {
      this.dataService.getData("/" + this.postId).then((post) => {
        this.post = { value: post };
      });
    }
    if (this.feedback) {
      this.getComments(this.post);
      this.getLikes(this.post);
      this.getFavourites(this.post);
    }
    if (this.resizable) {
      this.compressed = true;
    }
    console.log(this.post);
    
  }

  getComments(post: any) {
    this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + post.value._id + "\"").then((comments: any) => {

      
      post.comments = [];
      comments.rows.sort((a: any, b: any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
      for (let comment of comments.rows) {
        if(comment.value.state && comment.value.state == 'deleted'){
          
        } else {
          post.comments.push({ name: comment.value.name, text: comment.value.text, id:comment.value._id });
        }
      }
    });
  }

  getLikes(post: any) {
    this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + post.value._id + "\"").then((likes: any) => {
      post.likes = likes.rows.length;
      post.liked = 'false';
      if (likes.rows.length > 0) {
        for (let like of likes.rows) {
          if (like.value.patient == this.dataService.user._id) {
            post.liked = 'true';
            post.like = { _id: like.value._id, _rev: like.value._rev };
          }
        }
      }
    });
  }

  getFavourites(post: any) {
    this.dataService.getData("/_design/view/_view/favourites-by-post?key=\"" + post.value._id + "\"").then((favourites: any) => {
      post.fav = favourites.rows.length;
      post.favourite = 'false';
      if (favourites.rows.length > 0) {
        for (let fav of favourites.rows) {
          if (fav.value.patient == this.dataService.user._id) {
            post.favourite = 'true';
            post.fav = { _id: fav.value._id, _rev: fav.value._rev };
          }
        }
      }
    });
  }

  openComment(post: any) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '400px',
      data: { text: '', post: post.value._id }
    });
    dialogRef.afterClosed().subscribe((text) => {
      let comment = { entity: "comment", datetime: moment().format('YYYYMMDDHHmmss'), post: post.value._id, patient: this.dataService.user._id, name: this.dataService.user.name, text: text };
      if (text != null && text.trim() != "") {
        this.dataService.postData(comment).then((result: any) => {
          post.comments.push({ name: this.dataService.user.name, text: text });
        });
      }
      if (!post.comments) { post.comments = []; }
    });
    this.router.navigateByUrl("/patient");
  }

  like(post: any) {
    if (post.liked == 'false') {
      let like = { entity: "like", post: post.value._id, patient: this.dataService.user._id, datetime: moment().format('YYYYMMDDHHmmss') };
      this.dataService.postData(like).then((result: any) => {
        if (result.ok) {
          this.dataService.getData("/_design/view/_view/like-by-post?key=\"" + this.post.value._id + "\"").then((likes: any) => {
            this.post.likes = likes.rows.length;
            this.post.liked = 'false';
            if (likes.rows.length > 0) {
              for (let like of likes.rows) {
                if (like.value.patient == this.dataService.user._id) {
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
            for (let like of likes.rows) {
              if (like.value.patient == this.dataService.user._id) {
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
    console.log("post:", post)
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

  selectPost(post: any) {
    const dialogRef = this.dialog.open(AssociateComponent, {
      width: '400px',
      data: { text: post.value._id }
    });

    dialogRef.afterClosed().subscribe((text) => {
    });
  }

  aceptar(postID) {
    this.loading = true;
    let id = postID.value.program;
    this.dataService.getData("/" + id).then((result: any) => {
      this.program.entity = 'treatment';
      this.program.state = 'active';
      this.program.patient = this.dataService.user._id;
      this.program.program = result._id;
      this.program.startDate = moment().format('YYYY-MM-DD:HH:mm:ss');
      this.program.endDate = moment(this.program.startDate).add(result.duration, 'days');
      this.program.interactions = result.interactions;
      this.program.datetime = moment().format('YYYYMMDDHHmmss');
    }).then((v) => {
      this.dataService.postData(this.program).then((v2) => {
        this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.dataService.user._id + "\"").then((posts: any) => {
          for (let pub of posts.rows) {
            if (postID.doc._id == pub.value.doc.post) {
              this.publication = pub.value.doc
              this.publication.state = 'deleted'
              this.mostrar = false;
              this.dataService.postData(this.publication).then((result) => {
                this.loading = false;
                this.snackBar.open('¡Enhorabuena! este desafío se agregrá a tu lista.', 'OK', { duration: 6000 })
              })
            }
          }
        })
      })
    });
  }

  rechazar(publication) {
    this.loading = true;
    console.log(publication)
    this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.dataService.user._id + "\"").then((posts: any) => {
      for (let pub of posts.rows) {
        if (publication.doc._id == pub.value.doc.post) {
          this.publication = pub.value.doc
          this.publication.state = 'deleted'
          this.dataService.postData(this.publication).then((result) => {
            this.loading = false;
            this.snackBar.open('No volveremos a mostrarle este post.', 'OK', { duration: 3000 })
          }).then((v) => { window.location.reload() })
        }
      }
    })
  }

  clickEvent() {
    this.event.emit("click");
  }

  saveFavourite(post: any) {
    console.log(post.favourite)
    if (post.favourite == 'false') {
      let favourite = { entity: "favourite", post: post.value._id, patient: this.dataService.user._id, datetime: moment().format('YYYYMMDDHHmmss') };
      this.dataService.postData(favourite).then((result: any) => {
        if (result.ok) {
          this.snackBar.open("Publicación añadida a favoritos correctamente",'OK', { duration: 3000 })
          this.dataService.getData("/_design/view/_view/favourites-by-post?key=\"" + this.post.value._id + "\"").then((favourites: any) => {
            this.post.fav = favourites.rows.length;
            this.post.favourite = 'false';
            if (favourites.rows.length > 0) {
              for (let fav of favourites.rows) {
                if (fav.value.patient == this.dataService.user._id) {
                  this.post.favourite = 'true';
                  this.post.fav = { _id: fav.value._id, _rev: fav.value._rev };            
                }
              }
            }
          });
        }
      });
    } else {
      this.http.delete(this.dataService.databaseAPI + "/" + post.fav._id + "?rev=" + post.fav._rev).subscribe((result: any) => {
        post.favourite = 'false';
        this.dataService.getData("/_design/view/_view/favourites-by-post?key=\"" + this.post.value._id + "\"").then((favourites: any) => {
          this.post.fav = favourites.rows.length;
          this.snackBar.open("Publicación quitada de favoritos correctamente", 'ERR', { duration: 3000 })
          if (favourites.rows.length > 0) {
            for (let fav of favourites.rows) {
              if (fav.value.patient == this.dataService.user._id) {
                this.post.favourite = 'true';
                this.post.fav = { _id: fav.value._id, _rev: fav.value._rev };
              }
            }
          } else {
            this.post.favourite = 'false';
          }
        });
      });
    }
  }

  report(template, object){
    this.obj = object;
    
    
    const dialogRef = this.dialog.open(template, {
      width: '300px'
    })
  }

  sendReport(){
    this.dataService.postData({
      'entity': 'report',
      'objeto': this.obj,
      'patientName': this.dataService.user.name,
      'patientId': this.dataService.user._id,
      'reason': this.reporte,
      'datetime': new Date()
    }).then(
      (result) => {
        console.log(result);
        this.snackBar.open('Su reporte se ha enviado correctamente. Un administrador hará una revisión.','',  {duration:5000});
        this.close();
      }
    )
  }

  visible(){
    document.getElementById("otros").style.display = 'block';
    this.check = true;
  }

  notVisible(){
    document.getElementById("otros").style.display = 'none';
    this.check = true;
  }

  close(){
    this.reporte = '';
    this.check = false;
  }
}