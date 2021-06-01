import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from '../../services/data.service';
import { DialogAttachmentComponent } from '../../administrator/dialog-attachment/dialog-attachment.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  public post: any = {entity: "post", state: "active"};
  public polls: any = {};
  public options: any = {};
  public askPoll: boolean;
  public myForm: FormGroup;
  public upload: FormGroup;
  arreglo: any[] = [];
  attachments: any[] = [];
  files: any;
  public id:string = null;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.post = result;
        if(this.post.poll){
          this.askPoll = true;
        }else{
          this.askPoll = false;
        }
      });
    }
  }

  ngOnInit(): void {
  }

  openAttachment() {
    const dialogRef = this.dialog.open(DialogAttachmentComponent, {
      width: '520px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.post.image = null;
        this.post.video = null;
        if(result.entity=='image'){
          this.post.image = result.selection;
        }else{
          setTimeout(() => {
            this.post.video = result.selection;
          }, 500);
        }
      }
    });
  }

  eliminaEncuesta() {
    this.post.poll = null;
  }

  inicializaEncuesta() {
    this.post.poll = [{ id: 1, type: 'text', question: '' }];
  }

  addPregunta() {
    this.post.poll.push({ id: this.post.poll.length + 1, type: 'text', question: '' });
  }

  addAlternativa(pregunta:any) {
    pregunta.options.push({ id: pregunta.options.length + 1, description: '' });
  }

  changeTypeQuestion(type:any, question:any) {
    question.type = type;
    if (question.type == 'text') {
      question.options = null;
    } else {
      question.options = [{ id: 1, description: '' }];
    }
  }

  publicar() {
    this.post.datetime = moment().format('YYYYMMDDHHmmss') //Date.now();
    this.dataService.postData(this.post).then((result: any) => {
      this.snackBar.open('Post Actualizado correctamente', 'OK', { duration: 3000 });
      this.router.navigateByUrl("/administrator/posts");
    });
  }
}
