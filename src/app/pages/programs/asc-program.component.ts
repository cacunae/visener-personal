import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogInteractionComponent } from '../dialog-interaction/dialog-interaction.component';
import { ViewPostsComponent } from '../posts/view-posts.component';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { DialogProgramComponent } from './dialog-program.component';
import { ViewTreatmentsComponent } from 'src/app/old-professional/view-treatments/view-treatments.component';

@Component({
  selector: 'app-asc-programs',
  templateUrl: './asc-program.component.html',
})
export class AscProgramComponent implements OnInit {
  todayDate: Date = new Date();
  public treatment:any = {entity: "treatment", state: "active"};
  public program:any = {};
  public myForm: FormGroup;
  public loading:boolean = true;
  range = new FormGroup({start: new FormControl(), end: new FormControl() });
  selectedOptions: any;
  index:any;
  patient:any;
  id: any;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private _formBuilder: FormBuilder, private _fb: FormBuilder, public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  async createForm(){
    this.id = this.route.snapshot.paramMap.get('id');
    await this.dataService.getData("/" + this.route.snapshot.paramMap.get('patient')).then((patient: any) => {
      this.patient = patient;
      this.treatment.patient = this.patient._id;
    });
    if (this.id) {
      await this.dataService.getData("/" + this.id).then((result: any) => {
        this.treatment = result;
      });
      if (this.treatment.program) {
        await this.dataService.getData("/" + this.treatment.program).then((programDetail: any) => {
          this.program = programDetail;
        });
      }
    }else{
      this.treatment.professional = this.dataService.user._id;
    }
    this.loading = false;
  }

  publicar() {
    if(!this.treatment.startDate){
      this.snackBar.open('Selecciones la fecha de inicio.', 'ERR', { duration: 3000 });
    }else if(this.treatment.program) {
      this.treatment.endDate = moment(this.treatment.startDate).add(this.program.duration, 'days');
      console.log("Fechas", this.treatment.startDate, this.program.duration, this.treatment.endtDate);
      this.treatment.interactions = this.program.interactions;
      this.treatment.datetime = moment().format('YYYYMMDDHHmmss')
      this.dataService.postData(this.treatment).then((result:any) => {
        if(this.id){
          this.snackBar.open('Programa actualizado correctamente.', 'OK', { duration: 3000 });
        }else{
          this.snackBar.open('Programa asignado correctamente.', 'OK', { duration: 3000 });
        }
        this.router.navigateByUrl("/professional/asc-patients"); 
      });
    } else {
      this.snackBar.open('Debes agregar al menos programa.', 'ERR', { duration: 3000 });
    }
  }

  addProgram() {
    const dialogRef = this.dialog.open(ViewTreatmentsComponent, {
      width: '520px',
      data: {text:'add-program'}
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.treatment.program = result.id;
        this.dataService.getData("/" + this.treatment.program).then((programDetail: any) => {
        this.program = programDetail;
      });
    });
  }
  
  getDay() {
    this.range;
    console.log(this.range)
  }

}

