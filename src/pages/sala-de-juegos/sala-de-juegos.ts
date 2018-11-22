import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JuegoFerPage } from "../juego-fer/juego-fer";


import { LoginPage } from "../login/login";

import firebase from "firebase";
import { JuegoPage } from '../juego/juego';
import { JuegoQuinterosPage } from '../juego-quinteros/juego-quinteros';

@IonicPage()
@Component({
  selector: 'page-sala-de-juegos',
  templateUrl: 'sala-de-juegos.html',
})
export class SalaDeJuegosPage {

  public usuario: any;
  public juegos: Array<any>;

  public firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.juegos = [
      { accion: "Preguntas y respuestas", img: "preguntas-respuestas.jpg", ruta: JuegoFerPage },
      { accion: "Juego de la memoria", img: "memoria.jpg", ruta: JuegoPage },
      { accion: "Agilidad aritmética", img: "agilidad-aritmetica.jpg", ruta: JuegoQuinterosPage}
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaDeJuegosPage');
  }

  Redireccionar(ruta) {
    this.navCtrl.push(ruta);
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