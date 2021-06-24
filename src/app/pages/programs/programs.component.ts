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
  public columnsToDisplay: string[] = ['id', 'program', 'interactions', 'datetime', 'actions'];
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
      tmpPrograms = programs.rows.sort((a:any, b:any)=>{ return Number(b.value.datetime) - Number(a.value.datetime)});
    }); 
    for(let program of tmpPrograms){
      let tmpPosts:any[] = []
      for(let post of program.value.posts){
        await this.dataService.getData("/" + post).then((post:any) =>{
          tmpPosts.push(post);
        });
      }
      program.postsDetail = tmpPosts;
    }
    for(let program of tmpPrograms){
      let tmpInteractions:any[] = []
      for(let interaction of program.value.interactions){
        if(interaction._id){
          await this.dataService.getData("/" + interaction._id).then((interaction:any) =>{
            tmpInteractions.push(interaction);
          });
        }
      }
      program.interactionDetail = tmpInteractions;
    }
    this.programs = tmpPrograms;
    this.dataSource = new MatTableDataSource<programsTable>(this.programs);
      this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  delProgram(element: any) {
    if(confirm("¿Estás seguro de eliminar la Tarea " + element.value.title + "?\nEsta acción no podrá deshacerse.")) {
      this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
        this.snackBar.open('Programa eliminado correctamente', 'OK', {duration: 5000});
        this.getPrograms();
      });
    }
  }

}

