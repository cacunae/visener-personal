import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, patientsTable } from 'src/app/services/data.service';
import { DialogDelPatientsComponent } from './dialog-del-patients.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
  public professionals: any[] = [];
  public patients: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'company', 'actions'];
  public dataSource:any;
  public loading:boolean = true;
  public notifications:number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPatients();
    this.getNotifications();
  }

  getPatients(){
    this.loading = true;
    this.patients = [];
    this.dataService.getData("/_design/view/_view/patients").then((patients:any) => {
      patients = patients.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
      for(let patient of patients){
        this.patients.push(patient.value);
      }
      this.dataSource = new MatTableDataSource<patientsTable>(this.patients);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }); 
  }

  getNotifications(){
    this.dataService.getData("/_design/view/_view/requests").then((notifications:any) => {
      this.notifications = notifications.total_rows;
    });
  }

  delPatient1(element: any){
    this.dataService.getData("/_design/view/_view/relations-by-patient?key=\""+element.value._id+"\"&include_docs=true").then((professionals: any) => {
      if(professionals.rows){
        for(let professional of professionals.rows){
          console.log("proff::", professional)
          this.dataService.deleteById(professional.value.doc._id + "?rev=" + professional.value.doc._rev);
          this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev);
        } 
      }
      this.dataService.getData("/_design/view/_view/treatments-by-patient?key=\""+element.value._id+"\"&include_docs=true").then((treatments: any) => {
        if(treatments.rows){
          for(let treatment of treatments.rows){
            console.log("treatments:", treatment.value.doc._id, treatment.value.doc._rev)
            this.dataService.deleteById(treatment.value.doc._id + "?rev=" + treatment.value.doc._rev);
          }
        }
        this.dataService.getData("/_design/view/_view/feedback-by-user?key=\""+element.value._id+"\"&include_docs=true").then((comments: any) => {
          if(comments.rows){
            for(let comment of comments.rows){
              console.log("comments:", comment)
              this.dataService.deleteById(comment.value._id + "?rev=" + comment.value._rev)
            }
          }
        })
      })
      alert("Paciente Eliminado Correctamente");
      this.getPatients();
    })  
  }

  delPatient(element: any) {
    this.dataService.getData("/_design/view/_view/relations-by-patient?key=\""+element.value._id+"\"&include_docs=true").then((professionals: any) => {
      if(professionals && professionals.rows && professionals.rows.length>0){
        alert("No se puede eliminar este paciente porque está relacionado a un profesional.");
      }else if(professionals && professionals.rows && professionals.rows.length>0){
        alert("No se puede eliminar este paciente porque está relacionado a " + professionals.rows.length + " profesionales.");
      }else{
        if(confirm("¿Estás seguro de eliminar al paciente " + element.value.name + "?\nEsta acción no podrá deshacerse.")) {
          this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
            this.snackBar.open('Paciente Eliminado correctamente.', 'OK', {duration: 5000});
            this.getPatients();
          });
        }
      }
    });
  }

  buscar(){
    alert("buscando" );
  }

  eliminar() {
    const dialogRef = this.dialog.open(DialogDelPatientsComponent, {
      width: '500px',
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
