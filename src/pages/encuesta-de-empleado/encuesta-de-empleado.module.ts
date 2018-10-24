import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaDeEmpleadoPage } from './encuesta-de-empleado';

@NgModule({
  declarations: [
    EncuestaDeEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaDeEmpleadoPage),
  ],
})
export class EncuestaDeEmpleadoPageModule {}
