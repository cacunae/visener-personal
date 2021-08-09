import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../pages/popup/popup.component';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AddGroupComponent } from './add-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewGroupsComponent } from './view-groups.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public posts:any[] = [];
  public groups:any[] = [];
  public comment:string = "";
  public user:any;
  public idPaciente:any;
  public loadingGroups:boolean = false;
  public id:any;
  public group:any = {};
  public postContent:string = "";
  public postTitle:string = "";

  interaction:any;
  todayDate:Date = new Date();
  d = new Date();
  n = this.d.getDay();
  day:any;

  constructor(public route: ActivatedRoute, public snackBar:MatSnackBar, public http: HttpClient, public post: MatDialog, public dialog: MatDialog, public router: Router, public dataService: DataService, public zone: NgZone) {
    moment.locale('es');
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.dataService.getData("/" + this.id).then((group:any) => {
        this.group = group;
      });
    }
    if (!this.dataService.user?._id) {
      this.router.navigateByUrl("/login");
    } else {
      this.user = this.dataService.user;
      switch (new Date().getDay()) {
        case 1: this.day = "Lunes"; break;
        case 2: this.day = "Martes"; break;
        case 3: this.day = "Miércoles"; break;
        case 4: this.day = "Jueves"; break;
        case 5: this.day = "Viernes"; break;
        case 6: this.day = "Sabado"; break;
        case 7: this.day = "Domingo";
      }
    }
  }

  ngOnInit(): void {
    this.getPosts();
    this.getGroups();
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

  cerrarSesion() {
    this.dataService.user = null;
    localStorage.clear();
  }

  async getPosts() {
    this.posts = [];
    if(this.id){
      this.dataService.getData("/_design/view/_view/groupal-publications-by-group?key=\"" + this.id + "\"").then((posts: any) => {
         this.posts = posts.rows.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
      });  
    }else{
      let tmpPosts:any[] = []; let tmpGroups:any[] = [];
      await this.dataService.getData("/_design/view/_view/groups-by-patient?include_docs=true&key=\"" + this.dataService.user._id + "\"").then((groups: any) => {
        for(let group of groups.rows){ group.value = group.doc; }
        tmpGroups = groups.rows;
      });
      for (let tmpGroup of tmpGroups) {
        await this.dataService.getData("/_design/view/_view/groupal-publications-by-group?key=\"" + tmpGroup.value._id  + "\"").then((posts:any) => {
          tmpPosts = tmpPosts.concat(posts.rows);
        });
      }
      this.posts = tmpPosts.sort((a:any, b:any) => { return b.value.datetime.localeCompare(a.value.datetime) });
    }
  }

  async getGroups() {
    this.loadingGroups = true;
    await this.dataService.getData("/_design/view/_view/groups-by-patient?include_docs=true&key=\"" + this.dataService.user._id + "\"").then((groups: any) => {
      for(let group of groups.rows){ group.value = group.doc; }
      this.groups = groups.rows.sort((a:any, b:any) => { return a.value.title.localeCompare(b.value.title) });
    });
    this.loadingGroups = false;
  }

  publicar() {
    let groupalPublication:any = {group: this.id, entity: "groupal-publication", state: "active", title: this.postTitle, content: this.postContent, datetime: moment().format('YYYYMMDDHHmmss') };
    console.log(groupalPublication);
    this.dataService.postData(groupalPublication).then((response:any) => {
      if(response.ok){
        this.postTitle = null;
        this.postContent = null;
        this.getPosts();
        this.snackBar.open('Tu post ha sido publicado.', 'OK', {duration: 5000});
      }else{
        this.snackBar.open('Ocurrió un error al publicar tu post. Vuelve a intentarlo.', 'ERROR', {duration: 5000});
      }
    });
  }

  lstGroup(){
    const dialogRef = this.dialog.open(ViewGroupsComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.postData({entity:"member", group: result.value._id, datetime: moment().format("YYYYMMDDHHmm"), state: "active", patient: this.dataService.user._id}).then((group:any) => {
          this.getPosts();
          this.getGroups();
        });
      }
    });
  }

  addGroup(){
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.postData({entity:"group", title: result.title, content: result.content, datetime: moment().format("YYYYMMDDHHmm"), state: "active", patient: this.dataService.user._id}).then((group:any) => {
          console.log("add::group", group);
          this.dataService.postData({entity:"member", group: group.id, datetime: moment().format("YYYYMMDDHHmm"), state: "active", patient: this.dataService.user._id}).then((member:any) => {
            console.log("add::member", member);
            this.getPosts();
            this.getGroups();
          });
        });
      }
    });
  }
}
