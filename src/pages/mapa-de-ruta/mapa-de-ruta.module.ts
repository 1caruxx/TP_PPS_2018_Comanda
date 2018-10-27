import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaDeRutaPage } from './mapa-de-ruta';

@NgModule({
  declarations: [
    MapaDeRutaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaDeRutaPage),
  ],
})
export class MapaDeRutaPageModule {}
