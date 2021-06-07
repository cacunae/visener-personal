import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  arreglo: any=0;
  series: number=0;
  arr: any[]=[];
  public programado: any[]=[];
  public realizado: any[]=[];
  public labels: any[]=[];
  public dolor: any[]=[];
  @Input() treatment: string;
  @Input() interaction: string;

  constructor(public http:HttpClient, private dataService : DataService) { }

  ngOnInit(): void {
    this.getPolls();
  }
 
  async getPolls(){
   await this.dataService.getData("/_design/view/_view/polls-by-chart?key=[\"" + this.treatment + "\",\"" + this.interaction + "\"]").then((polls: any) => {
       if(polls.rows){
        polls.rows.sort((a:any, b:any) => { return Number(a.value.datetime) - Number(b.value.datetime) });
        for(let poll of polls.rows){
          if(poll.value.slider){
            this.realizado.push(poll.value.slider);
            this.programado.push(poll.value.slidermax);
            this.labels.push(poll.value.date)
            this.dolor.push(Math.floor(Math.random() * (3)) + 0)
          }
        }
      }
    });
  } 

  // array con valores
 lineChartData: ChartDataSets[] = [
    { data: this.programado, label: 'Programado' },
    { data: this.realizado, label: 'Realizado' },
    { data: this.dolor, label: 'Dolor', yAxisID: 'y-axis-1',}
  ];

  //Etiquetas
  lineChartLabels: Label[] = this.labels;
  
  // opciones de grafico
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        id: 'x-axis-0',
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks:{
            beginAtZero: true,
            max: 10,
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          scaleLabel:{
            labelString: 'Dolor',
            display: true,  
            fontColor: '#FF0000'
          },
          ticks:{
            beginAtZero: true,
            stepSize: 1,
            max: 2,
            fontColor: '#FF0000',
          },
        }
      ]
    },
  };

  // Colores de lineas
  lineChartColors: Color[] = [

    { // verde
      backgroundColor: 'transparent',
      borderColor: '#36A2EB',
    },
    { //azul
      backgroundColor: 'transparent',
      borderColor: '#63FF84',
    },
    { //azul
      backgroundColor: 'transparent',
      borderColor: 'red',
    }
  ];

  // mostrar leyendas
  lineChartLegend = true;

  lineChartType = 'line';

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

}
