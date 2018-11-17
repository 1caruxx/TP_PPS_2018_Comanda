import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  // public claveOculta: string;
  // public datos: Array<any>;
  public usuario;
  public tipo;

  public firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {

    // this.claveOculta = this.OcultarClave("12345");

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.tipo = this.usuario.tipo;
    // this.datos = [];

    // for (let item in this.usuario) {

    //   this.datos.push({ clave: item, valor: this.usuario[item] })
    // }

    // console.log(this.datos);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  ionViewWillLeave() {
    localStorage.setItem("refrescarImagen", "true");
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

      let foto = `data:image/jpeg;base64,${result}`;

      let pictures = this.firebase.storage().ref(`usuarios/${nombreFoto}`);

      pictures.putString(foto, "data_url").then(() => {

        pictures.getDownloadURL().then((url) => {

          let usuariosRef = this.firebase.database().ref("usuarios");

          usuariosRef.once("value", (snap) => {

            let data = snap.val();

            for (let item in data) {
      
              if (data[item].correo == this.usuario.correo) {
                
                usuariosRef.child(item).update({
                  img: url
                }).then(() => {
                  this.usuario.img = url;
                  localStorage.setItem("usuario", JSON.stringify(this.usuario));

                });

                break;
              }
            }
          });
        });
      });

    } catch (error) {

      // this.presentToast(error);
    }
  }

  // MostrarClave() {

  //   this.claveOculta = "12345";
  // }

  // VolverAOcultar() {
  //   this.claveOculta = this.OcultarClave("12345");
  // }

  // OcultarClave(clave: string) {

  //   let retorno: string = "";

  //   for (let i = 0; i < clave.length; i++) {

  //     retorno += "*";
  //   }

  //   return retorno;
  // }
}
