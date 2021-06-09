import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html'
})
export class ProfessionalComponent implements OnInit {
  public roleName: string = "";
  public features: any[] = [];
  public message: string;
  constructor(public router: Router, public dialog: MatDialog, public dataService: DataService) { }

  ngOnInit(): void {
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.dataService.getData("/features").then((features: any) => {
        this.dataService.getData("/" + this.dataService.user.role).then((roleFeatures: any) => {
          this.roleName = roleFeatures.name;
          for (let feature of roleFeatures.features) {
            let index = features.features.findIndex((item: any) => item.name === feature.name);
            if (index>-1 && features.features.length>0 && feature.actions.length>0) {
              feature.title = features.features[index].title;
              feature.icon = features.features[index].icon;
              this.features.push(feature);
            };
          }

          if (this.features.length > 0) {
            this.dataService.user.features = this.features;
            for(let feature of this.features){
              if(feature.actions.length>0){
                this.router.navigateByUrl(feature.actions[0]);
                break;
              }
            }
          } else {
            this.message = "No tiene funcionalidades para operar.";
          }
        });
      });
    }
  }

}
