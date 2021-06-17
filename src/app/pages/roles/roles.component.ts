import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, rolesTable } from 'src/app/services/data.service';

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html'
})
export class RolesComponent implements OnInit {
  public roles:any[] = [];
  public columnsToDisplay:string[] = ['id', 'name', 'company', 'datetime', 'actions'];
  public loading:boolean = true;
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/roles").then((roles: any) => {
      this.roles = roles.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
      this.dataSource = new MatTableDataSource<rolesTable>(this.roles);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });

  }

}
