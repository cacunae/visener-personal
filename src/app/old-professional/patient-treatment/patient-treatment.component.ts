import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { PdfComponent } from '../pdf/pdf.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-treatment',
  templateUrl: './patient-treatment.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PatientTreatmentComponent implements OnInit {
  public programs: any[] = [];
  public columnsToDisplay: string[] = ['id', 'treatment', 'patient', 'interactions', 'datetime', 'actions'];
  public loading:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(public router: Router, public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPrograms();  
  }

  getPrograms(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/programs-by-professional?key=\"" + this.dataService.user._id + "\"&include_docs=true").then((programs: any) => {
      this.programs = programs.rows.sort((a:any, b:any) => { return Number(b.value.datetime) - Number(a.value.datetime) });
      this.loading = false;
    });
  }

  getPDF(element: any) {
    const dialogRef = this.dialog.open(PdfComponent, {
      width: '1000px',
      data: element,
    });
  }

  delTreatment(element: any) {
    if (confirm("¿Estás seguro de eliminar la Tarea " + element.value.title + "?\nEsta acción no podrá deshacerse.")) {
      this.dataService.deleteById(element.value.doc._id + "?rev=" + element.value.doc._rev).then(() => {
        this.snackBar.open('Programa eliminado correctamente', 'OK', { duration: 5000 });
        this.router.navigateByUrl("/professional/programs");
      });
    }
  }

}
