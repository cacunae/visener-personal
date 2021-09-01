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
    
<<<<<<< HEAD
    
=======
>>>>>>> c8e3d1341bbd7f255cc11de8fd4e6c53ca9f4fa3
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
