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
  public patient: any = {};
  public professionals: any[] = [];
  public professional: any[] = [];
  public programs: any[] = [];
  public programsDel: any[] = [];
  public treatments: any[] = [];
  public posts: any[] = [];
  public publications: any[] = [];
  public loading: boolean = true;
  public id: any;
  public idPatient: any;
  public state: any;
  public comments: any;
  public text: any[] = [];
  public idPost: any;
  public idProfessional: any;

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
    this.dataService.getData("/" + this.id).then((result: any) => {
      this.idPatient = result.patient;
      this.dataService.getData("/" + this.idPatient).then((patient: any) => {
        this.patient = patient;
      });
    });
  }

  async getProfessional() {
    await this.dataService.getData("/" + this.id).then((result: any) => {
      this.idPatient = result.patient;
      this.dataService.getData("/_design/view/_view/relations-by-patient?key=\"" + this.idPatient + "\"").then((professional: any) => {
        this.professionals = professional.rows;//.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
        for (let professional of this.professionals) {
          this.idProfessional = professional.value.doc.professional;
          this.dataService.getData("/" + this.idProfessional).then((professional: any) => {
            this.professional.push(professional.name);
          })
        }
      })
    });
  }

  async getTreatments() {
    await this.dataService.getData("/" + this.id).then((result: any) => {
      this.idPatient = result.patient;
      this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.idPatient + "\"").then((treatments: any) => {
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
      this.dataService.getData("/_design/view/_view/treatments?key=\"" + this.idPatient + "\"").then((treatments: any) => {
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
    });
  }

  async getPosts() {
    await this.dataService.getData("/" + this.id).then((result: any) => {
      this.idPatient = result.patient;
      this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + this.idPatient + "\"").then((publications: any) => {
        this.publications = publications.rows;
        for(let posts of this.publications){
          this.dataService.getData("/"+posts.value.doc.post).then((post:any) => {
            this.idPost = post._id;
            this.posts.push(post.title)
          /*  this.dataService.getData("/_design/view/_view/comment-by-post?key=\"" + posts.value.doc.post + "\"").then((comments:any)=>{
              this.comments = comments.rows;
              for(let comment of this.comments){
                if(comment.value.patient == this.idPatient && comment.value.post == this.idPost){
                  this.text.push(comment.value.text)
                }
              }
            }) */
          })
        }
      });
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

      PDF.save(this.patient.name + '.pdf');
    });
  }

}
