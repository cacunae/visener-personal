import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html'
})
export class AddCompanyComponent implements OnInit {
  public company: any = { entity: "company", name: "", rut: "", razon: "", rubro: "" };
  public loading: boolean = true;
  public id: string = "";
  public attachment: any = { entity: "image" };

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public http: HttpClient, public router: Router, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData("/" + this.id).then((result: any) => {
        this.company = result;
        console.log("company:", result)
      });
    }
  }

  ngOnInit(): void {
  }

  publicar(files: File[]) {
    let file: File = files[0];
    if (this.company.rut.length == 10) {
      if (this.id) {
        if(files.length>0){
          this.dataService.postData(this.company).then((result: any) => {
            let headers = new HttpHeaders().set("If-Match", result.rev);
            this.http.put(this.dataService.databaseAPI + "/" + result.id + "/" + this.attachment.entity, file, { headers: headers }).subscribe((result2) => {
              this.loading = false;
            });
            this.snackBar.open('Empresa Actualizada correctamente', 'OK', { duration: 3000 });
            this.router.navigateByUrl("/professional/companies");
          })
        }else{
          this.dataService.postData(this.company).then((result: any) => {
            this.snackBar.open('Empresa Actualizada correctamente', 'OK', { duration: 3000 });
            this.router.navigateByUrl("/professional/companies");
          });
        }
      }else{
        this.dataService.postData(this.company).then((result: any) => {
          let headers = new HttpHeaders().set("If-Match", result.rev);
          this.http.put(this.dataService.databaseAPI + "/" + result.id + "/" + this.attachment.entity, file, { headers: headers }).subscribe((result2) => {
            this.loading = false;
          });
          this.snackBar.open('Empresa Creada correctamente', 'OK', { duration: 3000 });
          this.router.navigateByUrl("/professional/companies");
        });
      }
    }else {
      this.snackBar.open('Debe ingresar un RUT válido', 'ERR', { duration: 3000 });
    }
  }

}

