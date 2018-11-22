import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaDeJuegosPage } from './sala-de-juegos';

@NgModule({
  declarations: [
    SalaDeJuegosPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaDeJuegosPage),
  ],
})
export class SalaDeJuegosPageModule {}
