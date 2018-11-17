import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  public firebase = firebase;
  public moment = moment;
  public usuario: any;
  public ocultarSpinner: boolean = true;

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

    if (Math.abs(momentoReserva.diff(momentoActual, "m")) < 60) {
      this.presentToast("No se puede realizar una reserva con menos de una hora de adelanto.");
      return;
    }

    this.ocultarSpinner = false;

    let reservasRef = firebase.database().ref("reservas");

    reservasRef.once("value", (snap) => {

      let data = snap.val();

      let esValido = true;

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          let diferencia = Math.abs(momentoReserva.diff(moment(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));

          if (diferencia < 60) {
            
            this.ocultarSpinner = true;
            this.presentToast("No puede a haber un lapso menor a una hora entre alguna de tus reservas.");
            esValido = false;
            break;
          }
        }
      }

      if (esValido) {

        reservasRef.push({
          correo: this.usuario.correo,
          apellido: this.usuario.apellido,
          nombre: this.usuario.nombre,
          img: this.usuario.img,
          cantidadPersonas: this.cantidadPersonas.charAt(3),
          horario: momentoReserva.format("DD/MM/YYYY HH:mm"),
          estado: "pendiente"
        }).then(() => {

          this.ocultarSpinner = true;
          this.presentToast("Se ha registrado tu reserva y te notificaremos cuando el encargado la confirme.")
        });
      }
    })
  }

  presentToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass: "infoToast"
    });

    toast.present();
  }

}
