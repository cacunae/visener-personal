import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PopupConfigurationComponent } from '../../popup-configuration/popup-configuration.component';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  mentions:any[]=[];
  mention:any[]=[];
  patientName:any[]=[];
  postTitle:any[] = [];
  currentDay:any = new Date();
  dateTime:any;
  public comment:string = "";
  public user:any;
  @Input() post:any;
  @Input() favourites:any;

  constructor(public dataService: DataService, public snackBar: MatSnackBar, public dialog: MatDialog, public router: Router){
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.user = this.dataService.user;
    }
  }

  ngOnInit(): void {
    
  }

  popup() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: { comment: this.comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment = result;
    });
  }

  popupConfiguration() {
    const dialogRef = this.dialog.open(PopupConfigurationComponent, {
      width: '400px',
      data: { comment: this.comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment = result;
    });
  }

  getMentions(){
    this.dataService.getData("/_design/view/_view/comments-by-mention?key=\""+this.dataService.user._id+"\"").then((mentions:any)=>{
      console.log("ment:", mentions.rows)
      if(mentions.rows.length>0){
        this.mentions = mentions.rows;
        console.log("mentions:", this.mentions)
        for(let mention of this.mentions){
          this.mention = mention;
          let datetime:any = new Date(mention.value.datetime);
         /* this.currentDay = moment().format('DDMMYYYY');*/
          this.dateTime = Math.floor((this.currentDay - datetime) / 1000 / 60 / 60 / 24);
          console.log("current:",this.dateTime)
          this.dataService.getData("/"+mention.value.patient).then((patients:any)=>{
            this.patientName = patients.name;
          })
          this.dataService.getData("/"+mention.value.post).then((post:any)=>{
            this.postTitle = post.title;
          })
        }
      }else{
        this.mentions == [];  
        console.log("llegó", this.mentions)
      }
    });
  }

  delFav(fav:any){
    console.log("id:",fav)
      this.dataService.deleteById(fav.value._id + "?rev=" + fav.value._rev).then(() => {
        this.snackBar.open('Programa eliminado correctamente', 'OK', { duration: 5000 });
        location.reload();
      });
  }

}
