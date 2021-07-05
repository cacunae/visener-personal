import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewPatientsComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  public patients: any = {};
  public professionals: any[] = [];
  public professional: any[] = [];
  public programs: any[] = [];
  public programsDel: any[] = [];
  public treatments: any[] = [];
  public posts: any[] = [];
  public post: any[] = [];
  public loading: boolean = true;
  public id: any;
  public state: any;
  comments: any;
  text: any[] = [];
  idPost: any;
  idProfessional: any;

  constructor(private dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPatients();
    this.getProfessional();
    this.getTreatments();
    this.getPosts();
  }

  async getPatients() {
    await this.dataService.getData("/" + this.id).then((patients: any) => {
      this.patients = patients;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
    });
  }

  async getProfessional() {
    await this.dataService.getData("/_design/view/_view/relations-by-patient?key=\"" + this.id + "\"").then((professional: any) => {
      this.professionals = professional.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
      for (let professional of this.professionals) {
        this.idProfessional = professional.value.doc.professional;
        this.dataService.getData("/" + this.idProfessional).then((professional: any) => {
          this.professional.push(professional.name);
        })
      }
    })
  }

  async getTreatments() {
    await this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.id + "\"").then((treatments: any) => {
      this.treatments = treatments.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
      for (let treatment of this.treatments) {
        this.treatments = treatment.value.doc.program;
        this.state = treatment.value.doc.state;
        this.state = "Activo";
        this.dataService.getData("/" + this.treatments).then((program: any) => {
          this.programsDel.push(program.title + " Estado Actual: " + this.state)
        })
      }
    });
    await this.dataService.getData("/_design/view/_view/treatments?key=\"" + this.id + "\"").then((treatments: any) => {
      this.treatments = treatments.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
      for (let treatment of this.treatments) {
        this.treatments = treatment.value.doc.program;
        this.state = treatment.value.doc.state;
        if (this.state == 'deleted') {
          this.state = "Desactivado";
          this.dataService.getData("/" + this.treatments).then((program: any) => {
            this.programsDel.push(program.title + " Estado Actual: " + this.state)
          })
        }
      }
    });
  }

  async getPosts() {
    await this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.id + "\"").then((posts: any) => {
      this.posts = posts.rows;
      for (let post of this.posts) {
        this.idPost = post.value.doc.post;
        this.dataService.getData("/" + this.idPost).then((post: any) => {
          this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + post._id + "\"").then((comments:any)=>{
            this.comments = comments.rows;
            this.post.push(post.title)
            for(let comment of this.comments){
                if(comment.value.text){
                  this.text.push(comment.value.text)
                }
            }
          })
        })
      }
    });
  }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 190;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 1;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save(this.patients.name + '.pdf');
    });
  }

}
