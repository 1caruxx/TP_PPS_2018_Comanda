import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EncuestaSupervisorPage } from "../encuesta-supervisor/encuesta-supervisor";
import { LoginPage } from '../login/login';

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
  public usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
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
