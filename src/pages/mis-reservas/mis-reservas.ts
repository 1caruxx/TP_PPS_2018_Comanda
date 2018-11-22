import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';

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

  public ocultarSpinner: boolean = false;
  public ocultarInterfazMesas: boolean;
  public ejecutarSetInterval: boolean;

  public firebase = firebase;
  public usuario: any;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  public reservaSeleccionada: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    this.reservas = [];
    this.reservasPendientes = [];
    this.reservasConfirmadas = [];
    this.ejecutarSetInterval = true;
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


      if (this.ejecutarSetInterval) {

        this.VerificarReservasPasadasDeTiempo();
        this.ejecutarSetInterval = false;

        setInterval(() => {

          this.VerificarReservasPasadasDeTiempo();
        }, 1000 * 60);
      }

      this.ocultarSpinner = true;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReservasPage');
  }

  VerificarReservasPasadasDeTiempo() {

    let momentoActual = moment(new Date());

    for (let item of this.reservas) {

      if (momentoActual.diff(moment(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {

        firebase.database().ref("reservas").child(item.key).remove().catch(() => this.presentToast("Ups... Tenemos problemas técnicos"));
      }

    }

  }

  ConfirmarCancelarReserva(reserva) {

    this.reservaSeleccionada = reserva;
    this.MostrarAlert("", `¿Seguro que deseas cancelar tu reserva para el ${this.reservaSeleccionada.horario} Hs.?`, "Sí", this.CancelarRerserva);

  }

  CancelarRerserva() {

    this.OcultarAlert();
    this.ocultarInterfazMesas = false;

    firebase.database().ref("reservas").child(this.reservaSeleccionada.key).remove().then(() => {
      this.ocultarSpinner = true;
      this.presentToast("Se ha cancelado la reserva.");
    })
  }

  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;
  }

  OcultarAlert() {
    this.ocultarAlert = true;
  }

  presentToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 3000,
      cssClass: "infoToast"
    });

    toast.present();
  }

  Logout() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {
            if (this.usuario.tipo == "mozo"
              || this.usuario.tipo == "cocinero"
              || this.usuario.tipo == "bartender"
              || this.usuario.tipo == "metre"
              || this.usuario.tipo == "repartidor") {

              // Para redireccionar a la encuesta de axel.
              // localStorage.setItem("desloguear", "true");
              // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);

              localStorage.clear();
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
