import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrDeLaMesaPage } from './qr-de-la-mesa';

@NgModule({
  declarations: [
    QrDeLaMesaPage,
  ],
  imports: [
    IonicPageModule.forChild(QrDeLaMesaPage),
  ],
})
export class QrDeLaMesaPageModule {}
