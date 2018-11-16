import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoReservasPage } from './listado-reservas';

@NgModule({
  declarations: [
    ListadoReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoReservasPage),
  ],
})
export class ListadoReservasPageModule {}
