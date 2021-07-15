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
    if(this.dataService.user && this.dataService.user.features ){
      for(let feature of this.dataService.user.features){
        if(feature.actions.findIndex((action:string) => action === "/professional/" + route.routeConfig.path) > -1){
          permission = true;
        }
      }    
      if(!permission){
        this.snackBar.open('No tiene permisos para esta funcionalidad.', 'ERR', { duration: 3000 });
        console.log("canActivate::No access::" + "/professional/" + route.routeConfig.path );
      }
    }else{
      this.router.navigateByUrl("/login");
    }
    
    return permission;
  }
  
}
