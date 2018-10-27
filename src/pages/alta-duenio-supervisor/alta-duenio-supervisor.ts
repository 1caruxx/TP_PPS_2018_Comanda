import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";

/**
 * Generated class for the AltaDuenioSupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-duenio-supervisor',
  templateUrl: 'alta-duenio-supervisor.html',
})
export class AltaDuenioSupervisorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDuenioSupervisorPage');
  }

  Logout() {

    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

}
