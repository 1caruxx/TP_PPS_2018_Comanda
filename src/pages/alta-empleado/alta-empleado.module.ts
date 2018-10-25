import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaEmpleadoPage } from './alta-empleado';

@NgModule({
  declarations: [
    AltaEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaEmpleadoPage),
  ],
})
export class AltaEmpleadoPageModule {}
