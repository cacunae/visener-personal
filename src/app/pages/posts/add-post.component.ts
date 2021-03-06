import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from '../../services/data.service';
import { DialogAttachmentComponent } from '../../pages/dialog-attachment/dialog-attachment.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewTreatmentsComponent } from 'src/app/old-professional/view-treatments/view-treatments.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  public post: any = { entity: "post", state: "active" };
  public polls: any = {};
  public options: any = {};
  public askPoll: boolean;
  public myForm: FormGroup;
  public upload: FormGroup;
  public arreglo: any[] = [];
  public attachments: any[] = [];
  public files: any;
  public id: string = null;
  public loading: boolean = true;
  public actionLoading: boolean = false;
  public program:any = {};
  public compressed:any = false;
  public resizable:boolean;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loading = false;
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.post = result;
        if (this.post.poll) {
          this.askPoll = true;
        } else {
          this.askPoll = false;
        }
        this.loading = false;
      });
    }
    if(this.resizable){
      this.compressed = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.post.poll, event.previousIndex, event.currentIndex);
  }

  openAttachment() {
    const dialogRef = this.dialog.open(DialogAttachmentComponent, {
      width: '520px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.post.image = null;
        this.post.video = null;
        if (result.entity == 'image') {
          this.post.image = result.selection;
        } else {
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

  delPregunta(index: number) {
    this.post.poll.splice(index, 1);
  }

  delOption(question: number, index: number) {
    this.post.poll[question].options.splice(index, 1);
  }

  inicializaEncuesta() {
    this.post.poll = [{ id: 1, type: 'text', question: '' }];
  }

  addPregunta() {
    this.post.poll.push({ id: this.post.poll.length + 1, type: 'text', question: '' });
  }

  addAlternativa(pregunta: any) {
    pregunta.options.push({ id: pregunta.options.length + 1, description: '' });
  }

  changeTypeQuestion(type: any, question: any) {
    question.type = type;
    if (question.type == 'text') {
      question.options = null;
    } else {
      question.options = [{ id: 1, description: '' }];
    }
  }

  publicar() {
    this.actionLoading = true;

    if (this.post.title && this.post.subtitle && (this.post.image || this.post.video) && this.post.content) {
      this.post.datetime = moment().format('YYYYMMDDHHmmss') //Date.now();
      if (this.post.invitation == true) {
          console.log(this.post);
          this.dataService.postData(this.post).then((result2: any) => {
            console.log(result2);
            if (this.id) {
              this.actionLoading = false;
              this.snackBar.open('Post actualizado correctamente', 'OK', { duration: 3000 });
            } else {
              this.actionLoading = false;
              this.snackBar.open('Post creado correctamente', 'OK', { duration: 3000 });
            }
            this.router.navigateByUrl("/professional/posts");
          });
      } else {
        this.dataService.postData(this.post).then((result: any) => {
          if (this.id) {
            this.actionLoading = false;
            this.snackBar.open('Post actualizado correctamente', 'OK', { duration: 3000 });
          } else {
            this.actionLoading = false;
            this.snackBar.open('Post creado correctamente', 'OK', { duration: 3000 });
          }
          this.router.navigateByUrl("/professional/posts");
        });
      }
    } else {
      this.actionLoading = false;
      this.snackBar.open('Debe agregar una foto, un t??tulo y un contenido', 'ERROR', { duration: 3000 });
    }
  }

  seleccionarPrograma(){
    const dialogRef = this.dialog.open(ViewTreatmentsComponent, {
      width: '520px',
      data: {text:'add-program'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('lol')
        this.post.invitation = true;
        this.post.program = result.id;
        this.dataService.getData("/" + this.post.program).then((programDetail: any) => {
          this.program = programDetail;
        });
      }
    });
  }

  quitarPost(){
    delete this.post.invitation;
    delete this.post.program; 
    delete this.program;
  }
}
