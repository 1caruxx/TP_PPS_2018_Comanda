import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js'
import * as moment from 'moment';

import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-encuesta-supervisor',
  templateUrl: 'encuesta-supervisor.html',
})
export class EncuestaSupervisorPage {

  public pregunta1Labels: string[] = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
  public pregunta1Data: number[] = [0, 0, 0, 0, 0];
  public pregunta2Labels: string[] = ['Sí', 'No'];
  public pregunta2Data: number[] = [0, 0];
  public pregunta3Labels: string[] = ['Mala conducta', 'Mala presentación', 'Poca formalidad'];
  public pregunta3Data: number[] = [0, 0, 0];
  public pregunta4Labels: string[] = ['Sí', 'No'];
  public pregunta4Data: number[] = [0, 0];
  public pregunta5 = [];

  public doughnutChartType: string = 'doughnut';

  public firebase = firebase;
  public usuarioLogueado: any;
  public moment = moment;

  public usuario;
  public conducta = 3;
  public textoRange = "Mediocre";
  public inconveniente = "0";
  public aspectos = { item1: false, item2: false, item3: false };
  public prescencia = "1";
  public opinion;

  public estadoBoton: boolean;
  public image = "";
  public ocultarImagen = true;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    Chart.defaults.global.legend.display = false;

    this.usuario = navParams.get("usuario");
    this.usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

    let usuariosRef = this.firebase.database().ref("usuarios");

    this.estadoBoton = true;

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          this.pregunta1Data = [
            data[item].encuesta.pregunta1.pesimo,
            data[item].encuesta.pregunta1.malo,
            data[item].encuesta.pregunta1.mediocre,
            data[item].encuesta.pregunta1.bueno,
            data[item].encuesta.pregunta1.excelente
          ];

          this.pregunta2Data = [
            data[item].encuesta.pregunta2.si,
            data[item].encuesta.pregunta2.no
          ];

          this.pregunta3Data = [
            data[item].encuesta.pregunta3.item1,
            data[item].encuesta.pregunta3.item2,
            data[item].encuesta.pregunta3.item3
          ];

          this.pregunta4Data = [
            data[item].encuesta.pregunta4.si,
            data[item].encuesta.pregunta4.no
          ];

          this.pregunta5 = data[item].encuesta.pregunta5;
          this.pregunta5.splice(0, 1);
          this.pregunta5 = this.pregunta5.reverse();

          break;
        }
      }

      this.estadoBoton = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaSupervisorPage');
  }

  ModificarTextoRange() {

    let arrayAux = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
    this.textoRange = arrayAux[this.conducta - 1];
  }

  HacerEncuesta() {

    let usuariosRef = this.firebase.database().ref("usuarios");
    this.estadoBoton = true;

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          console.clear();
          let pregunta1 = [data[item].encuesta.pregunta1.pesimo, data[item].encuesta.pregunta1.malo, data[item].encuesta.pregunta1.mediocre, data[item].encuesta.pregunta1.bueno, data[item].encuesta.pregunta1.excelente];
          pregunta1[this.conducta - 1]++;

          let pregunta2 = [data[item].encuesta.pregunta2.no, data[item].encuesta.pregunta2.si];
          pregunta2[this.inconveniente]++;

          let pregunta3 = [];
          pregunta3[0] = (this.aspectos.item1) ? data[item].encuesta.pregunta3.item1 + 1 : data[item].encuesta.pregunta3.item1;
          pregunta3[1] = (this.aspectos.item2) ? data[item].encuesta.pregunta3.item2 + 1 : data[item].encuesta.pregunta3.item2;
          pregunta3[2] = (this.aspectos.item3) ? data[item].encuesta.pregunta3.item3 + 1 : data[item].encuesta.pregunta3.item3;

          let pregunta4 = [data[item].encuesta.pregunta4.no, data[item].encuesta.pregunta4.si];
          pregunta4[this.prescencia]++;

          let pregunta5 = data[item].encuesta.pregunta5;

          if (this.opinion) {

            let momentoActual = moment(new Date());
            pregunta5.push({ nombre: `${this.usuarioLogueado.apellido}, ${this.usuarioLogueado.nombre}`, fecha: momentoActual.format("DD/MM/YYYY HH:mm"), comentario: this.opinion, img: this.usuarioLogueado.img });
          }

          usuariosRef.child(item).update({

            "encuesta": {
              "pregunta1": {
                "pesimo": pregunta1[0],
                "malo": pregunta1[1],
                "mediocre": pregunta1[2],
                "bueno": pregunta1[3],
                "excelente": pregunta1[4]
              },
              "pregunta2": {
                "si": pregunta2[0],
                "no": pregunta2[1]
              },
              "pregunta3": {
                "item1": pregunta3[0],
                "item2": pregunta3[1],
                "item3": pregunta3[2]
              },
              "pregunta4": {
                "si": pregunta4[0],
                "no": pregunta4[1]
              },
              "pregunta5": pregunta5
            }
          }).then(() => {

            this.estadoBoton = false;
            this.presentToast("Se ha cargado correctamente la encuesta.");
            // this.navCtrl.pop();
          }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));

          break;
        }
      }
    });
  }

  MostrarImagen(imagen: string) {
    this.image = imagen;
    this.ocultarImagen = false;
  }

  OcultarImagen() {
    this.ocultarImagen = true;
  }

  VolverAtras() {
    this.navCtrl.pop();
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




/*

            "encuesta": {
              "pregunta1": {
                "pesimo": 0,
                "malo": 0,
                "mediocre": 0,
                "bueno": 0,
                "excelente": 0
              },
              "pregunta2": {
                "si": 0,
                "no": 0
              },
              "pregunta3": {
                "item1": 0,
                "item2": 0,
                "item3": 0
              },
              "pregunta4": {
                "si": 0,
                "no": 0
              },
              "pregunta5": [0]
            }
*/