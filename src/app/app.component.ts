import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente'
//import { AltaPlatosPage } from '../pages/alta-platos/alta-platos';
import { TabsPage } from '../pages/tabs/tabs';
import { QrIngresoLocalPage } from '../pages/qr-ingreso-local/qr-ingreso-local';
import {  EncuestaClientePage } from '../pages/encuesta-cliente/encuesta-cliente';
import { PedirPlatosPage } from '../pages/pedir-platos/pedir-platos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 

      
   

//rootPage:any =   TabsPage  ;
rootPage:any =   RegistroClientePage  ;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
