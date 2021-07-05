import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Md5 } from 'ts-md5';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'app-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.css']
})

export class DisableComponent implements OnInit {
  public passwordActual:string = '';
  public enabled:boolean = true;
  angForm: FormGroup;
  hide = true;

  constructor(private router : Router, public dialogRef: MatDialogRef<DisableComponent>, public dataService: DataService, private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.angForm = this._fb.group({
      passwordActual: ["", Validators.required]
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  async deshabilitar(){
    if (this.angForm.valid) {
      await this.dataService.login(this.dataService.user.username, Md5.hashStr(this.passwordActual)).then((result:any) => {
        if(result.rows && result.rows[0] && result.rows[0].value){
          this.enabled = false;
          result.rows[0].value.state = "disabled";
          this.dataService.postData(result.rows[0].value);
        }else{
          alert('La clave actual no es correcta.\nVuelva a intentarlo.');
        }
      });
    }else{
      alert('Complete todos los campos');
    }
  }

  salir(){
    this.dialogRef.close();
    this.router.navigateByUrl("/login");
  }

}
