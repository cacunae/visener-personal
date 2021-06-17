import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('htmlData') htmlData:ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService : DataService, public router: Router  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/posts").then((post:any) =>{
      this.posts = post.rows.sort((a:any, b:any) => { return a.value.datetime < b.value.datetime });
      this.dataSource = new MatTableDataSource<postsTable>(this.posts);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  delete(element: any) {
    if(confirm("¿Estás seguro de eliminar el Post " + element.value.title + "?\nEsta acción no podrá deshacerse.")) {
      //this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
      element.value.state = "deleted";
      this.loading = true;
      this.dataService.postData(element.value).then(() => {
        this.snackBar.open('Tarea eliminada correctamente', 'OK', {duration: 5000});
        this.loading = false;
        this.getPosts();
      });
    }
  }

}
