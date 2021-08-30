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

<<<<<<< HEAD
  constructor(public json: ConnService, public booleanos: BooleanosService) { 
  
  };


  suscription:Subscription;

  flag: boolean;


  
  ngOnInit() {
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
=======


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
>>>>>>> 9f6c91a195dbd0d913f355b1792d7949678fd06d
      this.toggleColumnaCerv = flag
    })
  }

<<<<<<< HEAD
=======
  

>>>>>>> 9f6c91a195dbd0d913f355b1792d7949678fd06d
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
  

<<<<<<< HEAD
  
=======
  constructor(public json: ConnService, public booleanos: BooleanosService) { 
  
  };

>>>>>>> 9f6c91a195dbd0d913f355b1792d7949678fd06d
  

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
