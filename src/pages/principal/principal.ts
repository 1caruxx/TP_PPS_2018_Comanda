import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VerificarTipoProvider } from "../../providers/verificar-tipo/verificar-tipo";

import { LoginPage } from "../login/login";
import { PerfilPage } from "../perfil/perfil";

import firebase from "firebase";
import "firebase/firestore";

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  public acciones: Array<any> = [];
  public usuario: any;
  public firebase = firebase;

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

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let tipo;

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {
            if (this.usuario.tipo == "mozo"
              || this.usuario.tipo == "cocinero"
              || this.usuario.tipo == "bartender"
              || this.usuario.tipo == "metre"
              || this.usuario.tipo == "cajero") {

              this.navCtrl.setRoot(LoginPage);
            } else {
              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            }
          });

          break;
        }
      }
    });
  }

}
