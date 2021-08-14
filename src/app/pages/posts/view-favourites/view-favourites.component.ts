import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { PopupConfigurationComponent } from '../../popup-configuration/popup-configuration.component';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-view-favourites',
  templateUrl: './view-favourites.component.html',
  styleUrls: ['./view-favourites.component.css']
})
export class ViewFavouritesComponent implements OnInit {
  public mentions:any[]=[];
  public mention:any[]=[];
  public patientName:any[]=[];
  public postTitle:any[] = [];
  public currentDay:any = new Date();
  public dateTime:any;
  public comment:string = "";
  public user:any;
  public favourites: any[] = [];
  public posts:any[] = [];
  public emptyFavourites:any = 0;

  constructor(public dataService: DataService, public dialog: MatDialog, public router: Router) {
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.user = this.dataService.user;
    }
   }

  ngOnInit(): void {
    this.dataService.getData("/_design/view/_view/favourites-by-patient?key=\""+this.dataService.user._id+"\"").then((favourites:any)=>{
      console.log("fav:", favourites.rows.length)
      if(favourites.rows.length==0){
        this.emptyFavourites = 1;
      }else{
        console.log("llegó2")
        for(let fav of favourites.rows){
        this.favourites = fav;
        console.log("fav:", this.favourites)
        if(fav.value.post){
          this.dataService.getData("/"+fav.value.post).then((post:any)=>{
            console.log("post:", post)
            this.posts.push(post);
          })
        }
      }        
    }
    }) 
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
    })
  }

}
