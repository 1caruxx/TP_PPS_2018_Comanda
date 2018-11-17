import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { PrincipalPage } from "../principal/principal";
import { RegistroClientePage } from "../registro-cliente/registro-cliente";
import { EncuestaDeEmpleadoPage } from "../encuesta-de-empleado/encuesta-de-empleado";
import { QrIngresoLocalPage } from "../qr-ingreso-local/qr-ingreso-local";

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
    private toastCtrl: ToastController,
    public plt: Platform) {

    // fcm.getToken()

  //   // Listen to incoming messages
  //   fcm.listenToNotifications().pipe(
  //     tap(msg => {
  //       // show a toast
  //       const toast = toastCtrl.create({
  //         message: msg.body,
  //         duration: 3000
  //       });
  //       toast.present();
  //     })
  //   )
  //     .subscribe()
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

  Redireccionar() {
    this.navCtrl.push(RegistroClientePage);
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
          let tipo;
          let estado;

          for (let item in data) {

            // if (data[item].correo == this.correo.toLowerCase()) {

            //   localStorage.setItem("usuario", JSON.stringify(data[item]));
            //   tipo = data[item].tipo;
            //   break;
            // }

            if (data[item].correo == this.correo.toLowerCase()) {

              if (!data[item].logueado) {

                localStorage.setItem("usuario", JSON.stringify(data[item]));
                tipo = data[item].tipo;
                estado = data[item].estado;

                usuariosRef.child(item).update({
                  logueado: true
                }).then(() => {

                  switch (tipo) {

                    // redirecciono a encuesta
                    case "mozo":
                    case "cocinero":
                    case "bartender":
                    case "metre":
                    case "repartidor":
                      this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                      break;

                    case "cliente":
                      if (estado == "espera")
                        this.navCtrl.setRoot(QrIngresoLocalPage);
                      else
                        this.navCtrl.setRoot(PrincipalPage);
                      break;

                    // redirecciono a qr si no esta dentro del local, pero a principal si, si lo esta.
                    case "anonimo":

                      if (estado == "atendido" || estado == "pidio" || estado == "comiendo")
                        this.navCtrl.setRoot(PrincipalPage);
                      else
                        this.navCtrl.setRoot(QrIngresoLocalPage);
                      break;

                    // siempre a principal (dueño, supervisor, cliente (registrado))
                    default:
                      this.navCtrl.setRoot(PrincipalPage);
                      break;
                  }
                });

                break;
              } else {

                this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
              }
            }
          }

          //   if (data[item].correo == this.correo.toLowerCase()) {

          //     if (!data[item].logueado) {

          //       localStorage.setItem("usuario", JSON.stringify(data[item]));

          //       usuariosRef.child(item).update({
          //         logueado: true
          //       }).then(() => { this.navCtrl.setRoot(PrincipalPage); } /**/);
          //       break;
          //     } else {
          //       this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
          //     }
          //   }
          // }

          this.animation = "";
          this.estadoBoton = false;
          this.textoDelBoton = "Ingresar";

          // switch (tipo) {

          //   case "mozo":
          //   case "cocinero":
          //   case "bartender":
          //   case "metre":
          //   case "repartidor":
          //     this.navCtrl.setRoot(PrincipalPage);
          //     break;

          //   case "cliente":
          //   case "anonimo":
          //     this.navCtrl.setRoot(PrincipalPage);
          //     break;

          //   default:
          //     this.navCtrl.setRoot(PrincipalPage);
          //     break;
          // }

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
