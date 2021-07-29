import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/pages/dialog-password/password.component';
import { DataService } from 'src/app/services/data.service';
import { ViewPostsComponent } from '../../pages/posts/view-posts.component';

@Component({
  selector: 'app-view-programs',
  templateUrl: './view-treatments.component.html'
})
export class ViewTreatmentsComponent implements OnInit {
  public programs:any[] = [];
  public search: string="";

  constructor(public dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.getPrograms()
  }

  getPrograms() {
    this.dataService.getData("/_design/view/_view/programs").then((programs: any) => {
      this.programs = programs.rows.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
    });
  }

}
