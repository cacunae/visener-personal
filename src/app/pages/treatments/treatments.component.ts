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
    this.dataService.getData("/_design/view/_view/treatments").then((treatments:any) =>{
      this.treatments = treatments.rows.sort((a:any, b:any)=>{ return Number(b.value.datetime) - Number(a.value.datetime)});
    });
  }

  getTreatments(element:any){
    console.log("Element:", element)
  }

  delTreatment(element: any) {
    if(confirm("¿Estás seguro de eliminar la Tarea " + element.value.title + "?\nEsta acción no podrá deshacerse.")) {
      console.log("deleteInteraction::", element);
      this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
        this.snackBar.open('Programa eliminado correctamente', 'OK', {duration: 5000});
        location.reload();
      });
    }
  }

}

