import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx';

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

    incomingfile(event: any) 
    {
    this.file = event.target.files[0]; 
    }
  
   Upload() {
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
              for(let file of XLSX.utils.sheet_to_json(worksheet)){
                this.postXLSX.entity = Object.values(file)[0];
                if(this.postXLSX.entity == "post"){
                  this.postXLSX.state = "active";
                  this.postXLSX.title = Object.values(file)[1];
                  this.postXLSX.subtitle = Object.values(file)[2];
                  this.postXLSX.content = Object.values(file)[3];
                  this.options = Object.values(file)[6].split(",");
                  var index = 1;
                  for(let option of this.options){
                    var array = {id: index, description: option}
                    this.selectedOptions.push(array);
                    index++;
                  }
                  this.postXLSX.poll = [{type: Object.values(file)[4], question: Object.values(file)[5], options: this.selectedOptions}];
                }else if(this.postXLSX.entity == "interaction"){
                  this.postXLSX.state = "active";
                  this.postXLSX.title = Object.values(file)[1];
                  this.postXLSX.subtitle = Object.values(file)[2];
                  this.postXLSX.content = Object.values(file)[3];
                  this.postXLSX.iterations = Object.values(file)[4];
                  this.postXLSX.repetitions = Object.values(file)[5];
                  this.postXLSX.series = Object.values(file)[6];
                  this.postXLSX.rest = Object.values(file)[7];
                  this.postXLSX.weekdays = Object.values(file)[8].split(",");
                  this.postXLSX.poll = {type: Object.values(file)[9], relation: Object.values(file)[10], question: Object.values(file)[11]}
                }    
               /* this.dataService.postData(this.postXLSX); */
               console.log("FILES::", this.postXLSX)
              }
          }
          fileReader.readAsArrayBuffer(this.file);
  }
}
