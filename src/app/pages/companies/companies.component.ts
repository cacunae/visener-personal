import { NgLocalization } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { companiesTable, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
  public companies: any[] = [];
  public columnsToDisplay: string[] = ['id', 'logo', 'company', 'rut', 'razonsocial', 'rubro', 'actions'];
  public dataSource;
  public loading:boolean = true;
  public uploading:boolean = false;
  public attachment:any = {entity: "image"};

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/companies").then((companies:any) =>{
      this.companies = companies.rows.sort((a:any, b:any) => { return a.value.name.localeCompare(b.value.name) });
      this.dataSource = new MatTableDataSource<companiesTable>(this.companies);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  delCompany(element: any){
    this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
      this.snackBar.open('Empresa Eliminada correctamente.', 'OK', {duration: 5000});
      this.getCompanies();
    });
  }

}

