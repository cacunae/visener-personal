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
<<<<<<< HEAD
    
  }
  updateCadera(){
    if(this.toggleCadera == false){
      this.booleanos.updateStateCadera(true)
=======

  }
  updateCadera(){
    if(this.toggleCadera == false){
      this.booleanos.updateStateCadera(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
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
<<<<<<< HEAD
      this.booleanos.updateStateRodilla(true)
=======
      this.booleanos.updateStateRodilla(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateRodilla(false);
    }
    
  }
  updateCodo(){
    if(this.toggleCodo == false){
<<<<<<< HEAD
      this.booleanos.updateStateCodo(true)
=======
      this.booleanos.updateStateCodo(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateCodo(false)
    }
    
  }
  updateMuneca(){
    if(this.toggleMuneca == false){
<<<<<<< HEAD
      this.booleanos.updateStateMuneca(true)
=======
      this.booleanos.updateStateMuneca(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateMuneca(false)
    }
    
  }
  updateDedos(){
    if(this.toggleDedos == false){
<<<<<<< HEAD
      this.booleanos.updateStateDedos(true)
=======
      this.booleanos.updateStateDedos(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateDedos(false)
    }
    
    
  }
  updatePulgar(){
    if(this.togglePulgar == false){
<<<<<<< HEAD
      this.booleanos.updateStatePulgar(true)
=======
      this.booleanos.updateStatePulgar(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStatePulgar(false)
    }
    
    
  }
  updateColumnaDL(){
    if(this.toggleColumnaDL == false){
<<<<<<< HEAD
      this.booleanos.updateStateColumnaDL(true)
=======
      this.booleanos.updateStateColumnaDL(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateColumnaDL(false)
    }
    
    
  }
  updateColumnaCerv(){
    if(this.toggleColumnaCerv == false){
<<<<<<< HEAD
      this.booleanos.updateStateColumnaCerv(true)
=======
      this.booleanos.updateStateColumnaCerv(false)
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
    }
    else{
      this.booleanos.updateStateColumnaCerv(false)
    }
  }
<<<<<<< HEAD
  
=======

  
  

>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
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
