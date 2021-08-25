import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnService {

  constructor(private http: HttpClient) { }

  postJson(url: string, form:string){
    let head = new HttpHeaders().append('Content-Type', 'application/json')
    return this.http.post(url, form, {headers:head})
  }
}
