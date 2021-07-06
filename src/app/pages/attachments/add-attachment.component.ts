import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html'
})
export class AddAttachmentComponent implements OnInit {
  public attachment:any = {entity: "image"};
  public data:any = {selection:null};
  public uploading:boolean = false;

  constructor(public route: ActivatedRoute, public snackBar: MatSnackBar, public router: Router, public http:HttpClient, public dataService: DataService) { 
    let id = route.snapshot.paramMap.get('id');
    if(id){
      this.dataService.getData("/" + id).then((result: any) => {
        this.attachment = result;
      });
    }
  }

  ngOnInit(): void {
  }

  public async uploadFile( files: File[] ){
    this.uploading = true; 
    if(files[0] && this.attachment.tags){
      let file:File = files[0];
      this.attachment.datetime = moment().format('YYYYMMDDHHmmss');
      this.attachment.tags = this.attachment.tags + ",  " + files[0].name.split(".")[0];
      this.dataService.postData(this.attachment).then((result: any) => {
        let headers = new HttpHeaders().set("If-Match", result.rev);
        this.http.put(this.dataService.databaseAPI + "/" + result.id + "/" + this.attachment.entity, file, { headers: headers}).subscribe((result2) => {
          if(this.attachment.entity == "image"){
            this.snackBar.open('Imagen publicada correctamente', 'OK', {duration: 3000});
          }else{
            this.snackBar.open('Video publicado correctamente', 'OK', {duration: 3000});
          }
          this.uploading = false;
          this.router.navigateByUrl("/professional/attachments");
        });
      });
    }else if(files.length>0){
      let file:File;
      this.attachment.datetime = moment().format('YYYYMMDDHHmmss');
      for(let file of files){
        this.attachment.tags = file.name.split(".")[0];
        this.dataService.postData(this.attachment).then((result: any) => {
          let headers = new HttpHeaders().set("If-Match", result.rev);
          this.http.put(this.dataService.databaseAPI + "/" + result.id + "/" + this.attachment.entity, file, { headers: headers}).subscribe((result2) => {
            if(this.attachment.entity == "image"){
              this.snackBar.open('Imagen publicada correctamente', 'OK', {duration: 3000});
            }else{
              this.snackBar.open('Video publicado correctamente', 'OK', {duration: 3000});
            }
            this.uploading = false;
            this.router.navigateByUrl("/professional/attachments");
          });
        });
      }
    }else if(this.attachment._id){
      this.dataService.postData(this.attachment).then((result: any) => {
        if(this.attachment.entity == "image"){
          this.snackBar.open('Imagen publicada correctamente', 'OK', {duration: 3000});
        }else{
          this.snackBar.open('Video publicado correctamente', 'OK', {duration: 3000});
        }
        this.uploading = false;
        this.router.navigateByUrl("/professional/attachments");
      });
    }else if(!files[0]){
      this.uploading = false;
      this.snackBar.open('Debe seleccionar un archivo', 'OK', {duration: 3000});
    }else{
      this.uploading = false;
      this.snackBar.open('Debe ingresar algún tag', 'OK', {duration: 3000});
    } 
	}

}
