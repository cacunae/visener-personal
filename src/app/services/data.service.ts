import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public databaseAPI = environment.databaseAPI;
  headers: any;

  constructor(public http: HttpClient) { 
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  login(user:string,pass:string){
    return this.http.get(this.databaseAPI + '/_design/view/_view/login?key=["'+user+'","'+pass+'"]',{ headers: this.headers}).toPromise()
  }

  listById(id:any){
    return this.http.get(this.databaseAPI + '/' + id ,{headers:this.headers}).toPromise();
  }

  deleteById(id:any){
    return this.http.delete(this.databaseAPI + '/' + id, {headers:this.headers}).toPromise();
  }

  update(id:any){
    return this.http.put(this.databaseAPI + '/' + id, {headers:this.headers}).toPromise();
  }

  getData(method:string){
    return new Promise( (resolve) => {
      this.http.get(this.databaseAPI + method).subscribe((result:any) =>{ resolve(result); });
    });
  }

  postData(body:any){
    return this.http.post(this.databaseAPI, body, { headers: this.headers}).toPromise()
  }

}

@Pipe({name: 'fechaFormateada'})
export class fechaFormateada implements PipeTransform {
  transform(value: string):string {
    return moment(value, "YYYYMMDDHHmmss").format("DD-MM-YYYY HH:mm");
  }
}

@Pipe({name: 'weekDays'})
export class weekDays implements PipeTransform {
  transform(obj:any):boolean {
    if(obj.arr.findIndex((day:string) => day === obj.day)<0){
      return false;
    }else{
      return true;
    }
  }
}

@Pipe({name: 'tagFilter'})
export class tagFilter implements PipeTransform {
  transform(obj:any):boolean {
    let tags:string = obj.tags == undefined ? '':obj.tags.toUpperCase();
    let search:string = obj.search.toUpperCase();
    if(search.length==0 || tags.indexOf(search)>=0){
      return true;
    }else{
      return false;
    }
  }
}


@Pipe({name: 'image'})
export class image implements PipeTransform {
  transform(img:any):string {
      return environment.databaseAPI + "/" + img + "/image";
  }
}

@Pipe({name: 'video'})
export class video implements PipeTransform {
  transform(img:any):string {
      return environment.databaseAPI + "/" + img + "/video";
  }
}
