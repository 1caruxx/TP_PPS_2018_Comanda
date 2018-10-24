import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDeMesaPage } from './alta-de-mesa';

@NgModule({
  declarations: [
    AltaDeMesaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDeMesaPage),
  ],
})
export class AltaDeMesaPageModule {}
