import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AltaPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-alta-platos',
  templateUrl: 'alta-platos.html',
})
export class AltaPlatosPage {
  ocultar:boolean;
  mostrar:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ocultar=false;
    this.mostrar=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaPlatosPage');
  }

  Fotos()
  {
    this.ocultar=true;
    this.mostrar=true;

  }
  Cancelar()
  {
    this.ocultar=false;
    this.mostrar=false;
  }
}
