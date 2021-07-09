import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, patientsTable } from 'src/app/services/data.service';
import { DialogDelPatientsComponent } from './dialog-del-patients.component';

@Component({
  selector: 'app-get-information',
  templateUrl: './get-information.component.html'
})
export class GetInformationComponent implements OnInit {
  public professionals: any[] = [];
  public patients: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'company', 'actions'];
  public dataSource:any;
  public loading:boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/requests?include_docs=true").then((patients: any) => {
      this.patients = patients.rows.sort((a:any, b:any) => { return a.doc.name.localeCompare(b.doc.name) });
      this.dataSource = new MatTableDataSource<patientsTable>(this.patients);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }); 
  }

  getInformation(element: any){
    if(window.confirm('¿Quieres deshabilitar esta solicitud?')){
      element.value.doc.state = 'disabled';
      this.dataService.postData(element.value.doc).then(() => {
        console.log(element.value.doc);
        this.getPatients();
      });
    }
  }

  buscar(){
  }

}
