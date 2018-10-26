import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { AltaDeMesaPage } from '../pages/alta-de-mesa/alta-de-mesa';
import { EncuestaDeEmpleadoPage } from '../pages/encuesta-de-empleado/encuesta-de-empleado';
import { QrDeLaMesaPage } from '../pages/qr-de-la-mesa/qr-de-la-mesa';
import { TomarPedidoPage } from '../pages/tomar-pedido/tomar-pedido';
import { HttpModule } from '@angular/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { ChartsModule } from 'ng2-charts';
import { MapaDeRutaPage } from '../pages/mapa-de-ruta/mapa-de-ruta';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { firebaseConfig } from '../config';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SplashPage,
    AltaDeMesaPage,
    EncuestaDeEmpleadoPage,
    QrDeLaMesaPage,
    TomarPedidoPage,
    MapaDeRutaPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ChartsModule
   // AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SplashPage,
    AltaDeMesaPage,
    EncuestaDeEmpleadoPage,
    QrDeLaMesaPage,
    TomarPedidoPage,
    MapaDeRutaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //AngularFireAuth
  ]
})
export class AppModule {}
