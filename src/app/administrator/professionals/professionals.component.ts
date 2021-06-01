import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRelationComponent } from '../dialog-add-relation/dialog-add-relation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ProfessionalsComponent implements OnInit {
  public professionals: any[] = [];
  public columnsToDisplay: string[] = ['id', 'name', 'username', 'rol', 'actions'];
  public loading:boolean = true;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProfessionals();
  }

  getProfessionals(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/professionals").then((professionals: any) => {
      this.professionals = professionals.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
      this.loading = false;
      for (let professional of this.professionals) {
        this.dataService.getData("/_design/view/_view/relations-by-professional?key=\""+professional.value._id+"\"&include_docs=true").then((patients: any) => {
          professional.patients = patients.rows;
        }); 
      }
    });
  }

  delProfessional(element: any) {
    if(confirm("¿Estás seguro de eliminar al profesional " + element.value.name + "?\nEsta acción no podrá deshacerse.")) {
      this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
        this.snackBar.open('Profesional Eliminado correctamente', 'OK', {duration: 5000});
        this.getProfessionals();
      });
    }
  }

  addRelation(element: any) {
    const dialogRef = this.dialog.open(DialogAddRelationComponent, {
      width: '400px',
      data: { professional: element.value._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProfessionals();
    });
  }

  delRelation(professional:any, patient: any) {
    if(confirm("Estás seguro de eliminar la relación entre el profesional " + professional.value.name + " y el paciente " + patient.doc.name)) {
      this.dataService.deleteById(patient.value.doc._id + "?rev=" + patient.value.doc._rev).then((result:any) => {
        if(result.ok){
          this.getProfessionals();
          this.snackBar.open('Relación eliminada correctamente.', 'OK', {duration: 5000});
        }else{
          this.snackBar.open('Error al eliminar relación.', 'OK', {duration: 5000});
        }
      });
    }
  }

}
