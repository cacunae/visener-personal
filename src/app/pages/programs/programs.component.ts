import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService, programsTable } from 'src/app/services/data.service';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class ProgramsComponent implements OnInit {
  public programs:any[] = [];
  public program:any[] = [];
  public id:any[] = [];
  public patients: any[] = [];
  public patient:any;
  public columnsToDisplay: string[] = ['id', 'program', 'interactions', 'posts', 'datetime', 'actions'];
  public loading:boolean = true;
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService : DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  async getPrograms(){
    let tmpPrograms:any[] = [];
    await this.dataService.getData("/_design/view/_view/programs").then((programs:any) =>{
      tmpPrograms = programs.rows.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
    });
    for(let program of tmpPrograms){
      console.log("program:", program)
      let tmpPosts:any[] = []
      for(let post of program.value.posts){
          await this.dataService.getData("/" + post._id).then((post:any) =>{
          tmpPosts.push(post);
          });
      }
      program.postsDetail = tmpPosts;
    }
    for(let program of tmpPrograms){
      let tmpInteractions:any[] = []
      for(let interaction of program.value.interactions){
        if(interaction._id){
          // await this.dataService.getData("/" + interaction._id).then((interaction:any) =>{
          //   tmpInteractions.push(interaction);
          //});
        }
      }
      program.interactionDetail = tmpInteractions;
    }
    this.programs = [];
    for(let program of tmpPrograms){
      this.programs.push(program.value);
    }

    this.dataSource = new MatTableDataSource<programsTable>(this.programs);
      this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  delProgram(element: any) {
    this.dataService.getData("/_design/view/_view/treatments-by-programs?key=\"" + element._id + "\"&include_docs=true").then((treatment: any) =>{
      console.log(treatment);
      if (treatment.rows.length == 0) {
         if(confirm("??Est??s seguro de eliminar el programa " + element.title + "?\nEsta acci??n no podr?? deshacerse.")) {
          this.dataService.deleteById(element._id + "?rev=" + element._rev).then(() => {
            this.snackBar.open('Programa eliminado correctamente', 'OK', {duration: 5000});
            this.getPrograms();
          });
        } 
      } else if(treatment.rows.length == 1) {
        alert('No se puede eliminar este programa porque est?? asociado a un tratamiento')
      } else {
        alert('No se puede eliminar este programa porque est?? asociado a ' + treatment.rows.length + ' tratamientos.')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

