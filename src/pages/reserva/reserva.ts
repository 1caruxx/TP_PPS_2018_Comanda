import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  public dia: number;
  public mes: number;
  public anio: number;

  public mesSeleccionado: number;
  public anioSeleccionado: number;

  public diaMinimo: number;
  public mesMinimo: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.clear();
    let date = new Date();

    this.dia = date.getDate();
    this.mes = date.getMonth();
    this.anio = date.getFullYear();

    this.mesSeleccionado = this.mes;
    this.anioSeleccionado = this.anio;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPage');
  }

  test() {
   
    console.log("entre a la funcion");

    if(this.anioSeleccionado != this.anio) {


     
      this.mesMinimo = 1;
      console.log("entre al if, mes minimo: " + this.mesMinimo)
    } else {

      this.mesSeleccionado = this.mes;
      this.mesMinimo = this.mes;
      console.log("entre al else, mes minimo: " + this.mesMinimo)
    }
  }

}
