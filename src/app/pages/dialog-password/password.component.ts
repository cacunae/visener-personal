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
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {
  public passwordActual:string = '';
  public passwordNueva:string = '';
  angForm: FormGroup;
  hide = true;

  constructor(private router : Router, public dialogRef: MatDialogRef<PasswordComponent>, public dataService: DataService, private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.angForm = this._fb.group({
      passwordActual: ["", Validators.required],
      passwordNueva : ["",Validators.required]
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  async cambiarPassword(){
    if (this.angForm.valid) {
      await this.dataService.login(localStorage.getItem("email"), this.passwordActual).then((result:any) => {
        if(result.rows && result.rows[0] && result.rows[0].value){
          let user = result.rows[0].value;
          user.password = Md5.hashStr(this.passwordNueva);
          this.dataService.postData(user).then((resultPost:any) => {
            if(resultPost.ok){
              alert('Password actualizada.\nAhora será redirigido al login para que utilice su nueva clave.');
              localStorage.clear();
              this.dialogRef.close();
              this.router.navigateByUrl("/login");
            }else{
              alert('Se produjo un error al cambiar su clave.');
            }
          }).catch((value) => {
            alert('Se produjo un error al cambiar su clave.');
          });
        }else{
          alert('La clave actual no es correcta.\nVuelva a intentarlo.');
        }
      });
    }else{
      alert('Complete todos los campos');
    }
  }

}
