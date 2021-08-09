import { DatePipe } from '@angular/common';
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
  @Input() startDate: Date;
  @Input() endDate:Date;
  start: any;
  end:any;

  constructor(public datepipe: DatePipe,public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ProgressChallengesComponent>) {
    this.arreglo = data;
    this.date = moment().format('DD/MM/YYYY') 
    this.refreshDR();
   }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\""+this.dataService.user._id + "\"").then((treatments:any)=>{
      for(let treatment of treatments.rows){
        this.treatmentId.push(treatment.value.doc.program)
        this.startDate = new Date(treatment.value.doc.startDate.substr(0, 10));
        this.datepipe.transform(treatment.value.doc.startDate, "dd/MM")
        console.log("date1:", this.datepipe.transform(treatment.value.doc.startDate, 'd'))
        console.log("date2:", this.datepipe.transform(treatment.value.doc.endDate, 'dd'))
        this.endDate = new Date(treatment.value.doc.endDate.substr(0, 10));
        this.end = this.datepipe.transform(treatment.value.doc.endDate, 'dd')
        this.start = this.datepipe.transform(treatment.value.doc.startDate, 'd');
        console.log("start::", this.start, "end::", this.end)
        this.treatments.push(treatment);
        this.sampleRange = new DateRange((() => {
          let v = new Date();
          console.log("getDate:", v.getDate())
          v.setDate(this.end);
          return v;
        })(), new Date());
      }
    })
  }

  refreshDR() {

    
  }

  onChange(ev: any) {
    console.log(`cal onChange:`, ev);
  }

}
