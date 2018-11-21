import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from "../pages/login/login";
import { PrincipalPage } from "../pages/principal/principal";
import { AltaDuenioSupervisorPage } from "../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { AltaEmpleadoPage } from "../pages/alta-empleado/alta-empleado";
import { ListadoSupervisorPage } from "../pages/listado-supervisor/listado-supervisor";
import { EncuestaSupervisorPage } from "../pages/encuesta-supervisor/encuesta-supervisor";
import { PerfilPage } from "../pages/perfil/perfil";
import { CuentaPage } from "../pages/cuenta/cuenta";
import { ReservaPage } from "../pages/reserva/reserva";
import { ListadoReservasPage } from "../pages/listado-reservas/listado-reservas";
import { JuegoFerPage } from "../pages/juego-fer/juego-fer";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(localStorage.getItem("usuario")) {
        this.rootPage = PrincipalPage;
      }
    });
  }
}
