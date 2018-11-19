import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from "firebase";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-mis-reservas',
  templateUrl: 'mis-reservas.html',
})
export class MisReservasPage {

  public reservas: Array<any>;
  public reservasPendientes: Array<any>;
  public reservasConfirmadas: Array<any>;

  public image = "";
  public ocultarImagen = true;
  public ocultarSpinner: boolean = false;
  public ocultarInterfazMesas: boolean;

  public firebase = firebase;
  public usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.reservas = [];
    this.reservasPendientes = [];
    this.reservasConfirmadas = [];
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    setInterval(() => {
      this.reservasPendientes = this.reservasPendientes;
      this.reservasConfirmadas = this.reservasConfirmadas;
    }, 500);

    let reservasRef = this.firebase.database().ref("reservas");

    reservasRef.on("value", (snap) => {

      let data = snap.val();
      this.reservas = [];
      let contador = 0;

      for (let item in data) {

        this.reservas.push(data[item]);
        this.reservas[contador].key = item;
        contador++;
      }

      this.reservas = this.reservas.filter(item => {

        return this.usuario.correo == item.correo;
      });

      this.reservasPendientes = this.reservas.filter(item => {

        return item.estado == "pendiente";
      });

      this.reservasConfirmadas = this.reservas.filter(item => {

        return item.estado == "confirmada";
      });

      this.ocultarSpinner = true;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReservasPage');
  }

  MostrarImagen(imagen: string) {
    this.image = imagen;
    this.ocultarImagen = false;
  }

  OcultarImagen() {
    this.ocultarImagen = true;
  }

}
