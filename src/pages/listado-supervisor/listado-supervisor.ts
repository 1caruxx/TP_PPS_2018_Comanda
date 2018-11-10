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

  public image = "";
  public ocultarImagen = true;
  public ocultarSpinner: boolean = false;

  public firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    this.usuarios = [];
    this.empleados = [];
    this.usuarios = [];

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }
    }).then(() => {
      this.empleados = this.usuarios.filter(item => {

        return item.tipo == "mozo" || item.tipo == "cocinero" || item.tipo == "bartender" || item.tipo == "metre" || item.tipo == "repartidor";
      });

      this.clientes = this.usuarios.filter(item => {

        return item.tipo == "cliente" || item.tipo == "anonimo";
      });

      this.ocultarSpinner = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoSupervisorPage');
  }

  MostrarEncuesta(usuario) {

    this.modalCtrl.create(EncuestaSupervisorPage, { usuario: usuario }).present();
  }

  MostrarImagen(imagen: string) {
    this.image = imagen;
    this.ocultarImagen = false;
  }

  OcultarImagen() {
    this.ocultarImagen = true;
  }

}
