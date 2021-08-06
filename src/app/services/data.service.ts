import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public databaseAPI = environment.databaseAPI;
  public headers:any;
  public user:User;
  public session:any;

  constructor(public http: HttpClient) { 
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  login(user:string,pass:string){
    return this.http.get(this.databaseAPI + '/_design/view/_view/login?key=["'+user+'","'+pass+'"]',{ headers: this.headers}).toPromise()
  }

  setUser(user:any){
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
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


export interface patientsTable {
  id: number;
  name: string;
  username: string;
  company: string;
  actions: string;
}

export interface professionalsTable {
  id: number;
  name: string;
  company: string;
  role: string;
  actions: string;
}

export interface attachmentsTable {
  id: number;
  image: string;
  tags: string;
  actions: string;
}

export interface companiesTable {
  id: number;
  logo: string;
  company: string;
  rut: string;
  razonsocial: string;
  rubro: string;
  actions: string;
}

export interface interactionsTable {
  id: number;
  image: string;
  name: string;
  actions: string;
}

export interface postsTable {
  id: number;
  image: string;
  title: string;
  datetime: string;
  actions: string;
}

export interface programsTable {
  id: number;
  program: string;
  interactions: string;
  datetime: string;
  actions: string;
}

export interface rolesTable {
  id: number;
  name: string;
  company: string;
  datetime: string;
  actions: string;
}

export class User{
  _id:string = "";
  _rev:string = "";
  entity:string = "";
  name:string = "";
  username:string = "";
  password:string = "";
  role:string = "";
  lastAccess:string = "";
  granted:boolean = false;
  features:any[] = [];
  enabled:string = "";
}

@Pipe({name: 'fechaFormateada'})
export class fechaFormateada implements PipeTransform {
  transform(value: string):string {
    return moment(value, "YYYYMMDDHHmmss").format("DD-MM-YYYY HH:mm");
  }
}

@Pipe({name: 'fechaFormateadaCorta'})
export class fechaFormateadaCorta implements PipeTransform {
  transform(value: string):string {
    return moment(value, "YYYYMMDDHHmmss").format("DD-MM-YYYY");
  }
}

@Pipe({name: 'treatmentActivePipe'})
export class treatmentActivePipe implements PipeTransform {
  transform(object: any):boolean {
    let now = moment().format("YYYYMMDD");
    let start = moment(object.start, "YYYYMMDDHHmmss").format("YYYYMMDD");
    let end = moment(object.end, "YYYYMMDDHHmmss").format("YYYYMMDD");
    return start <= now && now <= end;
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

@Pipe({name: 'postFilter'})
export class postFilter implements PipeTransform {
  transform(obj:any):boolean {
    let post:string = obj.post == undefined ? '':obj.post.toUpperCase();
    let search:string = obj.search.toUpperCase();
    if(search.length==0 || post.indexOf(search)>=0){
      return true;
    }else{
      return false;
    }
  }
}

@Pipe({name: 'programFilter'})
export class programFilter implements PipeTransform {
  transform(obj:any):boolean {
    let program:string = obj.program == undefined ? '':obj.program.toUpperCase();
    let search:string = obj.search.toUpperCase();
    if(search.length==0 || program.indexOf(search)>=0){
      return true;
    }else{
      return false;
    }
  }
}

@Pipe({name: 'interactionFilter'})
export class interactionFilter implements PipeTransform {
  transform(obj:any):boolean {
    let interaction:string = obj.interaction == undefined ? '':obj.interaction.toUpperCase();
    let search:string = obj.search.toUpperCase();
    if(search.length==0 || interaction.indexOf(search)>=0){
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

@Pipe({name: 'featuresPipe'})
export class featuresPipe implements PipeTransform {
  transform(obj:any):boolean {
    if(obj.features.findIndex((feature:any) => feature.name === obj.feature) < 0){
      return false;
    }else{
      return obj.features[obj.features.findIndex((feature:any) => feature.name === obj.feature)].actions.findIndex((action:string) => action === obj.action) < 0 ? false:true;
    }
  }
}

@Pipe({name: 'postnamePipe'})
export class postnamePipe implements PipeTransform {
  transform(obj:any):string {
    if(obj.posts.findIndex((post:any) => post._id === obj.post) < 0){
      return "";
    }else{
      return obj.posts[obj.posts.findIndex((post:any) => post._id === obj.post)].title;
    }
  }
}

@Pipe({name: 'interactionnamePipe'})
export class interactionnamePipe implements PipeTransform {
  transform(obj:any):string {
    if(obj.interactions.findIndex((interaction:any) => interaction._id === obj.interaction) < 0){
      return "";
    }else{
      return obj.interactions[obj.interactions.findIndex((interaction:any) => interaction._id === obj.interaction)].title;
    }
  }
}