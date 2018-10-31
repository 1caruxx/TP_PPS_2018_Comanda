import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the EncuestaDeEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-de-empleado',
  templateUrl: 'encuesta-de-empleado.html',
})
export class EncuestaDeEmpleadoPage {

  encuestita=true;
  probabilidad=false;
  public firebase = firebase;
  public db = firebase.firestore();
  public foto: string = "";
  public nombreFoto: string;
  public uno="d";
  public dos="f";
  public tres="g";
  public cuatro="s";
  public cinco="e";

  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth,private toastCtrl: ToastController,private camera: Camera)
   {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaDeEmpleadoPage');
  }

  Volver()
  {
    //this.navCtrl.setRoot(SuperControlPanelPage);
  }

  
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['Bueno', 'Malo'];
  public pieChartData:number[] = [300, 500];
 
  public randomizeType():void {
    
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  enviarEncuesta()
  {
    //this.encuestita=false;
   // this.probabilidad=true;

   if (!this.uno || !this.dos || !this.tres || !this.cuatro || !this.cinco)
    {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

  
    let mesasRef = this.firebase.database().ref("encuestaDeEmpleado");

    let pictures = this.firebase.storage().ref(`encuestaDeEmpleado/${this.nombreFoto}`);

    pictures.putString(this.foto, "data_url").then(() => {

      pictures.getDownloadURL().then((url) => {

        mesasRef.push({
          uno: this.uno,
          dos: this.dos,
          tres: this.tres,
          cuatro:this.cuatro,
          cinco:this.cinco,
          img: url
        });
      });
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
