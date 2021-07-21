import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService, interactionsTable } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRelationComponent } from '../dialog-add-relation/dialog-add-relation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from 'ng2-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class InteractionsComponent implements OnInit {
  public interactions: any[] = [];
  public polls:any;
  public columnsToDisplay: string[] = ['id','image','name','actions'];
  public week: any[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  public feedback: any[] = [{ id: "slider", value: "Slider" }, { id: "state", value: "Estados (Caritas)" }, { id: "yesno", value: "Opciones (Sí/No)" }];
  public relations: any[] = [{ id: "ejercicio", value: "Feedback asociado a ejercicio" }, { id: "series", value: "Feedback asociado a series" }];
  public post:any;
  public repetitions:any;
  public id: any;
  public title: any;
  subtitle: any;
  content: any;
  iterations: any;
  series: any;
  rest: any;
  weekdays: []=[];
  question: any;
  type: any;
  relation: any;
  public loading:boolean = true;
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions(){
    this.loading = true;
    this.interactions = [];
    this.dataService.getData("/_design/view/_view/interactions").then((interactions: any) => {
      interactions = interactions.rows.sort((a, b) => { return a.value.title.localeCompare(b.value.title) });
      for(let interaction of interactions){
        this.interactions.push(interaction.value);
      }
      this.dataSource = new MatTableDataSource<interactionsTable>(this.interactions);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  setDays(interaction: any, dayname: string) {
    if (interaction.weekdays.findIndex((day: string) => day === dayname) < 0) {
      interaction.weekdays.push(dayname);
    } else {
      interaction.weekdays.splice(interaction.weekdays.findIndex((day: string) => day === dayname), 1);
    }
  }

  delInteraction(element: any) {
    if(confirm("¿Estás seguro de eliminar la Tarea " + element.title + "?\nEsta acción no podrá deshacerse.")) {
      //console.log("deleteInteraction::", element);
      //this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
      element.state = "deleted";
      this.dataService.postData(element).then(() => {
        this.snackBar.open('Tarea eliminada correctamente', 'OK', {duration: 5000});
        this.getInteractions();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
