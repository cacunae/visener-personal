import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html'
})
export class AttachmentsComponent implements OnInit {
  public attachments: any[] = [];
  public columnsToDisplay: string[] = ['id', 'image', 'tags', 'actions'];
  public loading:boolean = true;
  constructor(public snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit(): void {
    this.getAttachments();
  }

  getAttachments(){
    this.loading = true;
    this.dataService.getData("/_design/view/_view/attachments").then((patients: any) => {
      this.attachments = patients.rows.sort((a:any, b:any) => { return a.value.datetime < b.value.datetime });
      this.loading = false;
    }); 
  }

  delAttachment(element: any) {
    this.dataService.getData("/_design/view/_view/posts-by-attachment?key=\""+element.value._id+"\"&include_docs=true").then((attachments: any) => {
      if(attachments && attachments.rows && attachments.rows.length>1){
        alert("No se puede eliminar esta imagen porque está relacionado a " + attachments.rows.length + " posts o tareas.");
      }else if(attachments && attachments.rows && attachments.rows.length>0){
        alert("No se puede eliminar esta imagen porque está relacionado a un post o tarea.");        
      }else{
        if(confirm("¿Estás seguro de eliminar la imagen?\nEsta acción no podrá deshacerse.")) {
          this.loading = true;
          this.dataService.deleteById(element.value._id + "?rev=" + element.value._rev).then(() => {
            this.loading = false;
            this.snackBar.open('Imagen eliminada correctamente.', 'OK', {duration: 5000});
            this.getAttachments();
          });
        }
      }
    });
  }
}
