import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { PrincipalPage } from "../principal/principal";

import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  public estado = "ocultar"

  public rate;
  public textoDelBoton;
  public estadoBoton: boolean = false;
  public ocultarSpinner: boolean = false;
  public textoRate;
  public propina;
  public propinaTotal;
  public subTotal;
  public total;
  public pedidos: Array<any>;

  public firebase = firebase;
  public usuario: any;
  public mesa;
  public keyCliente;

  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController) {

    this.rate = 1;
    this.textoDelBoton = "pagar";
    this.textoRate = "Malo";
    this.propina = 0;
    this.propinaTotal = 0;
    this.subTotal = 0;
    this.total = 0;
    this.pedidos = [];

    let usuariosRef = this.firebase.database().ref("usuarios");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.mesa = "";

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          this.mesa = data[item].mesa;
          this.keyCliente = item;
          break;
        }
      }
    }).then(() => {

      let pedidoRef = this.firebase.database().ref("pedidos").child(this.mesa);

      pedidoRef.once("value", (snap) => {

        let data = snap.val();

        for (let item in data) {

          for (let subItem in data[item]) {

            if (typeof (data[item][subItem]) != "string") {

              this.pedidos.push(data[item][subItem]);
            }
          }
        }

        this.total = this.subTotal = this.pedidos.reduce((valorAnterior, valorActual, indice) => {

          if (indice > 1)
            return valorAnterior + valorActual.cantidad * valorActual.precio;
          else
            return valorAnterior.cantidad * valorAnterior.precio + valorActual.cantidad * valorActual.precio;
        });

        this.estado = "cuenta";
        this.ocultarSpinner = true;

      }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));
    }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

  Votar() {

    switch (this.rate) {
      case 1:
        this.propina = 0;
        this.textoRate = "Malo";
        break;

      case 2:
        this.propina = 5;
        this.textoRate = "Regular";
        break;

      case 3:
        this.propina = 10;
        this.textoRate = "Bien";
        break;

      case 4:
        this.propina = 15;
        this.textoRate = "Muy bien";
        break;

      case 5:
        this.propina = 20;
        this.textoRate = "Excelente";
        break;

      default:
        this.textoRate = "Hola";
        break;
    }

    this.propinaTotal = (this.subTotal * this.propina) / 100;
    this.total = this.subTotal + this.propinaTotal;

    if (this.rate > 1)
      this.textoDelBoton = "Verificar mesa";
    else
      this.textoDelBoton = "Pagar"

  }

  Pagar() {

    if (this.textoDelBoton == "Verificar mesa") {

      let options = { prompt: "Verificá tu mesa para dar tu propina.", formats: "QR_CODE" };

      this.barcodeScanner.scan(options).then(barcodeData => {

        if (barcodeData.text == this.mesa)
          this.textoDelBoton = "Pagar";
        else
          this.presentToast("Ese QR no pertenece a tu mesa.")


      }).catch(err => { });

    } else {

      let clienteRef =  this.firebase.database().ref("usuarios").child(this.keyCliente);
      let mesaRef = this.firebase.database().ref("pedidos").child(this.mesa);

      this.estadoBoton = true;
      this.ocultarSpinner = false;

      clienteRef.update({
        estado: "pago"
      }).then(() => {

        //mesaRef.remove().then
        this.MostrarAlert("Éxito!", "Gracias por comer en nuestro restaurante, nos ayudaría mucho que completases una encuesta sobre tu experiencia en el lugar.", "Ok", this.Redireccionar);
        this.ocultarSpinner = true;
      }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));

    }
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

  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;
  }

  Redireccionar() {
    //this.navCtrl.setRoot(PrincipalPage);

    console.log("esto no esta bien")
  }

}
