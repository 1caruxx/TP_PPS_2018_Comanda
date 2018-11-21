import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";
import { AltaDuenioSupervisorPage } from "../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { PerfilPage } from "../pages/perfil/perfil";
import { AltaEmpleadoPage } from "../pages/alta-empleado/alta-empleado";
import { EncuestaSupervisorPage } from "../pages/encuesta-supervisor/encuesta-supervisor";
import { ListadoSupervisorPage } from "../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../pages/reserva/reserva";
import { MisReservasPage } from "../pages/mis-reservas/mis-reservas";
import { CuentaPage } from "../pages/cuenta/cuenta";
import { ListadoReservasPage } from "../pages/listado-reservas/listado-reservas";
import { JuegoFerPage } from "../pages/juego-fer/juego-fer";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { VerificarTipoProvider } from '../providers/verificar-tipo/verificar-tipo';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { ChartsModule } from 'ng2-charts';

import { ComponentsModule } from "../components/components.module";
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    PrincipalPage,
    AltaDuenioSupervisorPage,
    PerfilPage,
    AltaEmpleadoPage,
    EncuestaSupervisorPage,
    ListadoSupervisorPage,
    ReservaPage,
    MisReservasPage,
    CuentaPage,
    ListadoReservasPage,
    JuegoFerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    ChartsModule,
    ComponentsModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    PrincipalPage,
    AltaDuenioSupervisorPage,
    PerfilPage,
    AltaEmpleadoPage,
    EncuestaSupervisorPage,
    ListadoSupervisorPage,
    ReservaPage,
    MisReservasPage,
    CuentaPage,
    ListadoReservasPage,
    JuegoFerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VerificarTipoProvider,
    AngularFireAuth,
    Camera,
    BarcodeScanner
  ]
})
export class AppModule {}
