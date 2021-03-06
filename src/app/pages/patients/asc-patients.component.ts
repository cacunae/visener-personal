import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ViewPostsComponent } from '../posts/view-posts.component';
import { DataService, patientsTable } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AssociateComponent } from '../posts/associate.component';

@Component({
  selector: 'app-asc-patients',
  templateUrl: './asc-patients.acomponent.html'
})
export class AssociatedPatientsComponent implements OnInit {
  public professionals: any[] = [];
  public patients: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'company', 'actions'];
  public dataSource;
  public loading: boolean = true;
  public post: any = {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  async getPatients() {
    this.loading = true;
    this.patients = [];
    await this.dataService.getData("/_design/view/_view/relations-by-professional?include_docs=true&key=\"" + this.dataService.user._id + "\"").then((patients: any) => {
      patients = patients.rows.sort((a: any, b: any) => { return a.doc.name.localeCompare(b.doc.name) });
      for (let patient of patients) {
        this.patients.push(patient.doc);
      }
      this.dataSource = new MatTableDataSource<patientsTable>(this.patients);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
    for (let patient of this.patients) {
      this.dataService.getData("/_design/view/_view/publications-by-patient?key=\"" + patient._id + "\"").then((posts: any) => {
        patient.posts = posts.rows.length;
      });
    }
    for (let patient of this.patients) {
      this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\"" + patient._id + "\"").then((treatments: any) => {
        patient.treatments = treatments.rows.length;
      });
    }
  }

  asociarPost(patient: any) {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: { text: 'add-treatment' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        let post = {
          entity: "publication",
          state: "active",
          post: result.value._id,
          patient: patient._id,
          professional: this.dataService.user._id,
          datetime: moment().format("YYYYMMDDHHmm")
        };
        this.dataService.postData(post).then(() => {
          this.getPatients();
        })
      }
    });
  }

  asociarPostMultiple(templateRef) {
    const dialogRef = this.dialog.open(ViewPostsComponent, {
      width: '520px',
      data: { text: 'add-treatment' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const dialogRef2 = this.dialog.open(AssociateComponent, {
          width: '520px',
          data: { text: 'add-treatment' }
        });
        dialogRef2.afterClosed().subscribe((result2) => {
          if (result2) {
            console.log("result:", result2)
            let dialogRef = this.dialog.open(templateRef, {
              width: '520px'
            });
            dialogRef.afterClosed().subscribe(result3 => {
              this.post.startDate = moment(result3.startDate).format('DDMMYYYY');
              this.post.endDate = moment(result3.endDate).format('DDMMYYYY')
              console.log('dialog cerrado', this.post);
              for (let patient of result2) {
                this.dataService.postData({ entity: "publication", state: "active", post: result.value._id, patient: patient, professional: this.dataService.user._id, startDate: this.post.startDate, endDate: this.post.endDate }).then((result4) => {
                  console.log(result4)
                  this.getPatients();
                });
                console.log("patient", patient)
              }
            });
          }
        });
      }
    });
  }

  verPaciente(patient: any) {
    this.router.navigateByUrl("/professional/det-patient/" + patient._id);
  }

  buscar() {
    alert("buscando");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
