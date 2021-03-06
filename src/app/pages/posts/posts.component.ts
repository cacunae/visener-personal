import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, postsTable } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PostsComponent implements OnInit {
  public posts:any[] = [];
  public columnsToDisplay: string[] = ['id', 'image' ,'titulo', 'datetime' ,'actions'];
  public loading:boolean = true;
  public dataSource;
  public relation: number = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('htmlData') htmlData:ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService : DataService, public router: Router  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.loading = true;
    this.posts = [];
    this.dataService.getData("/_design/view/_view/posts").then((posts:any) =>{
      posts = posts.rows.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
      for(let post of posts){
        this.posts.push(post.value);
      }
      this.dataSource = new MatTableDataSource<postsTable>(this.posts);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  delete(element: any) {
    this.relation = 0;
    this.dataService.getData("/_design/view/_view/program-by-posts?key=\""+element._id+"\"&include_docs=true").then((program: any) =>{
      this.relation = this.relation + program.rows.length
      console.log(this.relation)
      
    })
    this.dataService.getData("/_design/view/_view/posts-by-interaction?key=\""+element._id+"\"&include_docs=true").then((interactions: any) =>{
      
      if (interactions.rows.length > 0 || this.relation > 0) {
        alert('No se puede eliminar este post porque est?? relacionado a alguna publicaci??n, tarea o programa.')
      } else if(interactions.rows.length == 0){
      if(confirm("??Est??s seguro de eliminar el Post " + element.title + "?\nEsta acci??n no podr?? deshacerse.")) {
        //this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
        element.state = "deleted";
        this.loading = true;
        this.dataService.postData(element).then(() => {
          this.snackBar.open('Post eliminado correctamente', 'OK', {duration: 5000});
          this.loading = false;
          this.getPosts();
        });
      }
    }
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
