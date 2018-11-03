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

  public doughnutChartLabels: string[] = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
  public doughnutChartData: number[] = [5, 3, 7, 4, 6];
  public doughnutChartType: string = 'doughnut';

  public firebase = firebase;

  public usuario;
  public conducta = 3;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    Chart.defaults.global.legend.display = false;
    this.usuario = navParams.get("usuario");

    let usuariosRef = this.firebase.database().ref("usuarios");

    // usuariosRef.once("value", (snap) => {

    //   let data = snap.val();

    //   for (let item in data) {

    //     if (data[item].correo == this.usuario.correo) {

    //       this.doughnutChartData = [
    //         data[item].encuesta.pregunta1.pesimo,
    //         data[item].encuesta.pregunta1.malo,
    //         data[item].encuesta.pregunta1.mediocre,
    //         data[item].encuesta.pregunta1.bueno,
    //         data[item].encuesta.pregunta1.excelente
    //       ]

    //       break;
    //     }
    //   }
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaSupervisorPage');
  }

  HacerEncuesta() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let tipo;

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          console.log(data[item].encuesta);
          console.log(item);

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
