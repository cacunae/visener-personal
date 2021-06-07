import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public dataService:DataService, public router: Router, public snackBar: MatSnackBar){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let permission:boolean = false;
    //console.log("canActivate::" + "/professional/" + route.routeConfig.path );
    if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).features ){
      for(let feature of JSON.parse(localStorage.getItem("user")).features){
        if(feature.actions.findIndex((action:string) => action === "/professional/" + route.routeConfig.path) > -1){
          permission = true;
        }
      }
      
      if(!permission){
        this.snackBar.open('No tiene permisos para esta funcionalidad.', 'ERR', { duration: 3000 });
      }
    }else{
      this.router.navigateByUrl("/login");
    }
    
    return permission;
  }
  
}
