import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService, professionalsTable } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRelationComponent } from '../dialog-add-relation/dialog-add-relation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogReAsingComponent } from '../dialog-re-asing/dialog-re-asing.component';

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
  public patients:any = {};
  public columnsToDisplay: string[] = ['id', 'name', 'company', 'role', 'actions'];
  public loading:boolean = true;
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProfessionals();
  }

  async getProfessionals(){
    this.loading = true;
    this.professionals = [];
    await this.dataService.getData("/_design/view/_view/professionals?include_docs=true").then((professionals: any) => {
      professionals = professionals.rows.sort((a:any, b:any) => { return a.value.doc.name.localeCompare(b.value.doc.name) });
      for(let professional of professionals){
        professional.value.doc.role = {name: professional.name, _id: professional._id};
        this.professionals.push(professional.value.doc)
      }
      this.dataSource = new MatTableDataSource<professionalsTable>(this.professionals);
      this.dataSource.paginator = this.paginator;
    });
    for (let professional of this.professionals) {
      await this.dataService.getData("/_design/view/_view/relations-by-professional?key=\""+professional._id+"\"&include_docs=true").then((patients: any) => {
        professional.patients = patients.rows;
      }); 
    }
    this.loading = false;
  }

  delProfessional(element: any) {
    if(confirm("¿Estás seguro de eliminar al profesional " + element.name + "?\nEsta acción no podrá deshacerse.")) {
      if(element.patients.length>0){
        if(confirm("Te gustaría reasignar a los pacientes a un nuevo profesional?")){  
          this.addReAsing(element);
        }else{
          this.dataService.deleteById(element._id + "?rev=" + element._rev).then(() => {
            this.snackBar.open('Profesional Eliminado correctamente.', 'OK', {duration: 5000});
            this.getProfessionals();
          });
        }
      }else{
        this.dataService.deleteById(element._id + "?rev=" + element._rev).then(() => {
        this.snackBar.open('Profesional Eliminado correctamente.', 'OK', {duration: 5000});
        this.getProfessionals();
      });
    }
    }
  }

  addReAsing(element: any){
    const dialogRef = this.dialog.open(DialogReAsingComponent, {
      width: '400px',
      data: { professional: element._id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result:", result)
      if(result==="ok"){
        this.snackBar.open('Asociación realizada correctamente.', 'OK', {duration: 5000});
        this.dataService.deleteById(element._id + "?rev=" + element._rev).then(() => {
          this.snackBar.open('Profesional Eliminado correctamente.', 'OK', {duration: 5000});
          location.reload();
        });
        this.getProfessionals();
      }else if(result==="err"){
        this.snackBar.open('Se produjo un error al asociar.', 'ERR', {duration: 5000});
      }
    });
  }

  addRelation(element: any) {
    const dialogRef = this.dialog.open(DialogAddRelationComponent, {
      width: '400px',
      data: { professional: element._id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result==="ok"){
        this.snackBar.open('Asociación realizada correctamente.', 'OK', {duration: 5000});
        this.getProfessionals();
      }else if(result==="err"){
        this.snackBar.open('Se produjo un error al asociar.', 'ERR', {duration: 5000});
      }
    });
  }

  delRelation(professional:any, patient: any) {
    if(confirm("Estás seguro de eliminar la relación entre el profesional " + professional.name + " y el paciente " + patient.doc.name)) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
