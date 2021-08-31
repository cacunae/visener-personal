import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../pages/popup/popup.component';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AddGroupComponent } from './add-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewGroupsComponent } from './view-groups.component';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { NgxImageCompressService } from 'ngx-image-compress';

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
  public image:string;
  public file:File;
  url2:any;
  videoUrl:string;
  interaction:any;
  todayDate:Date = new Date();
  d = new Date();
  n = this.d.getDay();
  day:any;

  constructor(private _sanitizer: DomSanitizer, private ng2ImgMax: Ng2ImgMaxService, /*public imageCompress: NgxImageCompressService,*/ public route: ActivatedRoute, public snackBar:MatSnackBar, public http: HttpClient, public post: MatDialog, public dialog: MatDialog, public router: Router, public dataService: DataService, public zone: NgZone) {
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

  
  modelChanged(event){
    if(event != ""){
      console.log("event:", event)
      event = event.slice(0,-19) + "embed/" + event.slice(32);
      this.url2 = this._sanitizer.bypassSecurityTrustResourceUrl(event);
    }else{
      this.url2 = "";
      console.log("acá:", event)
    }
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
    let groupalPublication:any = {group: this.id, entity: "groupal-publication", state: "active", title: this.postTitle, content: this.postContent, datetime: moment().format('YYYYMMDDHHmmss'), url:this.url2 };
    console.log(groupalPublication);
    this.dataService.postData(groupalPublication).then((response:any) => {
      if(response.ok){
        if(this.file){
          let headers = new HttpHeaders().set("If-Match", response.rev);
          this.http.put(this.dataService.databaseAPI + "/" + response.id + "/image", this.file, { headers: headers}).subscribe((result2) => {
            this.postTitle = null;
            this.postContent = null;
            this.file = null;
            this.image = null;
            this.getPosts();
            this.snackBar.open('Tu post ha sido publicado.', 'OK', {duration: 5000});
            this.router.navigateByUrl("/patient/groups")
          });
        }else{
          this.postTitle = null;
          this.postContent = null;
          this.getPosts();
          this.snackBar.open('Tu post ha sido publicado.', 'OK', {duration: 5000});
        }
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

  onFileChange(event:any) {
    console.log("event:", event)
    let image:File = event.target.files[0];
    const reader = new FileReader();
    console.warn("Original file:", image.size);
    this.ng2ImgMax.resizeImage(image, 460, 10000).subscribe((result) => {
      reader.readAsDataURL(result);
      reader.onload = () => {
        console.log("reading");
        this.image = reader.result as string;
        this.file = new File([result], result.name, {type: image.type});
        console.log("Resized file:", this.file.size);
      };
    }, error => {
      console.log('😢 Oh no!', error);
    });
  }

  leftGroup(){
    this.dataService.getData("/_design/view/_view/member-by-patient-group?key=[\"" + this.dataService.user._id + "\",\"" + this.id + "\"]").then((member:any) => {
      if(member && member.rows && member.rows[0]){
        member = member.rows[0].value;
        member.state = "canceled";
        this.dataService.postData(member).then((result:any) => {
          if(result.ok){
            this.snackBar.open('Has dejado este grupo.', 'OK', {duration: 5000});
            this.router.navigateByUrl("/patient/groups");
          }
        });
      }else{
        this.group.state = "canceled";
        this.dataService.postData(this.group).then((result:any) => {
          if(result.ok){
            this.snackBar.open('Has cancelado este grupo.', 'OK', {duration: 5000});
            this.router.navigateByUrl("/patient/groups");
          }
        });
        //this.snackBar.open('No puedes dejar este grupo porque eres fundador.', 'ERR', {duration: 5000});
      }
    });
  }

  /*
  compressFile() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, )
      this.imageCompress.compressFile(image, orientation, 60, 80).then(
        result => {
          this.image = result;
          console.warn('Size in bytes was:' + this.imageCompress.byteCount(image) + ' and now is: ' + this.imageCompress.byteCount(result));
        }
      );
    }); 
  }
  */

}
