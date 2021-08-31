import { Component} from '@angular/core';
import { BooleanosService } from 'src/app/services/booleanos.service';

@Component({
  selector: 'app-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.css']
})
export class DialogWarningComponent  {

  constructor(public booleanos: BooleanosService) { }

  cancelar(){
    
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


}
