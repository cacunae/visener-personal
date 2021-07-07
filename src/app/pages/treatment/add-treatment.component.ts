import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogInteractionComponent } from '../dialog-interaction/dialog-interaction.component';
import { ViewPostsComponent } from '../../old-professional/view-posts/view-posts.component';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
})
export class AddTreatmentComponent implements OnInit {
  todayDate: Date = new Date();
  public treatment: any = {};
  public program: any = {};
  public posts:any[] = [];
  public interactions:any[] = [];
  public myForm: FormGroup;
  public week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  public loading:boolean = true;
  range = new FormGroup({start: new FormControl(), end: new FormControl() });
  selectedOptions: any;
  index: any;
  id: any;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _formBuilder: FormBuilder, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async createForm(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      await this.dataService.getData("/" + this.id).then((result: any) => {
        this.treatment = result;
      });
      await this.dataService.getData("/" + this.treatment.program).then((result: any) => {
        this.program = result;
      });
      if (this.program.interactions) {
        for(let interaction of this.program.interactions)
        await this.dataService.getData("/" + interaction._id).then((interactionDetail: any) => {
          this.interactions.push(interactionDetail);
        })
      }
    }else{
      this.treatment.professional = this.dataService.user._id;
    }
    this.loading = false;
  }

  setDays(interaction: any, dayname: string) {
    if (interaction.weekdays.findIndex((day: string) => day === dayname) < 0) {
      interaction.weekdays.push(dayname);
      console.log("dayname", interaction.weekdays)
    } else {
      interaction.weekdays.splice(interaction.weekdays.findIndex((day: string) => day === dayname), 1);
      console.log("dayname", interaction.weekdays)
    }
  }

  publicar(){
    this.treatment.datetime = moment().format('YYYYMMDDHHmmss');
    console.log("treat", JSON.parse(JSON.stringify(this.treatment)));
    this.dataService.postData(this.treatment).then((result: any) => {
      if(this.id){
        this.snackBar.open('Tratamiento actualizado correctamente.', 'OK', { duration: 3000 });
      }else{
        this.snackBar.open('Tratamiento creado correctamente.', 'OK', { duration: 3000 });
      }
      this.router.navigateByUrl("/professional/det-patient/" + this.treatment.patient); 
    });
  }
}
