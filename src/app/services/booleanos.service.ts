import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class BooleanosService {
<<<<<<< HEAD


=======
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
  private _boton1: Subject<boolean>;
  private _boton2: Subject<boolean>;
  private _boton3: Subject<boolean>;
  private _boton4: Subject<boolean>;
  private _boton5: Subject<boolean>;
  private _boton6: Subject<boolean>;
  private _boton7: Subject<boolean>;
  private _boton8: Subject<boolean>;
  private _boton9: Subject<boolean>;
  private _boton10: Subject<boolean>;
  
  constructor() { 
    this._boton1 = new BehaviorSubject(false);
    this._boton2 = new BehaviorSubject(false);
    this._boton3 = new BehaviorSubject(false);
    this._boton4 = new BehaviorSubject(false);
    this._boton5 = new BehaviorSubject(false);
    this._boton6 = new BehaviorSubject(false);
    this._boton7 = new BehaviorSubject(false);
    this._boton8 = new BehaviorSubject(false);
    this._boton9 = new BehaviorSubject(false);
    this._boton10 = new BehaviorSubject(false);
  }

  public updateStateTobillo(value:boolean):void{
    this._boton1.next(value);
  }
  public updateStateRodilla(value:boolean):void{
    this._boton2.next(value);
  }
  public updateStateHombro(value:boolean):void{
    this._boton3.next(value);
  }
  public updateStateCadera(value:boolean):void{
    this._boton4.next(value);
  }
  public updateStateCodo(value:boolean):void{
    this._boton5.next(value);
  }
  public updateStateMuneca(value:boolean):void{
    this._boton6.next(value);
  }
  public updateStateDedos(value:boolean):void{
    this._boton7.next(value);
  }
  public updateStatePulgar(value:boolean):void{
    this._boton8.next(value);
  }
  public updateStateColumnaDL(value:boolean):void{
    this._boton9.next(value);
  }
  public updateStateColumnaCerv(value:boolean):void{
    this._boton10.next(value);
  }

  get boton1(): Observable<boolean>{
    return this._boton1.asObservable();
  }
  
  get boton2(): Observable<boolean>{
    return this._boton2.asObservable();
  }
  
  get boton3(): Observable<boolean>{
    return this._boton3.asObservable();
  }
  
  get boton4(): Observable<boolean>{
    return this._boton4.asObservable();
  }
  
  get boton5(): Observable<boolean>{
    return this._boton5.asObservable();
  }
  
  get boton6(): Observable<boolean>{
    return this._boton6.asObservable();
  }
  
  get boton7(): Observable<boolean>{
    return this._boton7.asObservable();
  }
  
  get boton8(): Observable<boolean>{
    return this._boton8.asObservable();
  }
  
  get boton9(): Observable<boolean>{
    return this._boton9.asObservable();
  }
  
  get boton10(): Observable<boolean>{
    return this._boton10.asObservable();
  }
  

}
