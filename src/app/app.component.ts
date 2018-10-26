import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { AltaDeMesaPage } from '../pages/alta-de-mesa/alta-de-mesa';
import { EncuestaDeEmpleadoPage } from '../pages/encuesta-de-empleado/encuesta-de-empleado';
import { QrDeLaMesaPage } from '../pages/qr-de-la-mesa/qr-de-la-mesa';
import { TomarPedidoPage } from '../pages/tomar-pedido/tomar-pedido';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TomarPedidoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
            splash.present();
      //splashScreen.hide();
    });
  }
}
