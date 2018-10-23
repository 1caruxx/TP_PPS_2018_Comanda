import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroClientePage } from './registro-cliente';

@NgModule({
  declarations: [
    RegistroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroClientePage),
  ],
})
export class RegistroClientePageModule {}
