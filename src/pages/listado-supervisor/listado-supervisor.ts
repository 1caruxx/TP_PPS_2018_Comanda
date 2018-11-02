import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EncuestaSupervisorPage } from "../encuesta-supervisor/encuesta-supervisor";

import firebase from "firebase";
import "firebase/firestore";

@IonicPage()
@Component({
  selector: 'page-listado-supervisor',
  templateUrl: 'listado-supervisor.html',
})
export class ListadoSupervisorPage {

  public usuarios: Array<any>;
  public empleados: Array<any>;
  public clientes: Array<any>;

  public firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    this.usuarios = [];
    this.empleados = [];
    this.usuarios = [];

    // this.empleados = [
    //   { apellido: "Lareu", nombre: "Fernando", tipo: "dueño", CUIL: "123456789", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    //   { apellido: "Vega", nombre: "Facundo", tipo: "supervisor", CUIL: "54276893", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    //   { apellido: "Quinteros", nombre: "Axel", tipo: "gamma", CUIL: "437619078", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    //   { apellido: "Sanchez", nombre: "Miguel", tipo: "mozo", CUIL: "893412074", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    //   { apellido: "Diaz", nombre: "Hernesto", tipo: "metre", CUIL: "751094538", img: "https://noticiaslasheras.com.ar/images/noticias/empleado-feliz.gif" },
    // ];

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      console.log(this.usuarios);
    }).then(() => {
      this.empleados = this.usuarios.filter(item => {

        return item.tipo == "mozo" || item.tipo == "cocinero" || item.tipo == "bartender" || item.tipo == "metre" || item.tipo == "cajero";
      });

      this.clientes = this.usuarios.filter(item => {

        return item.tipo == "cliente" || item.tipo == "anonimo";
      });


      console.log(this.usuarios);
      console.log(this.empleados);
      console.log(this.clientes);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoSupervisorPage');
  }

  MostrarEncuesta() {
    console.log("hola");
    this.modalCtrl.create(EncuestaSupervisorPage).present();
  }

}
