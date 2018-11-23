import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { MisReservasPage } from "../../pages/mis-reservas/mis-reservas";
import { LoginPage } from '../login/login';

import firebase from "firebase";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  public nombreDeLosMeses: string;
  public minimo: string;
  public maximo: string;

  public fecha;
  public hora;
  public cantidadPersonas;
  public reservasConfirmadas;

  public firebase = firebase;
  public moment = moment;
  public usuario: any;
  public ocultarSpinner: boolean = true;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    console.clear();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.nombreDeLosMeses = "Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic";
    let date = new Date();

    let mes = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
    let dia = (date.getDate() < 10 ? '0' : '') + date.getDate();

    this.minimo = `${date.getFullYear()}-${mes}-${dia}`;
    this.maximo = `${date.getFullYear() + 1}`;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservaPage');
  }

  Reservar() {

    if (!this.fecha || !this.hora || !this.cantidadPersonas) {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

    let fechaAux = this.fecha.split("-");
    let horaAux = this.hora.split(":");

    let momentoReserva = moment(new Date(fechaAux[0], fechaAux[1] - 1, fechaAux[2], horaAux[0], horaAux[1]));
    let momentoActual = moment(new Date());

    // if (Math.abs(momentoReserva.diff(momentoActual, "m")) < 60) {
    //   this.presentToast("No se puede realizar una reserva con menos de una hora de adelanto.");
    //   return;
    // }

    if (momentoReserva.diff(momentoActual, "m") < 5) {
      this.presentToast("No se puede realizar una reserva con menos de 5 minutos de adelanto.");
      return;
    }

    this.ocultarSpinner = false;
    this.estadoBoton = true;

    let reservasRef = firebase.database().ref("reservas");

    let personasQueVan = parseInt(this.cantidadPersonas.charAt(3));

    reservasRef.once("value", (snap) => {

      let data = snap.val();

      let esValido = true;

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          let diferencia = Math.abs(momentoReserva.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));

          if (diferencia < 60) {

            this.ocultarSpinner = true;
            this.estadoBoton = false;
            this.presentToast("No puede haber un lapso menor a una hora entre alguna de tus reservas.");
            esValido = false;
            break;
          }
        }
      }

      if (esValido) {

        reservasRef.once("value", (snap) => {

          let data = snap.val();
          let reservas = [];
          let contador = 0;

          for (let item in data) {

            reservas.push(data[item]);
            reservas[contador].key = item;
            contador++;
          }

          this.reservasConfirmadas = reservas.filter(item => {

            return item.estado == "confirmada";
          });

        }).then(() => {

          let mesasRef = this.firebase.database().ref("mesas");
          let puedeReservar = false;

          mesasRef.once("value", (snap) => {

            let data = snap.val();
            let estaDesocupada: boolean;

            for (let item in data) {

              estaDesocupada = true;

              for (let reserva of this.reservasConfirmadas) {

                if (data[item].numeroMesa == reserva.mesa) {

                  let momentoReservaMesa = moment(reserva.horario, "DD/MM/YYYY HH:mm");

                  if (Math.abs(momentoReserva.diff(momentoReservaMesa, "m")) < 40) {

                    estaDesocupada = false;
                    break;
                  }
                }
              }

              if (data[item].cantidadComensales >= personasQueVan && estaDesocupada) {

                console.log(data[item].cantidadComensales >= personasQueVan);
                puedeReservar = true;
                break;
              }
            }

            if(puedeReservar) {
              reservasRef.push({
                correo: this.usuario.correo,
                apellido: this.usuario.apellido,
                nombre: this.usuario.nombre,
                img: this.usuario.img,
                cantidadPersonas: personasQueVan,
                horario: momentoReserva.format("DD/MM/YYYY HH:mm"),
                estado: "pendiente"
              }).then(() => {
      
                this.ocultarSpinner = true;
                this.estadoBoton = false;
                this.MostrarAlert("¡Éxito!", "Se registró tu reserva y te notificaremos cuando el encargado la confirme.", "Aceptar", this.Volver);
      
              });
            } else {
  
              this.ocultarSpinner= true;
              this.estadoBoton = false;
              this.MostrarAlert("Ups...", "No hay mesas disponibles para esa fecha y horario.", "Aceptar", this.OcultarAlert);
            }
          })
        });
      }
    })
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

  VerReservas() {
    this.navCtrl.push(MisReservasPage);
  }

  Volver() {
    this.navCtrl.pop();
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
