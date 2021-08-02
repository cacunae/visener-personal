import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { Label, MultiDataSet } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import { DialogInteractionComponent } from '../dialog-interaction/dialog-interaction.component';
import { ProgressChallengesComponent } from './progress-challenges.component';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  public data: any = { selection: null };
  @Input() programs: any;
  treatments: any[] = [];
  @Input() resizable: boolean;
  @Input() selectable: boolean;
  @Input() multiple: boolean;
  @Input() feedbacks: any;
  total: any;
  totalMax: any;
  public compressed: any = false;
  programId: any[] = [];
  treatmentId: any[] = [];
  interactionId: any[] = [];
  treatmentEnd: any[] = [];
  patient: any[] = [];
  patientId: any[] = [];
  percent: any;
  percents: any[] = [];
  @Input() value: any;
  exist:boolean = false;

  constructor(public dataService: DataService, public dialogRef: MatDialogRef<ChallengesComponent>, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFeedbacks();
    if (this.resizable) {
      this.compressed = true;
    }
    this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.dataService.user._id + "\"").then((treatments: any) => {
      for (let treatment of treatments.rows) {
        this.treatmentId.push(treatment.value.doc._id);
        this.interactionId = (treatment.value.doc.interactions)
        this.programId.push(treatment.value.doc.program);
        this.treatments.push(treatment);
        this.patientId.push(treatment.value.doc.patient)
        // this.value = Math.floor(Math.random() * (100 - 1)) + 1;//
      }
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

  progress(element: any) {
    const dialogRef = this.dialog.open(ProgressChallengesComponent, {
      width: '450px',
      data: element
    });
  }


  getFeedbacks() {
    this.dataService.getData("/_design/view/_view/feedback-by-user?key=\"" + this.dataService.user._id + "\"").then((feedbacks: any) => {
      this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.dataService.user._id + "\"").then((treatments: any) => {
        for (let feedback of feedbacks.rows) {
          for (let treat of treatments.rows) {
            if (treat.value.doc._id == feedback.value.treatment) {
              this.feedbacks.push(feedback);
              for (let interaction of treat.value.doc.interactions) {
                this.total = this.feedbacks.length;
                this.totalMax = interaction.params.long * interaction.params.iterations;
                this.percent = this.total * 100 / this.totalMax;
                this.percents.push(this.percent)
              }
            }
          }
        }
      })
    });
  }

}
