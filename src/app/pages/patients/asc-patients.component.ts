import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ViewPostsComponent } from 'src/app/old-professional/view-posts/view-posts.component';
import { DataService, patientsTable } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-asc-patients',
  templateUrl: './asc-patients.acomponent.html'
})
export class AssociatedPatientsComponent implements OnInit {
  public professionals: any[] = [];
  public patients: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'company', 'actions'];
  public dataSource;
  public loading:boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  async getPatients(){
    this.loading = true;
    await this.dataService.getData("/_design/view/_view/relations-by-professional?include_docs=true&key=\"" + this.dataService.user._id + "\"").then((patients: any) => {
      this.patients = patients.rows.sort((a:any, b:any) => { return a.doc.name.localeCompare(b.doc.name) });
      this.dataSource = new MatTableDataSource<patientsTable>(this.patients);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
    for(let patient of this.patients){
      this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + patient.doc._id + "\"").then((posts:any) => {
        patient.posts = posts.rows.length;
      });
    }
    for(let patient of this.patients){
      this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + patient.doc._id + "\"").then((treatments:any) => {
        patient.treatments = treatments.rows.length;
      });
    }
  }

  asociarPost(patient:any) {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: {text:'add-treatment'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.postData({entity: "publication", state:"active", post: result.value._id, patient: patient.doc._id, professional: this.dataService.user._id, datetime: moment().format("YYYYMMDDHHmm") });
        this.getPatients();
      }
    });
  }

  verPaciente(patient:any){
    this.router.navigateByUrl("/professional/det-patient/" + patient.doc._id);
  }

  buscar(){
    alert("buscando" );
  }
}
