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
import { MapaDeRutaPage } from '../pages/mapa-de-ruta/mapa-de-ruta';
import { JuegoQuinterosPage } from '../pages/juego-quinteros/juego-quinteros';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { NativeAudio } from '@ionic-native/native-audio';
import { JuegoQuinterosPageModule } from '../pages/juego-quinteros/juego-quinteros.module';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = QrDeLaMesaPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,modalCtrl: ModalController, fcm: FcmProvider, toastCtrl: ToastController,private nativeAudio: NativeAudio) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

   /*   this.nativeAudio.preloadSimple('a', 'assets/imgs/gamma/fortnite.mp3').catch(() => { }); 

      fcm.getToken()

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 8000,
            position: 'top',
            cssClass: 'nombreRaro'
            
          });
          this.nativeAudio.play('a').catch(() => { });
          toast.present();
        })
      )
      .subscribe()*/






      statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
            splash.present();
      //splashScreen.hide();
    });
  }
}
