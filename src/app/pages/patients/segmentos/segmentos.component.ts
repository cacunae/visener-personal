import { Component, OnInit } from '@angular/core';
import { ConnService } from 'src/app/services/conn.service'; 
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

  constructor(public json: ConnService, public booleanos: BooleanosService) { 
  
  };


  suscription:Subscription;

  flag: boolean;


  
  ngOnInit() {
    this.suscription = this.booleanos.boton1.subscribe((flag: boolean) =>{
      this.toggleTobillo = flag
    })
    this.suscription = this.booleanos.boton2.subscribe((flag: boolean) =>{
      this.toggleRodilla = flag
    })
    this.suscription = this.booleanos.boton3.subscribe((flag: boolean) =>{
      this.toggleHombro = flag
    })
    this.suscription = this.booleanos.boton4.subscribe((flag: boolean) =>{
      this.toggleCadera = flag
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

  updateTobillo(){
    if(this.toggleTobillo == false){
      this.booleanos.updateStateTobillo(true)
    }
    else{
      this.booleanos.updateStateTobillo(false)
    }
    
  }
  updateCadera(){
    if(this.toggleCadera == false){
      this.booleanos.updateStateCadera(true)
    }
    else{
      this.booleanos.updateStateCadera(false)
    }
  }
  updateHombro(){
    if(this.toggleHombro == false){
      this.booleanos.updateStateHombro(true)
    }
    else{
      this.booleanos.updateStateHombro(false);
    }
  }

  updateRodilla(){
    if(this.toggleRodilla == false){
      this.booleanos.updateStateRodilla(true)
    }
    else{
      this.booleanos.updateStateRodilla(false);
    }
    
  }
  updateCodo(){
    if(this.toggleCodo == false){
      this.booleanos.updateStateCodo(true)
    }
    else{
      this.booleanos.updateStateCodo(false)
    }
    
  }
  updateMuneca(){
    if(this.toggleMuneca == false){
      this.booleanos.updateStateMuneca(true)
    }
    else{
      this.booleanos.updateStateMuneca(false)
    }
    
  }
  updateDedos(){
    if(this.toggleDedos == false){
      this.booleanos.updateStateDedos(true)
    }
    else{
      this.booleanos.updateStateDedos(false)
    }
    
    
  }
  updatePulgar(){
    if(this.togglePulgar == false){
      this.booleanos.updateStatePulgar(true)
    }
    else{
      this.booleanos.updateStatePulgar(false)
    }
    
    
  }
  updateColumnaDL(){
    if(this.toggleColumnaDL == false){
      this.booleanos.updateStateColumnaDL(true)
    }
    else{
      this.booleanos.updateStateColumnaDL(false)
    }
    
    
  }
  updateColumnaCerv(){
    if(this.toggleColumnaCerv == false){
      this.booleanos.updateStateColumnaCerv(true)
    }
    else{
      this.booleanos.updateStateColumnaCerv(false)
    }
  }
  
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
