import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-weblog',
  templateUrl: 'weblog.component.html',
  styleUrls: ['weblog.component.css']
})
export class WeblogComponent implements OnInit {
  public logs:any[] = [];

  constructor(public dataService: DataService) {
    this.dataService.getData("/_design/view/_view/feedback-by-user?key=\"" + this.dataService.user._id + "\"").then((feedback:any) =>{
      this.logs = feedback.rows.sort((a, b)=>{ return Number(b.value.datetime) - Number(a.value.datetime)});
    });
  }

  ngOnInit(): void {
  }

}
