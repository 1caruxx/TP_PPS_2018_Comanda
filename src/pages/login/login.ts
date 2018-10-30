import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { PrincipalPage } from "../principal/principal";

import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import "firebase/firestore";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public correo: string;
  public clave: string;

  public firebase = firebase;
  public animation = "";
  public estadoBoton: boolean = false;

  public textoDelBoton = "Ingresar";
  public tipo = "dueño";
  public agrandar = "";
  public botonUsuarios = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authInstance: AngularFireAuth,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Loguear() {

    let datos = {
      tipo: this.tipo,
      nombre: "fer",
      img: "fasdfdsaf"
    };
    console.log("hola mundo")
    localStorage.setItem("usuario", JSON.stringify(datos));
    this.navCtrl.setRoot(PrincipalPage);
  }

  DesplegarUsuarios() {
    this.botonUsuarios = "ocultar";
    this.agrandar = "agrandar";
  }

  NoDesplegarUsuarios() {

    setTimeout(() => {
      this.botonUsuarios = "";
    }, 500);

    this.agrandar = "";
  }

  Login() {

    this.estadoBoton = true;
    this.textoDelBoton = "Espera...";

    if (!this.correo) {

      this.presentToast("Introduzca su correo por favor.");
      setTimeout(() => this.estadoBoton = false, 3000);
      this.textoDelBoton = "Ingresar";
      return;
    } else {

      if (!this.clave) {

        this.presentToast("No olvide escribir su contraseña.");
        setTimeout(() => this.estadoBoton = false, 3000);
        this.textoDelBoton = "Ingresar";
        return;
      }
    }

    this.animation = "ani";
    this.authInstance.auth.signInWithEmailAndPassword(this.correo.toLowerCase(), this.clave)

      .then(auth => {

        let usuariosRef = this.firebase.database().ref("usuarios");

        usuariosRef.once("value", (snap) => {

          let data = snap.val();

          for (let item in data) {

            if (data[item].correo == this.correo.toLowerCase()) {

              localStorage.setItem("usuario", JSON.stringify(data[item]));
              break;
            }
          }

          this.animation = "";
          this.navCtrl.setRoot(PrincipalPage);
        });
      })
      .catch(err => {

        this.animation = "";

        switch (err.code) {
          case "auth/invalid-email":
            this.presentToast("El correo ingresado no es valido.");
            this.estadoBoton = false;
            this.textoDelBoton = "Ingresar";
            break;

          case "auth/user-not-found":
          case "auth/wrong-password":
            this.presentToast("Correo o contraseña incorrectos.");
            this.estadoBoton = false;
            this.textoDelBoton = "Ingresar";
            break;

          default:
            this.presentToast("Ups... Tenemos problemas tecnicos.");
            this.estadoBoton = false;
            this.textoDelBoton = "Ingresar";
        }
      });
  }

  SetearUsuario(email: string, password: string) {
    this.correo = email;
    this.clave = password;
    this.NoDesplegarUsuarios();
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
