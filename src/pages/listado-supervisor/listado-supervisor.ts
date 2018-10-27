import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EncuestaSupervisorPage } from "../encuesta-supervisor/encuesta-supervisor";

/**
 * Generated class for the ListadoSupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-supervisor',
  templateUrl: 'listado-supervisor.html',
})
export class ListadoSupervisorPage {

  public empleados: Array<any>;
  public clientes: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    this. empleados = [
      { apellido: "Lareu", nombre: "Fernando", tipo: "dueño", CUIL: "123456789", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
      { apellido: "Vega", nombre: "Facundo", tipo: "supervisor", CUIL: "54276893", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
      { apellido: "Quinteros", nombre: "Axel", tipo: "gamma", CUIL: "437619078", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
      { apellido: "Sanchez", nombre: "Miguel", tipo: "mozo", CUIL: "893412074", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
      { apellido: "Diaz", nombre: "Hernesto", tipo: "metre", CUIL: "751094538", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoSupervisorPage');
  }

  MostrarEncuesta() {
    console.log("hola");
    this.modalCtrl.create(EncuestaSupervisorPage).present();
  }

}
