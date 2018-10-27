import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoSupervisorPage } from './listado-supervisor';

@NgModule({
  declarations: [
    ListadoSupervisorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoSupervisorPage),
  ],
})
export class ListadoSupervisorPageModule {}
