import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html'
})
export class RolesComponent implements OnInit {
  public roles:any[] = [];
  public columnsToDisplay:string[] = ['id', 'name', 'company', 'datetime', 'actions'];
  public loading:boolean = true;

  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/roles").then((roles: any) => {
      this.roles = roles.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
      this.loading = false;
    });

  }

}
