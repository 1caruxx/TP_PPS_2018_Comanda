import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from "../login/login";

import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import "firebase/firestore";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-alta-duenio-supervisor',
  templateUrl: 'alta-duenio-supervisor.html',
})
export class AltaDuenioSupervisorPage {

  public firebase = firebase;
  public db = firebase.firestore();
  public usuario: any;

  public correo: string;
  public clave: string;
  public nombre: string;
  public apellido: string;
  public dni: string;
  public cuil: string;
  public tipo: string = "dueño";
  public foto: string = "";
  public nombreFoto: string;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authInstance: AngularFireAuth,
    private toastCtrl: ToastController,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner) {

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDuenioSupervisorPage');
  }

  ionViewDidLeave() { }

  Registrar() {

    if (!this.correo || !this.clave || !this.nombre || !this.apellido || !this.dni || !this.cuil) {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

    if (!this.ValidarNumero(this.dni)) {
      this.presentToast("El DNI ingresado no es válido.");
      return;
    }

    if (!this.ValidarNumero(this.cuil)) {
      this.presentToast("El CUIL ingresado no es válido.");
      return;
    }

    if (this.foto == "") {
      this.presentToast("No te olvides de sacarte una foto.");
      return;
    }

    this.estadoBoton = true;
    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let item in data) {

        if (data[item].dni == parseInt(this.dni)) {

          this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
          esValido = false;
          this.estadoBoton = false;
          break;
        }
      }

      if (esValido) {

        let correo = this.correo.toLowerCase();

        this.authInstance.auth.createUserWithEmailAndPassword(correo, this.clave)
          .then(() => {

            let pictures = this.firebase.storage().ref(`usuarios/${this.nombreFoto}`);

            pictures.putString(this.foto, "data_url").then(() => {

              pictures.getDownloadURL().then((url) => {

                usuariosRef.push({
                  nombre: this.nombre,
                  apellido: this.apellido,
                  correo: correo,
                  dni: parseInt(this.dni),
                  cuil: parseInt(this.cuil),
                  tipo: this.tipo,
                  clave: this.clave,
                  img: url
                }).then(() => {
                  this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", this.LimpiarCampos);
                  this.estadoBoton = false;
                });
              });
            });
          })
          .catch(error => {

            let mensaje: string;

            console.log(error.code);

            switch (error.code) {
              case "auth/invalid-email":
                mensaje = "El correo ingresado no es válido.";
                this.estadoBoton = false;
                break;

              case "auth/email-already-in-use":
                mensaje = "Este usuario ya fue registrado previamente.";
                this.estadoBoton = false;
                break;

              case "auth/weak-password":
                mensaje = "La contraseña debe tener 6 o más caracteres.";
                this.estadoBoton = false;
                break;

              default:
                mensaje = "Ups... Tenemos problemas técnicos.";
                this.estadoBoton = false;
                break;
            }

            this.presentToast(mensaje);
          });
      }
    });
  }

  async SacarFoto() {

    let date = new Date();
    let nombreFoto = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    try {

      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      let result = await this.camera.getPicture(options);

      this.foto = `data:image/jpeg;base64,${result}`;
      this.nombreFoto = nombreFoto;
    } catch (error) {

      // this.presentToast(error);
    }
  }

  InicializarLectorQR() {

    let options = { prompt: "Escaneá el DNI", formats: "PDF_417" };

    this.barcodeScanner.scan(options).then(barcodeData => {

      let dniDatos = barcodeData.text.split("@");
      this.apellido = dniDatos[1];
      this.nombre = dniDatos[2];
      this.dni = dniDatos[4];
    }).catch(err => { });

  }

  ValidarNumero(numero: string) {

    let arrayNumero = numero.split("");

    for (let caracter of arrayNumero) {

      if (isNaN(parseInt(caracter))) {

        return false;
      }
    }

    return true;
  }

  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;
  }

  LimpiarCampos() {

    this.ocultarAlert = true;
    this.correo = undefined;
    this.clave = undefined;
    this.nombre = undefined;
    this.apellido = undefined;
    this.dni = undefined;
    this.cuil = undefined;
    this.tipo = "dueño";
    this.foto = "";
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

  Logout() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {

            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          });

          break;
        }
      }
    });
  }

}
