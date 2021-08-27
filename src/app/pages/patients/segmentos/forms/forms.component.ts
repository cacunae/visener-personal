import { Component, OnInit } from '@angular/core';
import { ConnService } from 'src/app/services/conn.service';
import { BooleanosService } from 'src/app/services/booleanos.service'
import { Subscription } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface FormularioTobilloPie {
  prof: string;
  antecedentes: string;
  condicionSalud: string;
  edema:string;
  sensibilidad: string;
  movilidadOrtejos: string;
  movilidadSubtalar: string;
  promFdFpIzquierda:string;
  promFdFpDerecha:string;
  fuerzaMuscularDorsiflexores: string;
  equilibrioUnipodal: string;
  evaluacionesComplementarias:string;
  seleccionEvaluacionComplementaria:string;
  determinanteRiesgo: string;
  diagnosticoKinesiologico: string;
  diagnosticoCondicionSalud: string;
  usoOrtopedia: string;
  cicatriz: string;
  nivelDolorMovilidad: string;
  extensionPasivaPrimerOrtejo: string;
  flexionDorsalActiva: string;
  fuerzaMuscularPlantiflexores: string;
  patronMarcha: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
  
}

interface FormularioRodilla {
  prof: string;
  antecedentes: string;
  edema:string;
  sensibilidad: string;
  movilidadPatelar: string;
  flexionActivaPasiva: string;
  promFdFpIzquierda:string;
  rangoArtFE: string;
  fuerzaMuscularExtensores: string;
  equilibrioUnipodal: string;
  evaluacionesComplementarias:string;
  seleccionEvaluacionComplementaria:string;
  determinanteRiesgo: string;
  diagnosticoKinesiologico: string;
  diagnosticoCondicionSalud: string;
  trofismoMuscular: string;
  cicatriz: string;
  nivelDolorMovilidad: string;
  extensionRodillaTerminal: string;
  elevacionPiernaExtendida: string;
  fuerzaMuscularFlexores: string;
  patronMarcha: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
  
}

interface FormularioCadera {
  prof: string;
  antecedentes: string;
  edema:string;
  sensibilidad: string;
  arcoRotacion: string;
  elevacionPiernaExtendida: string;
  fuerzaMuscularAbductores: string;
  equilibrioUnipodal: string;
  evaluacionesComplementarias:string;
  seleccionEvaluacionComplementaria:string;
  diagnosticoKinesiologico: string;
  diagnosticoCondicionSalud: string;
  trofismoMuscular: string;
  cicatriz: string;
  nivelDolorMovilidad: string;
  rangoFlexion: string;
  rangoAbduccion: string;
  fuerzaMuscularFlexores: string;
  fuerzaMuscularExtensores: string;
  patronMarcha: string; 
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}

interface FormularioHombro {
  prof: string;
  antecedentes: string;
  edema:string;
  trofismoActivacionMuscular:string;
  nivelDolorMovilidad: string;
  flexionAnterior:string;
  fuerzaMElevacionAnterior:string;
  apleySuperior:string;
  evaluacionesComplementariasHombro:string;
  seleccionEvaluacionComplementariaHombro:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  lateralidad: string;
  cicatriz: string;
  sensibilidad: string;
  rangoArt: string;
  flexion:string;
  abduccion:string;
  rotExterna:string;
  rotExternaActivaPasiva:string;
  fuerzaMRotacionExterna:string;
  apleyInferior:string;
  movimientoPosicionEscapular: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}

interface FormularioCodo {
  prof: string;
  antecedentes: string;
  edema:string;
  trofismoActivacionMuscular:string;
  nivelDolorMovilidad: string;
  arcoMovFlexoExtension:string;
  fuerzaMFlexion:string;
  evFuncionProximal:string;
  evaluacionesComplementariasCodo:string;
  seleccionEvaluacionComplementariaCodo:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  lateralidad: string;
  cicatriz: string;
  sensibilidad: string;
  rangoArt: string;
  flexoExtension:string;
  pronoSupinacion:string;
  arcoMovPronoSupinacion:string;
  fuerzaMSupinacion:string;
  evFuncionDistal:string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}

interface FormularioMuneca{
  prof: string;
  antecedentes: string;
  edema:string;
  trofismoActivacionMuscular:string;
  nivelDolorMovilidad: string;
  extensionActiva:string;
  puno:string;
  kapandji:string;
  fuerzaMFlexion:string;
  evaluacionesComplementariasMuneca: string;
  seleccionEvaluacionComplementariaMuneca:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  lateralidad: string;
  cicatriz: string;
  sensibilidad: string;
  rangoArt: string;
  fE:string;
  rU:string;
  pS:string;
  supinacionActiva:string;
  dpp:string;
  fuerzaPrensil: string;
  fuerzaMExtension: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}

interface FormularioDedos{
  prof: string;
  antecedentes: string;
  edema:string;
  trofismoActivacionMuscular:string;
  nivelDolorMovilidad: string;
  tam:string;
  clasificacion:string;
  flexionMtcf:string;
  flexionIfp: string;
  flexionIfd: string;
  defExtensionMtcf:string;
  defExtensionIfp: string;
  defExtensionIfd:string;
  RflexionMtcf:string;
  RflexionIfp:string;
  RflexionIfd:string;
  RdefExtensionMtcf:string;
  RdefExtensionIfp:string;
  RdefExtensionIfd:string;
  puno:string;
  kapandji:string;
  evaluacionesComplementariasDedos: string;
  seleccionEvaluacionComplementariaDedos:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  lateralidad: string;
  cicatriz: string;
  sensibilidad: string;
  rangoArt: string;
  rom:string;
  dpp:string;
  fuerzaPrensil: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;

}

interface FormularioPulgar{
  prof: string;
  antecedentes: string;
  edema:string;
  trofismoActivacionMuscular:string;
  nivelDolorMovilidad: string;
  puno:string;
  dpp:string;
  kapandji:string;
  evaluacionesComplementariasPulgar: string;
  seleccionEvaluacionComplementariaPulgar:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  lateralidad: string;
  cicatriz: string;
  sensibilidad: string;
  rangoArt: string;
  fEMT:string;
  fEIF:string;
  abdRadial: string;
  pinza: string;
  fuerzaPrensil: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;

}
interface FormularioColumnaDL{
  prof: string;
  antecedentes: string;
  cicatriz: string;
  sensibilidad: string;
  movilidadDorsoLumbar:string;
  flexionMulti:string;
  activacionMuscular:string;
  equilibrioUnipodal:string;
  evaluacionesComplementariasColumnaDL: string;
  seleccionEvaluacionComplementariaColumnaDL:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  usoOrtopedia: string;
  tonoMuscular: string;
  dolorReposo:string;
  dolorMovilidadCarga:string;
  rotacionMulti: string;
  logroAvd:string;
  dificultad: string;
  patronMarcha: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}
interface FormularioColumnaCervical{
  prof: string;
  antecedentes: string;
  cicatriz: string;
  sensibilidad: string;
  movilidadCervical:string;
  flexionMulti:string;
  flexionCraneo:string;
  evaluacionesComplementariasColumnaCervical: string;
  seleccionEvaluacionComplementariaColumnaCervical:string;
  diagnosticoKinesiologico: string;

  diagnosticoCondicionSalud: string;
  usoOrtopedia: string;
  tonoMuscular: string;
  dolorReposo:string;
  dolorMovilidadCarga:string;
  rotacionMulti: string;
  logroAvd:string;
  dificultad: string;
  puntajeCriteriosGravedad: string;
  riesgoCitacionesSugeridas: string;
}
interface Condicion {
  value: number;
  viewValue: string;
}
interface Edema {
  value: number;
  viewValue: string;
}
interface Movilidad {
  value: string;
  viewValue: string;
}
interface MovilidadP{
  value: string;
  viewValue: string;
}
interface MovilidadS {
  value: string;
  viewValue: string;
}
interface FuerzaMuscular {
  value: string;
  viewValue: string;
}
interface Equilibrio {
  value: string;
  viewValue: string;
}
interface EvaluacionesComplementaria {
  value: string;
  viewValue: string;
}
interface EvaluacionesComplementariaHombro {
  value: string;
  viewValue: string;
}
interface EvaluacionesComplementariaCodo{
  value: string;
  viewValue: string;
}
interface EvaluacionesComplementariaMuneca{
  value: string;
  viewValue: string;
}
interface EvaluacionesComplementariasDedo{
  value: string;
  viewValue:string;
}
interface EvaluacionesComplementariaColumnaDL{
  value: string;
  viewValue:string;
}
interface EvaluacionesComplementariaColumnaCervical{
  value: string;
  viewValue:string;
}

interface Determinante {
  value: number;
  viewValue: string;
}
interface Ortopedia {
  value: number;
  viewValue: string;
}
interface UsoOrtopedia {
  value:string;
  viewValue:string;
}
interface Cicatriz {
  value: string;
  viewValue: string;
}
interface Nivel {
  value: number;
  viewValue: string;
}
interface Extension {
  value: number;
  viewValue: string;
}
interface ExtensionR{
  value: string;
  viewValue: string;
}
interface Flexion {
  value: number;
  viewValue: string;
}
interface FlexionR {
  value: string;
  viewValue: string;
}
interface FlexionC {
  value: string;
  viewValue: string;
}
interface FlexionMulti{
  value: string;
  viewValue:string;
}
interface ActivacionMuscular{
  value: string;
  viewValue: string;
}
interface LogroAvd{
  value: string;
  viewValue:string;
}
interface Dificultad {
  value: string;
  viewValue:string;
}
interface Fuerza {
  value: string;
  viewValue: string;
}
interface Puno {
  value: string;
  viewValue: string;
}
interface Elevacion {
  value:string;
  viewValue: string;
}
interface FlexionA {
  value:string;
  viewValue: string;
}
interface ApleySuperior{
  value:string;
  viewValue:string;
}
interface ApleyInferior{
  value:string;
  viewValue:string;
}
interface RangoArt{
  value:string;
  viewValue:string;
}
interface Lateralidad{
  value:string;
  viewValue:string;
}
interface Pinza{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit {

  numberFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern("^(0|[1-9][0-9]*)$" )
  ]);

  textFormControl = new FormControl('',[
    Validators.required
  ]);
  selected = new FormControl('valid', [
    Validators.required
  ])

  

  matcher = new MyErrorStateMatcher();

  suscription: Subscription;

  registros:string;

  flag:boolean;

  _puntaje:number = 0;
  _sugerencia:string;
  
  _determinante:number;
  _condicion:number;
  _ortopedia:number;
  _edema:number;
  _nivel:number;
  _extension:number;
  _flexion:number;





  constructor(public json: ConnService, public booleanos: BooleanosService, private clipboard: Clipboard) { 

  }

  ngOnInit(){ 
    

    this.suscription = this.booleanos.boton1.subscribe((flag: boolean) =>{
      this.toggleTobillo = flag
    })
    this.suscription = this.booleanos.boton2.subscribe((flag: boolean) =>{
      this.toggleCadera = flag
    })
    this.suscription = this.booleanos.boton3.subscribe((flag: boolean) =>{
      this.toggleHombro = flag
    })
    this.suscription = this.booleanos.boton4.subscribe((flag: boolean) =>{
      this.toggleRodilla = flag
    })
    this.suscription = this.booleanos.boton5.subscribe((flag: boolean) =>{
      this.toggleCodo = flag
    })
    this.suscription = this.booleanos.boton6.subscribe((flag: boolean) =>{
      this.toggleMuneca = flag
    })
    this.suscription = this.booleanos.boton7.subscribe((flag: boolean) =>{
      this.toggleDedos = flag
    })
    this.suscription = this.booleanos.boton8.subscribe((flag: boolean) =>{
      this.togglePulgar = flag
    })
    this.suscription = this.booleanos.boton9.subscribe((flag: boolean) =>{
      this.toggleColumnaDL = flag
    })
    this.suscription = this.booleanos.boton10.subscribe((flag: boolean) =>{
      this.toggleColumnaCerv = flag
    })
      
  }

  sumarValores(n1:any, n2:any, n3:any, n4:any, n5:any, n6: any, n7:any){

  

    this._puntaje = n1.value+n2.value+n3.value+n4.value+n5.value+n6.value+n7.value;


    console.log(this._puntaje);
    

    this.formu.puntajeCriteriosGravedad = this._puntaje.toString();
    
    this.categorizarRiesgo();

  }

  categorizarRiesgo(){
    if(this._puntaje < 5){
      this._sugerencia = "Riesgo leve, 1 a 2 citaciones a la semana"
    }
    if(this._puntaje >= 5){
      this._sugerencia = "Riesgo moderado, 2 a 3 citaciones a la semana"
    }
    if(this._puntaje >= 11){
      this._sugerencia = "Riesgo severo, 3 o más citaciones a la semana"
    }
  }

  multiplePost()
  {
    if(this.toggleTobillo){
      let body = JSON.stringify(this.formu);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleRodilla){
      let body = JSON.stringify(this.formu2);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleCadera){
      let body = JSON.stringify(this.formu3);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleHombro){
      let body = JSON.stringify(this.formu4);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleCodo){
      let body = JSON.stringify(this.formu5);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleMuneca){
      let body = JSON.stringify(this.formu6);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleDedos){
      let body = JSON.stringify(this.formu7);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.togglePulgar){
      let body = JSON.stringify(this.formu8);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleColumnaDL){
      let body = JSON.stringify(this.formu9);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }
    if(this.toggleColumnaCerv){
      let body = JSON.stringify(this.formu10);
      this.json.postJson('http://localhost:5984/visener-test/', body).subscribe((res: any) => {
      console.log(res);
      });
    }

    
  }

  public toggleTobillo:boolean = false;
  public toggleRodilla:boolean = false;
  public toggleCadera:boolean = false;
  public toggleHombro:boolean = false;
  public toggleCodo:boolean = false;
  public toggleMuneca:boolean = false;
  public toggleDedos:boolean = false;
  public togglePulgar:boolean = false;
  public toggleColumnaDL:boolean = false;
  public toggleColumnaCerv:boolean = false;

  cancelarForm(){
    this.booleanos.updateStateTobillo(false)
    this.booleanos.updateStateRodilla(false)
    this.booleanos.updateStateHombro(false)
    this.booleanos.updateStateCadera(false)
    this.booleanos.updateStateCodo(false)
    this.booleanos.updateStateMuneca(false)
    this.booleanos.updateStateDedos(false)
    this.booleanos.updateStatePulgar(false)
    this.booleanos.updateStateColumnaDL(false)
    this.booleanos.updateStateColumnaCerv(false)

  }


  public detRiesgo: any;
  public condicionSalud: any;
  public usoOrtopediaChar: any;
  public edemaChar: any;
  public nivelDolor: any;
  public extensionPasiva: any;
  public flexionDorsal: any;
  public puntajeCriterios: any;


  convertirDeterminante(determinante:any){

    this.detRiesgo = determinante;
  }
  convertirCondicion(condicion:any){
    this.condicionSalud = condicion;
  }
  convertirOrtopedia(ortopedia:any){
    this.usoOrtopediaChar = ortopedia;
  }
  convertirEdema(edema:any){
    this.edemaChar = edema;
  }
  convertirNivel(nivel:any){
    this.nivelDolor = nivel;
  }
  convertirExtension(extension:any){
    this.extensionPasiva = extension;
  }
  convertirFlexion(flexion:any){
    this.flexionDorsal = flexion
  }
  
  
  copiarRegistros(){
    this.clipboard.copy("Registro de categorizacion del segmento Pierna, tobillo-pie\n° DETERMINANTE DE RIESGO: " + this.detRiesgo
                                                                                  +"\n° CONDICION ADICIONAL DE SALUD: "+ this.condicionSalud
                                                                                  +"\n° USO DE ORTOPEDIA: " + this.usoOrtopediaChar 
                                                                                  +"\n° EDEMA: " + this.edemaChar
                                                                                  +"\n° NIVEL DE DOLOR A LA MOVILIDAD O A LA CARGA: " + this.nivelDolor
                                                                                  +"\n° EXTENSIÓN PASIVA DEL PRIMER ORTEJO: " + this.extensionPasiva 
                                                                                  +"\n° FLEXIÓN DORSAL PASIVA O ACTIVA: "+ this.extensionPasiva
                                                                                  +"\n° PUNTAJE CRITERIOS DE GRAVEDAD: " + this.formu.puntajeCriteriosGravedad 
                                                                                  +"\n° SUGERENCIA: " + this._sugerencia );

  }


  copiarRegistrosEvolutivos(){
    this.clipboard.copy("Registro de evaluación osteomuscular del segmento Pierna, tobillo-pie\n° DIAGNOSTICO O CONDICION DE SALUD: " + this.formu.diagnosticoCondicionSalud
                                                                                  +"\n° EDEMA: " + this.edemaChar
                                                                                  +"\n° CICATRIZ: "+ this.formu.cicatriz
                                                                                  +"\n° SENSIBILIDAD: "+ this.formu.sensibilidad
                                                                                  +"\n° NIVEL DE DOLOR A LA MOVILIDAD O A LA CARGA: " + this.nivelDolor
                                                                                  +"\n° MOVILIDAD DE ORTEJOS: " + this.formu.movilidadOrtejos
                                                                                  +"\n° MOVILIDAD SUBTALAR: " + this.formu.movilidadSubtalar
                                                                                  +"\n° RANGO ARTICULAR FD/FP:      * DER: " + this.formu.promFdFpDerecha + " * IZQ: " + this.formu.promFdFpIzquierda
                                                                                  +"\n° FUERZA MUSCULAR DORSIFLEXORES: " + this.formu.fuerzaMuscularDorsiflexores
                                                                                  +"\n° FUERZA MUSCULAR PLANTIFLEXORES: " + this.formu.fuerzaMuscularPlantiflexores
                                                                                  +"\n° EQUILIBRIO UNIPODAL: " + this.formu.equilibrioUnipodal
                                                                                  +"\n° PATRON DE MARCHA: " + this.formu.patronMarcha
                                                                                  +"\n° EVALUACIONES COMPLEMENTARIAS :" + this.formu.seleccionEvaluacionComplementaria
                                                                                  +"\n° DIAGNOSTICO KINESIOLÓGICO: " + this.formu.diagnosticoKinesiologico
                                                                                  +"\n° ORIENTACIÓN DEL PLAN TERAPÉUTICO (PRIORIDAD): " + localStorage.getItem("ori")
                                                                                  +"\n° OBJETIVOS / PLAN TERAPÉUTICO: " + localStorage.getItem("obj")
                                                                                  +"\n° DESEMPEÑO FUNCIONAL: " + localStorage.getItem("des") 
                                                                                  +"\n° NECESIDADES DE ASISTENCIA INTERDISCIPLINARIA: " + localStorage.getItem("nec")
                                                                                  +"\n° JUSTIFICACIÓN: " + localStorage.getItem("jus")
                                                                                  +"\n° CONSIDERACIONES GENERALES: " + localStorage.getItem("cons")  );
  }

  formu: FormularioTobilloPie = {
    prof: '',
    antecedentes: '',
    condicionSalud: '',
    edema:'',
    sensibilidad: '',
    movilidadOrtejos: '',
    movilidadSubtalar: '',
    promFdFpIzquierda: '',
    promFdFpDerecha: '',
    fuerzaMuscularDorsiflexores: '',
    equilibrioUnipodal: '',
    evaluacionesComplementarias:'',
    seleccionEvaluacionComplementaria:'',
    diagnosticoKinesiologico: '',
    diagnosticoCondicionSalud: '',
    determinanteRiesgo: '',
    usoOrtopedia: '',
    cicatriz: '',
    nivelDolorMovilidad: '',
    extensionPasivaPrimerOrtejo: '',
    flexionDorsalActiva: '',
    fuerzaMuscularPlantiflexores: '',
    patronMarcha: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: ''

  }
  formu2: FormularioRodilla = {
    prof: '',
    antecedentes: '',
    edema:'',
    sensibilidad: '',
    movilidadPatelar: '',
    flexionActivaPasiva: '',
    promFdFpIzquierda:'',
    rangoArtFE: '',
    fuerzaMuscularExtensores: '',
    equilibrioUnipodal: '',
    evaluacionesComplementarias:'',
    seleccionEvaluacionComplementaria:'',
    determinanteRiesgo: '',
    diagnosticoKinesiologico: '',
    diagnosticoCondicionSalud: '',
    trofismoMuscular: '',
    cicatriz: '',
    nivelDolorMovilidad: '',
    extensionRodillaTerminal: '',
    elevacionPiernaExtendida: '',
    fuerzaMuscularFlexores: '',
    patronMarcha: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: '',
  }
  formu3: FormularioCadera = {
    prof: '',
    antecedentes: '',
    edema:'',
    sensibilidad: '',
    arcoRotacion: '',
    elevacionPiernaExtendida: '',
    fuerzaMuscularAbductores: '',
    equilibrioUnipodal: '',
    evaluacionesComplementarias:'',
    seleccionEvaluacionComplementaria:'',
    diagnosticoKinesiologico: '',
    diagnosticoCondicionSalud: '',
    trofismoMuscular: '',
    cicatriz: '',
    nivelDolorMovilidad: '',
    rangoFlexion: '',
    rangoAbduccion: '',
    fuerzaMuscularFlexores: '',
    fuerzaMuscularExtensores: '',
    patronMarcha: '', 
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: '',
  }
  formu4: FormularioHombro = {
    prof: '',
    antecedentes: '',
    edema:'',
    trofismoActivacionMuscular:'',
    nivelDolorMovilidad: '',
    flexionAnterior:'',
    fuerzaMElevacionAnterior:'',
    apleySuperior:'',
    evaluacionesComplementariasHombro:'',
    seleccionEvaluacionComplementariaHombro:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    lateralidad: '',
    cicatriz: '',
    sensibilidad: '',
    rangoArt: '',
    flexion:'',
    abduccion:'',
    rotExterna:'',
    rotExternaActivaPasiva:'',
    fuerzaMRotacionExterna:'',
    apleyInferior:'',
    movimientoPosicionEscapular: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: ''
  }
  formu5: FormularioCodo = {
    prof: '',
    antecedentes: '',
    edema:'',
    trofismoActivacionMuscular:'',
    nivelDolorMovilidad: '',
    arcoMovFlexoExtension:'',
    fuerzaMFlexion:'',
    evFuncionProximal:'',
    evaluacionesComplementariasCodo:'',
    seleccionEvaluacionComplementariaCodo:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    lateralidad: '',
    cicatriz: '',
    sensibilidad: '',
    rangoArt: '',
    flexoExtension:'',
    pronoSupinacion:'',
    arcoMovPronoSupinacion:'',
    fuerzaMSupinacion:'',
    evFuncionDistal:'',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: '',
  }
  formu6: FormularioMuneca = {
    prof: '',
    antecedentes: '',
    edema:'',
    trofismoActivacionMuscular:'',
    nivelDolorMovilidad: '',
    extensionActiva:'',
    puno:'',
    kapandji:'',
    fuerzaMFlexion:'',
    evaluacionesComplementariasMuneca: '',
    seleccionEvaluacionComplementariaMuneca:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    lateralidad: '',
    cicatriz: '',
    sensibilidad: '',
    rangoArt: '',
    fE:'',
    rU:'',
    pS:'',
    supinacionActiva:'',
    dpp:'',
    fuerzaPrensil: '',
    fuerzaMExtension: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: ''

  }
  formu7: FormularioDedos = {
    prof: '',
    antecedentes: '',
    edema:'',
    trofismoActivacionMuscular:'',
    nivelDolorMovilidad: '',
    tam:'',
    clasificacion:'',
    flexionMtcf:'',
    flexionIfp: '',
    flexionIfd: '',
    defExtensionMtcf:'',
    defExtensionIfp: '',
    defExtensionIfd:'',
    RflexionMtcf:'',
    RflexionIfp:'',
    RflexionIfd:'',
    RdefExtensionMtcf:'',
    RdefExtensionIfp:'',
    RdefExtensionIfd:'',
    puno:'',
    kapandji:'',
    evaluacionesComplementariasDedos: '',
    seleccionEvaluacionComplementariaDedos:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    lateralidad: '',
    cicatriz: '',
    sensibilidad: '',
    rangoArt: '',
    rom:'',
    dpp:'',
    fuerzaPrensil: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: ''
  }
  formu8: FormularioPulgar = {
    prof: '',
    antecedentes: '',
    edema:'',
    trofismoActivacionMuscular:'',
    nivelDolorMovilidad: '',
    puno:'',
    dpp:'',
    kapandji:'',
    evaluacionesComplementariasPulgar: '',
    seleccionEvaluacionComplementariaPulgar:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    lateralidad: '',
    cicatriz: '',
    sensibilidad: '',
    rangoArt: '',
    fEMT:'',
    fEIF:'',
    abdRadial: '',
    pinza: '',
    fuerzaPrensil: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: '',
  }
  formu9: FormularioColumnaDL = {
    prof: '',
    antecedentes: '',
    cicatriz: '',
    sensibilidad: '',
    movilidadDorsoLumbar:'',
    flexionMulti:'',
    activacionMuscular:'',
    equilibrioUnipodal:'',
    evaluacionesComplementariasColumnaDL: '',
    seleccionEvaluacionComplementariaColumnaDL:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    usoOrtopedia: '',
    tonoMuscular: '',
    dolorReposo:'',
    dolorMovilidadCarga:'',
    rotacionMulti: '',
    logroAvd:'',
    dificultad: '',
    patronMarcha: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: ''

  }
  formu10: FormularioColumnaCervical = {
    prof: '',
    antecedentes: '',
    cicatriz: '',
    sensibilidad: '',
    movilidadCervical:'',
    flexionMulti:'',
    flexionCraneo:'',
    evaluacionesComplementariasColumnaCervical: '',
    seleccionEvaluacionComplementariaColumnaCervical:'',
    diagnosticoKinesiologico: '',

    diagnosticoCondicionSalud: '',
    usoOrtopedia: '',
    tonoMuscular: '',
    dolorReposo:'',
    dolorMovilidadCarga:'',
    rotacionMulti: '',
    logroAvd:'',
    dificultad: '',
    puntajeCriteriosGravedad: '',
    riesgoCitacionesSugeridas: '',
  }

 



  // MENUS DESPLEGABLES
  lateralidades: Lateralidad[] = [
    {value: 'lat1', viewValue: 'Diestro'},
    {value: 'lat2', viewValue: 'Zurdo'}
  ];

  rangosArt: RangoArt[] = [
    {value: 'act', viewValue: 'Activo'},
    {value: 'pas', viewValue: 'Pasivo'}

  ];

  condiciones: Condicion[] = [
    { value: 0, viewValue: 'No' },
    { value: 1, viewValue: 'EEIIs ipsilateral' },
    { value: 2, viewValue: 'EEIIs bilateral' },
    { value: 3, viewValue: 'EEIIs + affeción de otros segmentos' }
  ];

  edemas: Edema[] = [
    { value: 0, viewValue: 'Ausencia/simétrico contralateral' },
    { value: 1, viewValue: 'Solo aumento de volumen' },
    { value: 2, viewValue: 'Aumento de volumen o temperatura o cambio de coloración' },
    { value: 3, viewValue: 'Aumento de volumen y temperatura o cambio de coloración/fóvea positivo' }
  ];
  movilidades: Movilidad[] = [
    { value: 'mov1', viewValue: 'Completa' },
    { value: 'mov2', viewValue: 'Incompleta' },
    { value: 'mov3', viewValue: 'Incompleta con dolor' },
    { value: 'mov4', viewValue: 'Presencia de rigidez' },
    { value: 'mov5', viewValue: 'No procede evaluación' }
  ];

  movilidadesP: MovilidadP[] = [
    {value: 'movp1', viewValue: 'Conservada'},
    {value: 'movp2', viewValue: 'Conservada con dolor'},
    {value: 'movp3', viewValue: 'Restringida sin dolor'},
    {value: 'movp4', viewValue: 'Restringida con dolor'}
  ]

  movilidadesS: MovilidadS[] = [
    { value: 'movs1', viewValue: 'Completa' },
    { value: 'movs2', viewValue: 'Incompleta' },
    { value: 'movs3', viewValue: 'Incompleta con dolor' },
    { value: 'movs4', viewValue: 'Presencia de rigidez' },
    { value: 'movs5', viewValue: 'No procede evaluación' }
  ];

  FuerzasMusculares: FuerzaMuscular[] = [
    { value: 'f1', viewValue: 'M5 (Movimiento activo contra gravedad y resistencia máxima)' },
    { value: 'f2', viewValue: 'M4 (Movimiento activo contra gravedad y resistencia moderada)' },
    { value: 'f3', viewValue: 'M3 (Movimiento activo contra gravedad pero sin resistencia)' },
    { value: 'f4', viewValue: 'M2 (Movimiento activo sin vencer la gravedad ni la resistencia)' },
    { value: 'f5', viewValue: 'M1 (Contracción visible / Palpable sin movimiento )' },
    { value: 'f6', viewValue: 'M0 (Ninguna respuesta muscular)' },
    { value: 'f7', viewValue: 'No procede Evaluación' }
  ];

  Equilibrios: Equilibrio[] = [
    { value: 'eq1', viewValue: 'Logra un tiempo mayor o igual a 10seg' },
    { value: 'eq2', viewValue: 'Logra un tiempo menor a 10seg (Simétrico al contralateral)' },
    { value: 'eq3', viewValue: 'Logra un tiempo menor a 10seg (Asimétrico al contralateral)' },
    { value: 'eq3', viewValue: 'No logrado / no posee evaluación' }
  ];

  Logros: LogroAvd[] = [
    {value: 'l1', viewValue:'Logra las 3 actividades'},
    {value: 'l2', viewValue:'Logra 2 actividades'},
    {value: 'l3', viewValue:'Logra 1 actividad'},
    {value: 'l4', viewValue:'No logra ninguna actividad'}
  ];

  Dificultades: Dificultad[] = [
    {value: 'd1', viewValue: 'Baja'},
    {value: 'd2', viewValue: 'Media'},
    {value: 'd3', viewValue: 'Alta'},
    {value: 'd4', viewValue: 'Muy alta'},
  ];


  EvaluacionesComplementarias: EvaluacionesComplementaria[] = [
    { value: 'op1', viewValue: 'SF-12 Calidad de vida' },
    { value: 'op2', viewValue: 'LEFS' },
    { value: 'op3', viewValue: 'DN4 Dolor Neuropático' },
    { value: 'op4', viewValue: 'SDRC' },
  ];

  EvaluacionesComplementariasHombro: EvaluacionesComplementariaHombro[] = [
    { value: 'op1', viewValue: 'SF-12 Calidad de vida' },
    { value: 'op2', viewValue: 'Quick Dash' },
    { value: 'op3', viewValue: 'DN4 Dolor Neuropático' },
    { value: 'op4', viewValue: 'SDRC' },
  ];

  EvaluacionesComplementariasCodo: EvaluacionesComplementariaCodo[] = [
    { value: 'op1', viewValue: 'SF-12 Calidad de vida' },
    { value: 'op2', viewValue: 'Quick Dash' },
    { value: 'op3', viewValue: 'DN4 Dolor Neuropático' },
    { value: 'op4', viewValue: 'SDRC' },
  ];

  EvaluacionesComplementariasMuneca: EvaluacionesComplementariaMuneca[] = [
    { value: 'op1', viewValue: 'SF-12 Calidad de vida' },
    { value: 'op2', viewValue: 'Quick Dash' },
    { value: 'op3', viewValue: 'DN4 Dolor Neuropático' },
    { value: 'op4', viewValue: 'SDRC' },
  ];

  EvaluacionesComplementariasDedos: EvaluacionesComplementariasDedo[] = [
    { value: 'op1', viewValue: 'SF-12 Calidad de vida' },
    { value: 'op2', viewValue: 'Quick Dash' },
    { value: 'op3', viewValue: 'DN4 Dolor Neuropático' },
    { value: 'op4', viewValue: 'SDRC' },
  ];

  EvaluacionesComplementariasColumnaDL: EvaluacionesComplementariaColumnaDL[] = [
    { value: 'evCol1', viewValue:'SF-12 Calidad de vida'},
    { value: 'evCol2', viewValue:'DN4 Dolor Neuropático'},
    { value: 'evCol3', viewValue:'Oswestry'}
  ];

  EvaluacionesComplementariasColumnaCervical: EvaluacionesComplementariaColumnaCervical[] = [
    { value: 'evCol1', viewValue:'SF-12 Calidad de vida'},
    { value: 'evCol2', viewValue:'DN4 Dolor Neuropático'},
    { value: 'evCol3', viewValue:'NDI'}
  ];

  Determinantes: Determinante[] = [
    { value: 0, viewValue: 'No presenta' },
    { value: 1, viewValue: 'Sólo 1 condición' },
    { value: 2, viewValue: '2 o más condiciones' }
  ];

  Ortopedias: Ortopedia[] = [
    { value: 0, viewValue: 'Sin indicación' },
    { value: 1, viewValue: 'Indicación de uso' },
    { value: 2, viewValue: 'Indicación de uso y orden de descarga' }

  ];

  UsoOrtopedias: UsoOrtopedia[] = [
    {value: 'uso1', viewValue: 'No presenta'},
    {value: 'uso2', viewValue: 'Blando'},
    {value: 'uso3', viewValue: 'Semi-Rígido'},
    {value: 'uso4', viewValue: 'Rígido'},
  ];

  Cicatrices: Cicatriz[] = [
    { value: 'cic1', viewValue: 'No presenta' },
    { value: 'cic2', viewValue: 'Plana, Flexible' },
    { value: 'cic3', viewValue: 'Deprimida' },
    { value: 'cic4', viewValue: 'Activa/Adherida' },
    { value: 'cic5', viewValue: 'Retráctil' },
    { value: 'cic6', viewValue: 'Hipertrófica' },
    { value: 'cic7', viewValue: 'Queloide' },
    { value: 'cic8', viewValue: 'Dehiscencia de herida' },
    { value: 'cic9', viewValue: 'No evaluada (con Apósitos)' }

  ];

  Niveles: Nivel[] = [
    { value: 0, viewValue: '0/10' },
    { value: 0, viewValue: '1/10' },
    { value: 0, viewValue: '2/10' },
    { value: 1, viewValue: '3/10' },
    { value: 1, viewValue: '4/10' },
    { value: 1, viewValue: '5/10' },
    { value: 2, viewValue: '6/10' },
    { value: 2, viewValue: '7/10' },
    { value: 2, viewValue: '8/10' },
    { value: 3, viewValue: '9/10' },
    { value: 3, viewValue: '10/10' }

  ];

  Extensiones: Extension[] = [
    { value: 0, viewValue: 'Completa sin dolor' },
    { value: 1, viewValue: 'Completa con dolor' },
    { value: 2, viewValue: 'Incompleta sin dolor' },
    { value: 3, viewValue: 'Incompleta con dolor' }
  ];

  ExtensionesR: ExtensionR[] = [
    { value: 'ex1', viewValue: 'Completo activo' },
    { value: 'ex2', viewValue: 'Completa pasivo' },
    { value: 'ex3', viewValue: 'Con ayuda del evaluador' },
    { value: 'ex4', viewValue: 'No logra con ayuda (rigidez)' }
  ];

  Flexiones: Flexion[] = [
    { value: 0, viewValue: 'Lograda sin dificultad / Simétrico contralateral' },
    { value: 1, viewValue: 'Logra rango funcional' },
    { value: 2, viewValue: 'Logra Posicion neutra (0°) o rango menor al funcional' },
    { value: 3, viewValue: 'Presenta rango negativo' }
  ];

  ActivacionesMusculares: ActivacionMuscular[] = [
    {value: 'ac1', viewValue: 'Activación co-contracción multífidos y transverso del abdomen'},
    {value: 'ac2', viewValue: 'Leve activación co-contracción multífidos y transverso del abdomen'},
    {value: 'ac3', viewValue: 'No co-contracción o activación de solo un componente'},
    {value: 'ac4', viewValue: 'Inhibición de musculatura core stability'},
    {value: 'ac5', viewValue: 'No procede evaluación'}
  ];

  FlexionesR: FlexionR[] = [
    { value: 'flr1', viewValue: 'Completa' },
    { value: 'flr2', viewValue: 'Funcional sin dolor' },
    { value: 'flr3', viewValue: 'Funcional con dolor' },
    { value: 'flr4', viewValue: 'Incompleta' }
  ];

  FlexionesC: FlexionC[] = [
    { value: 'flr1', viewValue: 'Logra posición y mantiene contra resistencia moderada a alta' },
    { value: 'flr2', viewValue: 'Logra posición y no mantiene contra resistencia leve ' },
    { value: 'flr3', viewValue: 'Logra posición y mantiene contra resistencia leve ' },
    { value: 'flr4', viewValue: 'No logra posición ' }
  ];

  FlexionesMulti: FlexionMulti[]= [
    {value: 'fmul1', viewValue: 'Funcional sin dolor'},
    {value: 'fmul2', viewValue: 'Funcional con dolor'},
    {value: 'fmul3', viewValue: 'Disfuncional sin dolor'},
    {value: 'fmul4', viewValue: 'Disfuncional con dolor'},
    {value: 'fmul5', viewValue: 'No procede evaluación'},
  ];

  Pinzas: Pinza[] = [
    {value: 'pin1', viewValue: 'Realiza las tres pinzas'},
    {value: 'pin2', viewValue: 'Realiza dos de tres pinzas'},
    {value: 'pin3', viewValue: 'Realiza solo una de tres pinzas'},
    {value: 'pin4', viewValue: 'No realiza ninguna de las pinzas'}
  ];

  Punos: Puno[] = [
    {value: 'pun1', viewValue: 'Activo'},
    {value: 'pun2', viewValue: 'Solo pasivo'},
    {value: 'pun3', viewValue: 'Parcial'},
    {value: 'pun4', viewValue: 'Incompleto'}
  ];

  FlexionesA: FlexionA[] = [
    { value: 'fle1', viewValue: 'Completa' },
    { value: 'fle2', viewValue: 'Completa con dolor / Funcional sin dolor' },
    { value: 'fle3', viewValue: 'Funcional con dolor' },
    { value: 'fle4', viewValue: 'Incompleta' }
  ];

  Elevaciones: Elevacion[]=[
    {value: 'el1', viewValue: 'Logra sin dificultad'},
    {value: 'el2', viewValue: 'Logra con semiflexión (Dificultad Leve)'},
    {value: 'el3', viewValue: 'Logra con semiflexión, rotación pélvica, asistencia manual (con dificultad)'},
    {value: 'el4', viewValue: 'No lo puede hacer'}
  ];

  Fuerzas: Fuerza[] = [
    { value: 'f1', viewValue: 'M5 (Movimiento activo contra gravedad y resistencia máxima)' },
    { value: 'f2', viewValue: 'M4 (Movimiento activo contra gravedad y resistencia moderada)' },
    { value: 'f3', viewValue: 'M3 (Movimiento activo contra gravedad pero sin resistencia)' },
    { value: 'f4', viewValue: 'M2 (Movimiento activo sin vencer la gravedad ni la resistencia)' },
    { value: 'f5', viewValue: 'M1 (Contracción visible / Palpable sin movimiento )' },
    { value: 'f6', viewValue: 'M0 (Ninguna respuesta muscular)' },
    { value: 'f7', viewValue: 'No procede Evaluación' }
  ];
  
  ApleySuperiores: ApleySuperior[] = [
    {value : 'ap1', viewValue: 'Lineal Nucal'},
    {value : 'ap2', viewValue: 'Lineal nucal sin rot. Externa completa'},
    {value : 'ap3', viewValue: 'Mastoides'},
    {value : 'ap4', viewValue: 'Pabellón auricular'},
    {value : 'ap4', viewValue: 'No evaluado o no logrado'}
  ];

  ApleyInferiores: ApleyInferior[] = [
    {value : 'api1', viewValue: 'Simetrica a contralateral'},
    {value : 'api2', viewValue: 'T11 a ángulo inferior de escápula'},
    {value : 'api3', viewValue: 'Zona Toracolumbar o T12 a L5'},
    {value : 'api4', viewValue: 'Zona Sacra'},
    {value : 'api4', viewValue: 'Region glutea'},
    {value : 'api4', viewValue: 'No evaluado o no logrado'}
  ];
  


}
