import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the QrDeLaMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-de-la-mesa',
  templateUrl: 'qr-de-la-mesa.html',
})
export class QrDeLaMesaPage {

  public scanSub;

  constructor(public navCtrl: NavController, public navParams: NavParams,private qrScanner: QRScanner,private toastCtrl: ToastController)
   {
                  this.qrScanner.prepare()
              .then((status: QRScannerStatus) => {

                if (status.authorized) {

                  this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

                    //this.vibration.vibrate(300);
                    alert(text);
                    //this.OcultarLectorQR();
                    
                    
                    // let datos = JSON.parse(text);

                    // this.nombre = datos.nombre;
                    // this.apellido = datos.apellido;
                    // this.dni = datos.dni;

                    //this.estado = "vertical-container";
                  });

                  this.qrScanner.show().then(() => {

                    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                    (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                    (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                    //this.estado = "ocultar";
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

  presentToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass: "infoToast"
    });

    toast.present();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad QrDeLaMesaPage');
  }

}
