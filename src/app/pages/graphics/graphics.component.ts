import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  public arrayBuffer:any;
  public file: File;
  public postXLSX: any = {};
  public poll: any = {type:"", question: "", options: {}};
  public options: any[] = [];
  public selectedOptions: any[] = [];
  public weekdays: any[] = [];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
  }

}
