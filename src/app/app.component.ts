import { Component } from '@angular/core';
import { Platform , ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente'
//import { AltaPlatosPage } from '../pages/alta-platos/alta-platos';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,modalCtrl: ModalController, fcm: FcmProvider, toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // fcm.getToken()

      // // Listen to incoming messages
      // fcm.listenToNotifications().pipe(
      //   tap(msg => {
      //     // show a toast
      //     const toast = toastCtrl.create({
      //       message: msg.body,
      //       duration: 3000
      //     });
      //     toast.present();
      //   })
      // )
      // .subscribe()






      statusBar.styleDefault();
      splashScreen.hide();

      if(localStorage.getItem("usuario")) {
        this.rootPage = PrincipalPage;
      }
      let splash = modalCtrl.create(SplashPage);
            splash.present();
      //splashScreen.hide();
    });
  }
}
