import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VerificarTipoProvider } from "../../providers/verificar-tipo/verificar-tipo";

import { LoginPage } from "../login/login";
import { PerfilPage } from "../perfil/perfil";

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  public acciones: Array<any> = [];
  public usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private verificarTipo: VerificarTipoProvider) {

    this.acciones = this.verificarTipo.RetornarAcciones();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  Redireccionar(ruta) {

    this.navCtrl.push(ruta);
  }

  IrAPerfil() {
    this.navCtrl.push(PerfilPage);
  }

  Logout() {

    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

}
