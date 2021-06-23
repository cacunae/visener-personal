import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-patient-programs',
  templateUrl: './chart-patient-programs.component.html'
})
export class ChartPatientProgramsComponent implements OnInit {
  arreglo: any=0;
  series: number=0;
  arr: any[]=[];
  public programado: any[]=[];
  public realizado: any[]=[];
  public labels: any[]=[];
  public dolor: any[]=[];
  @Input() treatment: string;
  @Input() interaction: string;
  idProgram: any;

  constructor(public http:HttpClient, private dataService : DataService) { }

  ngOnInit(): void {
    this.getPolls();
  }
 
  async getPolls(){
    await this.dataService.getData("/"+this.treatment).then((program: any) => {
      for(let interaction of program.interactions){
        this.idProgram = interaction._id;
        this.dataService.getData("/"+this.idProgram).then((result:any)=>{
          if(result.poll.type == 'slider'){
            this.programado.push(result.repetitions);
            console.log("programado:", this.programado)
          }
        })  
      }
    });
  } 

  // array con valores
  barChartData: ChartDataSets[] = [
    { data: this.realizado, label: 'Repeticiones Realizadas' },
    { data: this.programado, label: 'Repeticiones Programadas' }
  ];

  //Etiquetas
  barChartLabels: Label[] = this.labels;
  
  // opciones de grafico
  barChartOptions: ChartOptions = {
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
       /* {
          id: 'y-axis-1',
          position: 'right',
          scaleLabel:{
            labelString: 'Dolor',
            display: true,  
            fontColor: '#FF0000'
          }
          ticks:{
            beginAtZero: true,
            stepSize: 1,
            max: 2,
            fontColor: '#FF0000',
          },
        }*/
      ]
    },
  };

  // mostrar leyendas
  barChartLegend = true;

  public barChartType: ChartType = 'bar';

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

}
