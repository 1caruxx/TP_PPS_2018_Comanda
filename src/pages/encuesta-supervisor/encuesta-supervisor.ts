import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'

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

  public doughnutChartType: string = 'doughnut';

  public firebase = firebase;

  public usuario;
  public conducta = 3;
  public textoRange = "Mediocre";
  public inconveniente = "0";
  public aspectos = {item1: false, item2: false, item3: false};


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    Chart.defaults.global.legend.display = false;

    this.usuario = navParams.get("usuario");

    let usuariosRef = this.firebase.database().ref("usuarios");

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

          break;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaSupervisorPage');
  }

  ModificarTextoRange() {

    switch (this.conducta) {
      case 1:
        this.textoRange = "Pésimo";
        break;

      case 2:
        this.textoRange = "Malo";
        break;

      case 3:
        this.textoRange = "Mediocre";
        break;

      case 4:
        this.textoRange = "Bueno";
        break;

      case 5:
        this.textoRange = "Excelente";
        break;
      default:
        this.textoRange = "Algo fallo";
        break;
    }

  }

  HacerEncuesta() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let tipo;

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          console.clear();
          let pregunta1 = [data[item].encuesta.pregunta1.pesimo, data[item].encuesta.pregunta1.malo, data[item].encuesta.pregunta1.mediocre, data[item].encuesta.pregunta1.bueno, data[item].encuesta.pregunta1.excelente];
          pregunta1[this.conducta-1]++;

          let pregunta2 = [data[item].encuesta.pregunta2.no, data[item].encuesta.pregunta2.si];
          pregunta2[this.inconveniente]++;

          let pregunta3 = [];
          pregunta3[0] = (true) ? data[item].encuesta.pregunta3.item1+1 : data[item].encuesta.pregunta3.item1;
          pregunta3[1] = (this.aspectos.item2) ? data[item].encuesta.pregunta3.item2+1 : data[item].encuesta.pregunta3.item2;
          pregunta3[2] = (this.aspectos.item3) ? data[item].encuesta.pregunta3.item3+1 : data[item].encuesta.pregunta3.item3;
          console.log(pregunta3);

          usuariosRef.child(item).update({

            encuesta: {
              pregunta1: {
                pesimo: 5,
                malo: 7,
                mediocre: 3,
                bueno: 10,
                excelente: 25
              },
              pregunta2: {
                si: 2,
                no: 7
              },
              pregunta3: {
                item1: 6,
                item2: 8,
                item3: 9
              },
              pregunta4: 9,
              pregunta5: 7
            }
          })

          break;
        }
      }
    });
  }

  VolverAtras() {
    this.navCtrl.pop();
  }

}
