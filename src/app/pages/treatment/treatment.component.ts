import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html'
})
export class TreatmentComponent implements OnInit {
  @Input() treatment:any;
  @Input() origin:string;
  public interact:boolean = true;
  public loading:boolean = true;
  public program:any;

  constructor(public dialog: MatDialog, public http: HttpClient, public dataService: DataService) {
  }

  ngOnInit(): void {
      this.interact = false;
      this.getTreatment();
  }

  async getTreatment(){
    await this.dataService.getData("/" + this.treatment).then((treatment) => {
      this.treatment = treatment;
    });
    await this.dataService.getData("/" + this.treatment.program).then((program) => {
      this.program = program;
    });
    this.loading = false;
  }

}