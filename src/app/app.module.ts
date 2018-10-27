import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
<<<<<<< HEAD
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente'

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";
import { AltaDuenioSupervisorPage } from "../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { PerfilPage } from "../pages/perfil/perfil";
import { AltaEmpleadoPage } from "../pages/alta-empleado/alta-empleado";
import { EncuestaSupervisorPage } from "../pages/encuesta-supervisor/encuesta-supervisor";
import { ListadoSupervisorPage } from "../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../pages/reserva/reserva";

=======
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente';
import { AltaPlatosPage } from '../pages/alta-platos/alta-platos';
import { QrIngresoLocalPage } from '../pages/qr-ingreso-local/qr-ingreso-local';
import {  EncuestaClientePage } from '../pages/encuesta-cliente/encuesta-cliente';
import { PedirPlatosPage } from '../pages/pedir-platos/pedir-platos';
>>>>>>> vega_beta
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { AltaDeMesaPage } from '../pages/alta-de-mesa/alta-de-mesa';
import { EncuestaDeEmpleadoPage } from '../pages/encuesta-de-empleado/encuesta-de-empleado';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { ChartsModule } from 'ng2-charts';

import { VerificarTipoProvider } from '../providers/verificar-tipo/verificar-tipo';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
<<<<<<< HEAD
    LoginPage,
    PrincipalPage,
    SplashPage,
    AltaDeMesaPage,
    EncuestaDeEmpleadoPage,

    RegistroClientePage,
    AltaDuenioSupervisorPage,
    PerfilPage,
    AltaEmpleadoPage,
    EncuestaSupervisorPage,
    ListadoSupervisorPage,
    ReservaPage
=======
    RegistroClientePage,
    AltaPlatosPage,
    QrIngresoLocalPage,
    EncuestaClientePage,
    PedirPlatosPage
>>>>>>> vega_beta
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseConfig.fire),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
<<<<<<< HEAD
    LoginPage,
    PrincipalPage,
    SplashPage,
    AltaDeMesaPage,
    EncuestaDeEmpleadoPage,
    RegistroClientePage,
    AltaDuenioSupervisorPage,
    PerfilPage,
    AltaEmpleadoPage,
    EncuestaSupervisorPage,
    ListadoSupervisorPage,
    ReservaPage
=======
    RegistroClientePage,
    AltaPlatosPage,
    QrIngresoLocalPage,
    EncuestaClientePage,
    PedirPlatosPage
>>>>>>> vega_beta
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VerificarTipoProvider,
    // AngularFireAuth
  ]
})
export class AppModule {}
