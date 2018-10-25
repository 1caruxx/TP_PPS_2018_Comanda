import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PrincipalPage } from "../principal/principal";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Loguear() {

    let datos = {
      tipo: "supervisor",
      nombre: "fer",
      img: "fasdfdsaf"
    };
    console.log("hola mundo")
    localStorage.setItem("usuario", JSON.stringify(datos));
    this.navCtrl.setRoot(PrincipalPage);
  }

}
