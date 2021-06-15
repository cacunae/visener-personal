import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
  public company: any[] = [];
  public columnsToDisplay: string[] = ['id', 'logo', 'company', 'rut', 'razonsocial', 'rubro', 'actions'];
  public dataSource;
  public loading:boolean = true;
  public uploading:boolean = false;
  public attachment:any = {entity: "image"};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  http: any;
  router: any;

  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/companies").then((companies:any) =>{
      this.company = companies.rows;
    })
    this.loading = false;
  }

  delPatient(element: any) {
    this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
      this.snackBar.open('Empresa Eliminada correctamente.', 'OK', {duration: 5000});
      this.getCompanies();
    });
  }

}

