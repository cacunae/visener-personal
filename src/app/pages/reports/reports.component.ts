import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, reportTable } from 'src/app/services/data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReportsComponent implements OnInit {
  public notifications: number = 0;
  public dataSource: any;
  public reports: any = [];
  public columnsToDisplay: string[] = ['id', 'patientName', 'entity', 'datetime', 'actions'];
  public loading: boolean = true;
  expandedElement: reportTable | null;
  panelOpenState = false;
  self = this;


  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getReports();
  }

  buscar() {
    alert("buscando");
  }

  getReports() {
    this.loading = true;
    let temp: any = [];
    this.dataService.getData("/_design/view/_view/reports").then((reportes: any) => {
      console.log(reportes);

      reportes = reportes.rows.sort((a: any, b: any) => { return a.value.patientName.trim().localeCompare(b.value.patientName.trim()) });
      for (let rep of reportes) {
        if (rep.value.state && rep.value.state == 'deleted') {
          console.log('lalla');

        } else {
          temp.push(rep.value);
        }
      }
    }).then((a) => {
      this.getObject(temp);

    })
    this.loading = false
  }


  // forma de traer el objeto
  getObject(temp: any) {
    console.log(temp);

    for (let report of temp) {
      this.dataService.getData("/" + report.objeto).then((objeto) => {
        report.objeto = objeto;
      }).then((result) => {
        this.reports = temp;
        this.dataSource = new MatTableDataSource<reportTable>(this.reports)
      })
    }
  }

  ignore(report: any) {
    if (this.reports.length <= 1) {
      report.state = 'deleted';
      report.objeto = report.objeto._id;
      this.dataService.postData(report).then((res) => {
        this.getReports();
        console.log(res);
      }).then((a) => {
        document.location.reload();
        this.snackBar.open('El reporte se ha eliminado.', 'OK', { duration: 5000 })
      })  
    } else{
      report.state = 'deleted';
      report.objeto = report.objeto._id;
      this.dataService.postData(report).then((res) => {
        this.getReports();
        console.log(res);
      }).then((a) => {
        this.snackBar.open('El reporte se ha eliminado.', 'OK', { duration: 5000 })
      })
    }
  }

  delete(report: any) {
    if (this.reports.length <= 1) {
      console.log('aaaa');
      if (window.confirm('Esta acci??n eliminar?? el reporte y el comentario')) {
        report.objeto.state = 'deleted'
        this.dataService.postData(report.objeto)
        report.state = 'deleted';
        report.objeto = report.objeto._id;
        this.dataService.postData(report).then((res) => {
          this.getReports();
          console.log(res);
        }).then((a) => {
          document.location.reload();
          this.snackBar.open('El reporte se ha eliminado.', 'OK', { duration: 5000 })
        })
      }
    } else {
      if (window.confirm('Esta acci??n eliminar?? el reporte y el comentario')) {
        report.objeto.state = 'deleted'
        this.dataService.postData(report.objeto)
        report.state = 'deleted';
        report.objeto = report.objeto._id;
        this.dataService.postData(report).then((res) => {
          this.getReports();
          console.log(res);
        }).then((a) => {
          this.snackBar.open('El reporte se ha eliminado.', 'OK', { duration: 5000 })
        })
      }
    }

    /* report.objeto.state = 'deleted'
    this.dataService.postData(report.objeto).then((res) => {
      report.state = 'deleted';
      report.objeto = report.objeto._id;
      this.dataService.postData(report)
      //this.dataSource.data = [...this.dataSource.data];
      this
    }) */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
