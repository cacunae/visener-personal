import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'  

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class TreatmentsComponent implements OnInit {
  public treatments:any[] = [];
  public treatment:any[] = [];
  public id:any[] = [];
  public patients: any[] = [];
  public patient:any;
  public columnsToDisplay: string[] = ['id', 'treatment', 'interactions', 'datetime', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('htmlData') htmlData:ElementRef;
  
  constructor(public snackBar: MatSnackBar, private dataService : DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/treatment-by-profesional").then((treatments:any) =>{
      treatments.rows.sort((a, b)=>{ return Number(b.value.datetime) - Number(a.value.datetime)});
      this.treatments = treatments.rows;
      for(let treatment of this.treatments){
        this.patients = treatment.value.doc.patient;
          this.dataService.getData("/"+this.patients).then((patient:any) =>{
            this.patient = patient.name;
          })
      }
  })
}


  getTreatments(element:any){
    console.log("Element:", element)
  }
  

  delTreatment(element: any) {
    if(confirm("¿Estás seguro de eliminar la Tarea " + element.value.title + "?\nEsta acción no podrá deshacerse.")) {
      console.log("deleteInteraction::", element);
      this.dataService.deleteById(element.value.doc._id + "?rev=" + element.value.doc._rev).then(() => {
        this.snackBar.open('Programa eliminado correctamente', 'OK', {duration: 5000});
        location.reload();
      });
    }
  }

}

