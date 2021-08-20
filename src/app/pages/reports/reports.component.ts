import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, reportTable } from 'src/app/services/data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
      report.state = 'deleted';
      report.objeto = report.objeto._id;
      this.dataService.postData(report).then((res) => {
        this.getReports();
        console.log(res);
      }).then((a) => {
        this.snackBar.open('El reporte se ha eliminado.', 'OK', {duration: 5000})
      })
  }

  delete(report: any) {
    if (confirm("Esto eliminará el comentario y quitará el reporte de la lista. " + "\nEsta acción no podrá deshacerse.")) {
      report.objeto.state = 'deleted'
      this.dataService.postData(report.objeto).then((res) => {
        console.log(res);
        this.ignore(report)
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
