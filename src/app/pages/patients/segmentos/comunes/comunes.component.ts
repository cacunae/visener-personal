import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Formulario{

  orientacionPlanTerapeutico: string;
  objetivosPlanTerapeutico: string;
  desempenoFuncional: string;
  necesidadesAsistenciaInterdiciplinaria: string;
  justificacion: string;
  valoracionRiesgoCaidas: string;
  consideracionesGenerales: string;

}

interface Orientacion {
  value: string;
  viewValue: string;
}
interface Desempeno {
  value: string;
  viewValue: string;
}
interface Necesidad {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-comunes',
  templateUrl: './comunes.component.html',
  styleUrls: ['./comunes.component.css']
})
export class ComunesComponent  {

  constructor() { }

  textFormControl = new FormControl('',[
    Validators.required
  ]);
  selected = new FormControl('valid', [
    Validators.required
  ])
  matcher = new MyErrorStateMatcher();

  _orientacion:string;
  _objetivos:string;
  _desempeno:string;
  _necesidad:string;
  _justificacion:string;
  _consideraciones:string;
  _valoracion:string;

  capturarOrientacion(orientacion:any){
    this._orientacion = orientacion;
    localStorage.setItem("ori",this._orientacion)
  }

  capturarObjetivos(){
    this._objetivos = this.formu.objetivosPlanTerapeutico;
    localStorage.setItem("obj",this._objetivos)
  }

  capturarDesempeno(desempeno:any){
    this._desempeno = desempeno;
    localStorage.setItem("des", this._desempeno);
  }

  capturarNecesidad(necesidad:any){
    this._necesidad = necesidad;
    localStorage.setItem("nec",this._necesidad);
  }
  capturarJustificacion(){
    this._justificacion = this.formu.justificacion;
    localStorage.setItem("jus",this._justificacion)
  }
  capturarConsideraciones(){
    this._consideraciones = this.formu.consideracionesGenerales;
    localStorage.setItem("cons",this._consideraciones);
  }
  capturarValoracion(){
    this._valoracion = this.formu.valoracionRiesgoCaidas;
    localStorage.setItem("val",this._valoracion)


  }



  formu: Formulario = {

    orientacionPlanTerapeutico: '',
    objetivosPlanTerapeutico: '',
    desempenoFuncional: '',
    necesidadesAsistenciaInterdiciplinaria: '',
    justificacion: '',
    valoracionRiesgoCaidas: '',
    consideracionesGenerales: '',
  }

  Orientaciones: Orientacion[] = [
    { value: 'or1', viewValue: 'En disfunciones corporales' },
    { value: 'or2', viewValue: 'En limitaciones de la actividad' },
    { value: 'or3', viewValue: 'En restricciones de la participación' }
  ];
  Desempenos: Desempeno[] = [
    { value: 'des1', viewValue: 'Nivel de funcionalidad, aún limita actividades de baja demanda física' },
    { value: 'des2', viewValue: 'Nivel de funcionalidad, permite actividades de baja demanda física' },
    { value: 'des3', viewValue: 'Nivel de funcionalidad, permite actividades de baja demanda física y algunas de mediana demanda' },
    { value: 'des4', viewValue: 'Nivel de funcionalidad, permite actividades de mediana demanda física' },
    { value: 'des5', viewValue: 'Nivel de funcionalidad, permite actividades de mediana demanda física y algunas de alta demanda' },
    { value: 'des6', viewValue: 'Nivel de funcionalidad, permite actividades de alta demanda física' }
  ];
  Necesidades: Necesidad[] = [
    { value: 'nes1', viewValue: 'N/A' },
    { value: 'nes2', viewValue: 'Actualmente no requiere' },
    { value: 'nes3', viewValue: 'Evaluación por terapia ocupacional' },
    { value: 'nes4', viewValue: 'Integración a taller laboral' },
    { value: 'nes5', viewValue: 'Entrevista con orientador laboral' },
    { value: 'nes6', viewValue: 'Evaluación por fonoaudiología' },
    { value: 'nes7', viewValue: 'Entrevista con asistente social' }
  ]


}