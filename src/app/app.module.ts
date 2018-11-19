import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente';
import { AltaPlatosPage } from '../pages/alta-platos/alta-platos';
import { QrIngresoLocalPage } from '../pages/qr-ingreso-local/qr-ingreso-local';
import {  EncuestaClientePage } from '../pages/encuesta-cliente/encuesta-cliente';
import { PedirPlatosPage } from '../pages/pedir-platos/pedir-platos';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { JuegoPage } from '../pages/juego/juego';
import { ElPipe } from '../pipes/el/el';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegistroClientePage,
    AltaPlatosPage,
    QrIngresoLocalPage,
    EncuestaClientePage,
    PedirPlatosPage,
    JuegoPage,
    ElPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
 
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig.fire)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegistroClientePage,
    AltaPlatosPage,
    QrIngresoLocalPage,
    EncuestaClientePage,
    PedirPlatosPage,
    JuegoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
  

  ]
})
export class AppModule {}
