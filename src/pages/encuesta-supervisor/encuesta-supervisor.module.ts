import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaSupervisorPage } from './encuesta-supervisor';

@NgModule({
  declarations: [
    EncuestaSupervisorPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaSupervisorPage),
  ],
})
export class EncuestaSupervisorPageModule {}
