import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from "../login/login";

import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import "firebase/firestore";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-alta-duenio-supervisor',
  templateUrl: 'alta-duenio-supervisor.html',
})
export class AltaDuenioSupervisorPage {

  public firebase = firebase;
  public db = firebase.firestore();

  public correo: string;
  public clave: string;
  public nombre: string;
  public apellido: string;
  public dni: string;
  public cuil: string;
  public tipo: string = "dueño";
  public foto: string = "";
  public nombreFoto: string;

  public scanSub;
  public estado = "vertical-container";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authInstance: AngularFireAuth,
    private toastCtrl: ToastController,
    private camera: Camera,
    private qrScanner: QRScanner) {

    this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDuenioSupervisorPage');
  }

  ionViewDidLeave() {
    this.OcultarLectorQR();
  }

  Registrar() {

    if(!this.correo || !this.clave || !this.nombre || !this.apellido || !this.dni || !this.cuil) {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

    if(!this.ValidarNumero(this.dni)) {
      this.presentToast("El DNI ingresado no es válido.");
      return;
    }

    if(!this.ValidarNumero(this.cuil)) {
      this.presentToast("El CUIL ingresado no es válido.");
      return;
    }

    if (this.foto == "") {
      this.presentToast("No te olvides de sacarte una foto.");
      return;
    }

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let item in data) {

        if (data[item].dni == parseInt(this.dni)) {

          this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
          esValido = false;
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
                break;

              case "auth/email-already-in-use":
                mensaje = "Este usuario ya fue registrado previamente.";
                break;

              case "auth/weak-password":
                mensaje = "La contraseña debe tener 6 o más caracteres.";
                break;

              default:
                mensaje = "Ups... Tenemos problemas técnicos.";
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

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        if (status.authorized) {

          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

            //this.vibration.vibrate(300);
            alert(text);
            // let datos = JSON.parse(text);

            // this.nombre = datos.nombre;
            // this.apellido = datos.apellido;
            // this.dni = datos.dni;

            this.estado = "vertical-container";
          });

          this.qrScanner.show().then(() => {

            (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
            (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
            (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
            this.estado = "ocultar";
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there

        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => this.presentToast(e));
  }

  OcultarLectorQR() {

    this.qrScanner.hide().then(() => {

      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
      (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
      (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "#FDE8C9";
      this.estado = "vertical-container";
    });

    this.scanSub.unsubscribe();
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

    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

}
