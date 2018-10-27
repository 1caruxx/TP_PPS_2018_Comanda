import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'
/**
 * Generated class for the EncuestaSupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-supervisor',
  templateUrl: 'encuesta-supervisor.html',
})
export class EncuestaSupervisorPage {

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';




// events
public chartClicked(e:any):void {
  console.log(e);
}

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    Chart.defaults.global.legend.display = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaSupervisorPage');
  }

  VolverAtras() {
    this.navCtrl.pop();
  }

}
