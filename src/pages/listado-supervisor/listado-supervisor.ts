import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EncuestaSupervisorPage } from "../encuesta-supervisor/encuesta-supervisor";
import { LoginPage } from '../login/login';

import firebase from "firebase";
import "firebase/firestore";

import { Chart } from 'chart.js'

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

  public vistas: Array<any>;

  // =========== Axel ===========
  public pieChartType: string = 'pie';
  public pregUnoPrimeraRespuesta = 0;
  public pregUnoSegundaRespuesta = 0;
  public pregUnoTerceraRespuesta = 0;

  public pregTresPrimeraRespuesta = 0;
  public pregTresSegundaRespuesta = 0;

  public pregCuatroPrimeraRespuesta = 0;
  public pregCuatroSegundaRespuesta = 0;

  public pregCincoPrimeraRespuesta = 0;
  public pregCincoSegundaRespuesta = 0;

  public pieChartLabelsUno: string[];
  public pieChartDataUno: number[];

  public pieChartLabels: string[];
  public pieChartData: number[];

  public pieChartLabelsDos: string[];
  public pieChartDataDos: number[];

  public pieChartLabelsCinco: string[];
  public pieChartDataCinco: number[];
  // ============================

  // =========== Facu ===========
  public pregunta4Labels: string[] = ['Horribles', 'Feos', 'Pasable', 'Aceptable', 'Buenos', 'Ricos', 'Muy ricos'];
  public pregunta4Data: number[] = [0, 0, 0, 0, 0, 0, 0];
  public pregunta1Labels: string[] = ['Sí', 'No'];
  public pregunta1Data: number[] = [0, 0];
  public pregunta2Labels: string[] = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'];
  public pregunta2Data: number[] = [0, 0, 0, 0, 0];
  public pregunta3Labels: string[] = ['Comodidad', 'Platos', 'Precios', 'No tienen'];
  public pregunta3Data: number[] = [0, 0, 0, 0];
  public pregunta5Labels: string[] = ['Puntuaron 1', ' Puntuaron 2', ' Puntuaron 3', 'Puntuaron 4', 'Puntuaron 5', 'Puntuaron 6', 'Puntuaron 7', 'Puntuaron 8', 'Puntuaron 9', 'Puntuaron 10'];
  public pregunta5Data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public doughnutChartType: string = 'doughnut';

  public votosPreg1Si = 0;
  public votosPreg1No = 0;
  public votosHorribles = 0;
  public votosFeos = 0;
  public votosPasable = 0;
  public votosAceptable = 0;
  public votosBuenos = 0;
  public votosRicos = 0;
  public votosMuyRicos = 0;
  public votos1 = 0;
  public votos2 = 0;
  public votos3 = 0;
  public votos4 = 0;
  public votos5 = 0;
  public votos6 = 0;
  public votos7 = 0;
  public votos8 = 0;
  public votos9 = 0;
  public votos10 = 0;
  public votosComodidad = 0;
  public votosAtencion = 0;
  public votoPrecios = 0;
  public votosPlatos = 0;

  public votosMuyMala = 0;
  public votosMala = 0;
  public votosRegular = 0;
  public votosBuena = 0;
  public votosMuyBuena = 0;
  public cliente: string;
  public ocultar: boolean;
  public ocultar2: boolean;
  public ocultar3: boolean;
  public ocultar4: boolean;
  public ocultar5: boolean;
  public ocultar6: boolean;
  public mensaje;
  public resp1;
  public resp2;
  public resp3comodidad = false;
  public resp3platos = false;
  public resp3precios = false;
  public resp3atencion = false;
  // ============================

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    Chart.defaults.global.legend.display = false;


    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.usuarios = [];
    this.empleados = [];
    this.usuarios = [];
    this.vistas = [true, false, false];

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

      this.encuesta();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoSupervisorPage');
  }

  AlternarVista(indice) {

    this.vistas = [false, false, false];
    this.vistas[indice] = true;
  }

  MostrarEncuesta(usuario) {

    this.modalCtrl.create(EncuestaSupervisorPage, { usuario: usuario }).present();
  }

  encuesta() {

    let probRef = this.firebase.database().ref("encuestaDeEmpleado");

    probRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].uno == 1) {
          this.pregUnoPrimeraRespuesta++;
        }
        if (data[item].uno == 2) {
          this.pregUnoSegundaRespuesta++;
        }

        if (data[item].uno == 3) {
          this.pregUnoTerceraRespuesta++;
        }

        if (data[item].tres == "si") {
          this.pregTresPrimeraRespuesta++
        }

        if (data[item].tres == "no") {
          this.pregTresSegundaRespuesta++;
        }

        if (data[item].cuatro == "si") {
          this.pregCuatroPrimeraRespuesta++;
        }

        if (data[item].cuatro == "no") {
          this.pregCuatroSegundaRespuesta++;
        }

        if (data[item].cinco.item1 == true) {
          this.pregCincoPrimeraRespuesta++;
        }

        if (data[item].cinco.item2 == true) {
          this.pregCincoSegundaRespuesta++;
        }
      }
    }).then(() => {

      this.pieChartLabels = ['Sí', 'No'];
      this.pieChartData = [this.pregTresPrimeraRespuesta, this.pregTresSegundaRespuesta];
      this.pieChartLabelsDos = ['Sí', 'No'];
      //this.pieChartDataDos = [this.pregCuatroPrimeraRespuesta, this.pregCuatroPrimeraRespuesta];
      this.pieChartDataDos = [this.pregCuatroPrimeraRespuesta, this.pregCuatroSegundaRespuesta];
      this.pieChartLabelsCinco = ['Sí', 'No'];
      this.pieChartDataCinco = [this.pregCincoPrimeraRespuesta, this.pregCincoSegundaRespuesta];
      this.pieChartLabelsUno = ["Bien", "Más o menos", "Mal"];
      //this.pieChartDataUno = [this.pregUnoPrimeraRespuesta, this.pregUnoSegundaRespuesta, this.pregUnoTerceraRespuesta];
      this.pieChartDataUno = [this.pregUnoTerceraRespuesta, this.pregUnoSegundaRespuesta, this.pregUnoPrimeraRespuesta];

      this.EncuestaFacu()
    });
  }

  EncuestaFacu() {

    let encuestaRef = firebase.database().ref("encuestaCliente/");

    encuestaRef.once("value", (snap) => {

      let data = snap.val();
      for (let item in data) {
        //Cargo los puntos para la pregunta 4.
        console.log(data[item].preg4);
        if (data[item].preg4 == 1) {
          this.votosHorribles++;
        }
        if (data[item].preg4 == 2) {
          this.votosFeos++;
        }
        if (data[item].preg4 == 3) {
          this.votosPasable++;

        }
        if (data[item].preg4 == 4) {
          this.votosAceptable++;

        }
        if (data[item].preg4 == 5) {
          this.votosBuenos++;

        }
        if (data[item].preg4 == 6) {
          this.votosRicos++;

        }
        if (data[item].preg4 == 7) {
          this.votosMuyRicos++;

        }
        //Cargo los puntos para pregunta 1
        if (data[item].preg1 == "Si") {
          this.votosPreg1Si++;
        } else {
          this.votosPreg1No++;
        }
        //Cargo los puntos para pregunta 2
        if (data[item].preg2 == "muy mala") {
          this.votosMuyMala++;
        }
        if (data[item].preg2 == "mala") {
          this.votosMala++;
        }
        if (data[item].preg2 == "muy buena") {
          this.votosMuyBuena++;
        }
        if (data[item].preg2 == "buena") {
          this.votosBuena++;
        }
        if (data[item].preg2 == "regular") {
          this.votosRegular++;
        }

        //Valido pregunta 3
        let resp3 = data[item].preg3.split("-");

        if (resp3[0] == "true") {
          this.votosComodidad++;
        }
        if (resp3[1] == "true") {
          this.votosPlatos++;
        }
        if (resp3[2] == "true") {
          this.votoPrecios++;
        }
        if (resp3[3] == "true") {
          this.votosAtencion++;
        }

        //Valido pregunta 5
        if (data[item].preg5 == "1") {
          this.votos1++;
        }
        if (data[item].preg5 == "2") {
          this.votos2++;
        }
        if (data[item].preg5 == "3") {
          this.votos3++;
        }
        if (data[item].preg5 == "4") {
          this.votos4++;
        }
        if (data[item].preg5 == "5") {
          this.votos5++;
        }
        if (data[item].preg5 == "6") {
          this.votos6++;
        }
        if (data[item].preg5 == "7") {
          this.votos7++;
        }
        if (data[item].preg5 == "8") {
          this.votos8++;
        }
        if (data[item].preg5 == "9") {
          this.votos9++;
        }
        if (data[item].preg5 == "10") {
          this.votos10++;
        }

      }

      this.pregunta4Data = [
        this.votosHorribles,
        this.votosFeos,
        this.votosPasable,
        this.votosAceptable,
        this.votosBuenos,
        this.votosRicos,
        this.votosMuyRicos
      ];

      this.pregunta5Data = [
        this.votos1,
        this.votos2,
        this.votos3,
        this.votos4,
        this.votos5,
        this.votos6,
        this.votos7,
        this.votos8,
        this.votos9,
        this.votos10,
      ];

      this.pregunta1Data = [
          this.votosPreg1Si,
          this.votosPreg1No
      ];

      this.pregunta2Data = [
        this.votosMuyMala,
        this.votosMala,
        this.votosRegular,
        this.votosBuena,
        this.votosMuyBuena
      ];

      this.pregunta3Data = [
        this.votosComodidad,
        this.votosPlatos,
        this.votoPrecios,
        this.votosAtencion
      ];
    }).then(() => {

      this.ocultarSpinner = true;
    });

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
