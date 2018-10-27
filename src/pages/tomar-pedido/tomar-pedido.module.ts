import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TomarPedidoPage } from './tomar-pedido';

@NgModule({
  declarations: [
    TomarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(TomarPedidoPage),
  ],
})
export class TomarPedidoPageModule {}
