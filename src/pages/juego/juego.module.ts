import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuegoPage } from './juego';

@NgModule({
  declarations: [
    JuegoPage,
  ],
  imports: [
    IonicPageModule.forChild(JuegoPage),
  ],
})
export class JuegoPageModule {}
