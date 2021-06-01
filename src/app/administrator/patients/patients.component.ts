import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
  public professionals: any[] = [];
  public patients: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'actions'];

  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.dataService.getData("/_design/view/_view/patients").then((patients: any) => {
      this.patients = patients.rows.sort((a, b) => { return a.value.name.localeCompare(b.value.name) });
    }); 
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

  addPatient(element: any) {
  }

  updPatient(element: any) {
  }
}
