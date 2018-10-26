import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-encuesta-cliente',
  templateUrl: 'encuesta-cliente.html',
})
export class EncuestaClientePage {
 ocultar:boolean;
 ocultar2:boolean;
 ocultar3:boolean;
 ocultar4:boolean;
 ocultar5:boolean;
 ocultar6:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ocultar=true;
    this.ocultar2=true;
    this.ocultar3=true;
    this.ocultar4=true;
    this.ocultar5=true;
    this.ocultar6=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaClientePage');
  }
  pregunta1()
  {
    this.ocultar=false;
  }
  pregunta2()
  {
    this.ocultar2=false;
  }
  pregunta3()
  {
    this.ocultar3=false;
  }
  pregunta4()
  {
    this.ocultar4=false;
  }
  pregunta5()
  {
    this.ocultar5=false;
  }
  pregunta6()
  {
    this.ocultar6=false;
  }
  Aceptar()
  {
    this.ocultar=true;
    this.ocultar2=true;
    this.ocultar3=true;
    this.ocultar4=true;
    this.ocultar5=true;
    this.ocultar6=true;
   
  }

}
