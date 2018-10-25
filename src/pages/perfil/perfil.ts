import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public claveOculta: string;
  public datos: Array<any>;
  public usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.claveOculta = this.OcultarClave("12345");

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.datos = [];

    for (let item in this.usuario) {

      this.datos.push({ clave: item, valor: this.usuario[item] })
    }

    console.log(this.datos);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  MostrarClave() {

    this.claveOculta = "12345";
  }

  VolverAOcultar() {
    this.claveOculta = this.OcultarClave("12345");
  }

  OcultarClave(clave: string) {

    let retorno: string = "";

    for (let i = 0; i < clave.length; i++) {

      retorno += "*";
    }

    return retorno;
  }
}
