import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConnService } from 'src/app/services/conn.service'; 
import { ComunesComponent } from './comunes/comunes.component'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { FormsComponent } from './forms/forms.component';
import { BooleanosService } from '../../../services/booleanos.service'
import { Subscription } from 'rxjs';
//----------------------------------------INTERFACES PARA LA CREACION DE LOS MENUS DESPLEGABLES---------------------------------------------


//----------------------------------------------INTERFACES PARA LA CREACION DE FORMULARIOS-----------------------------------------------------




@Component({
  selector: 'app-segmentos',
  templateUrl: './segmentos.component.html',
  styleUrls: ['./segmentos.component.css']
})
export class SegmentosComponent implements OnInit {



  suscription:Subscription;

  flag: boolean;


  
  ngOnInit() {
    this.booleanos.boton1.subscribe((flag: boolean) =>{
      this.toggleTobillo = flag
      this.toggleRodilla = flag
      this.toggleCadera = flag
      this.toggleHombro = flag
      this.toggleCodo = flag
      this.toggleMuneca = flag
      this.toggleDedos = flag
      this.togglePulgar = flag
      this.toggleColumnaDL = flag
      this.toggleColumnaCerv = flag
    })
  }

  

  updateTobillo(){
    this.booleanos.updateStateTobillo(true)
  }
  updateCadera(){
    this.booleanos.updateStateCadera(true)
  }
  updateHombro(){
    this.booleanos.updateStateHombro(true)
  }
  updateRodilla(){
    this.booleanos.updateStateRodilla(true)
  }
  updateCodo(){
    this.booleanos.updateStateCodo(true)
  }
  updateMuneca(){
    this.booleanos.updateStateMuneca(true)
  }
  updateDedos(){
    this.booleanos.updateStateDedos(true)
  }
  updatePulgar(){
    this.booleanos.updateStatePulgar(true)
  }
  updateColumnaDL(){
    this.booleanos.updateStateColumnaDL(true)
  }
  updateColumnaCerv(){
    this.booleanos.updateStateColumnaCerv(true)
  }
  

  constructor(public json: ConnService, public booleanos: BooleanosService) { 
  
  };

  

  toggleTobillo:boolean ;
  toggleRodilla:boolean;
  toggleCadera:boolean;
  toggleHombro:boolean;
  toggleCodo:boolean;
  toggleMuneca:boolean;
  toggleDedos:boolean;
  togglePulgar:boolean;
  toggleColumnaDL:boolean;
  toggleColumnaCerv:boolean;

  //------------------------FORMULARIOS-------------------------------
  
  









}
