import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import * as moment from 'moment';
import { DialogData } from 'src/app/patient/groups/add-group.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-challenges',
  templateUrl: './view-challenges.component.html',
  styleUrls: ['./view-challenges.component.css']
})
export class ViewChallengesComponent implements OnInit {
  programs: any[] = [];
  programs2: any[] = [];
  treatments: any[] = [];
  feedbacks: any[] = [];
  dateVal: any;
  dateVal2: any;
  total: any;
  startDate: any;
  endDate:any;
  long: any;
  iterations: any[] = [];
  interactions: any[] = [];
  totalInteractions: any[] = [];
  actualDate:any;
  actual: any;
  end:string;
  start:any;
  actualTotal:any;

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.getTreatments();
  }

  getTreatments() {
    this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + this.dataService.user._id + "\"").then((treatments: any) => {
      for (let treatment of treatments.rows) {
        this.dataService.getData("/" + treatment.value.doc.program).then((program: any) => {
          this.actual = Date.now();
          this.actualDate = moment(this.actual).format("DD");     
          this.startDate = new Date(treatment.value.doc.startDate.substr(0, 10));
          this.endDate = new Date(treatment.value.doc.endDate.substr(0, 10));
          this.end = moment(this.endDate).format("DD");;
          this.start = moment(this.startDate).format("DD")
          this.actualTotal = parseInt(this.start) + 1; 
          this.dateVal2 = new Date();
          this.dateVal = Math.floor((this.dateVal2 - this.startDate) / 1000 / 60 / 60 / 24);
          program.startDate = this.startDate;
          program.endDate = this.endDate;
          program.actualDate =  parseInt(this.actualDate) - this.actualTotal;
          program.progress = this.dateVal * 100 / program.duration;
          program.progress = Math.floor(program.progress * 10) / 10;  
          if(program.progress>100){
            program.progress = 100;
            this.programs2.push(program);
          }else if(program.progress<0){
            this.programs2.push(program);
          }else{
            this.programs2.push(program);
          }
          program.allInteractions = 0;
        });
      }
      this.programs = this.programs2;
    });
  }

}
