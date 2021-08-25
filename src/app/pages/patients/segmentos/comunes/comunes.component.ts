import { Component, OnInit } from '@angular/core';

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