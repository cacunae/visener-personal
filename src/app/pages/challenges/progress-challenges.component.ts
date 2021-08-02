import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'app-progress-challenges',
  templateUrl: './progress-challenges.component.html',
  styleUrls: ['./progress-challenges.component.css'],
  providers: [MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER]
})
export class ProgressChallengesComponent implements OnInit {
  arreglo:any = {};
  treatments:any[] = [];
  treatmentId: any[] = [];
  date:any;
  public sampleRange: DateRange<Date>;
  @Input() startDate:any;
  @Input() endDate:any;

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ProgressChallengesComponent>) {
    this.arreglo = data;
    this.date = moment().format('DD/MM/YYYY')
   }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\""+this.dataService.user._id + "\"").then((treatments:any)=>{
      for(let treatment of treatments.rows){
        this.treatmentId.push(treatment.value.doc.program)
        this.startDate = new Date(treatment.value.doc.startDate.substr(0, 10));
        this.endDate = new Date(treatment.value.doc.endDate.substr(0, 10));
        console.log("Start:", this.startDate, "End:", this.endDate)
        this.treatments.push(treatment);
      }
    })
  }

  refreshDR() {
    this.sampleRange = new DateRange((() => {
      let v = new Date();
      v.setDate(v.getDate() - 7);
      return v;
    })(), new Date());
  }

  onChange(ev: any) {
    console.log(`cal onChange:`, ev);
  }

}
