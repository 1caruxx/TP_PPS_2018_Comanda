import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the AltaDeMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-de-mesa',
  templateUrl: 'alta-de-mesa.html',
})
export class AltaDeMesaPage {

  public firebase = firebase;
  public db = firebase.firestore();
  public numeroMesa;
  public cantidadComensales;
  public tipo="normal";
  public foto: string = "";
  public nombreFoto: string;
  public probandingg;
  public cerrarqr=false;
  public esValido=false;
  //public tipo="normal";

  public scanSub;
  public estado = "vertical-container";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth,private toastCtrl: ToastController,private camera: Camera,
    private qrScanner: QRScanner)
   {
    //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
    this.probandingg=true;


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDeMesaPage');
  }

  Alta()
  {

    if (!this.numeroMesa || !this.cantidadComensales || !this.tipo || this.foto=="")
    {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

    if(this.numeroMesa < 1 || this.numeroMesa > 10)
    {
      this.presentToast("Solo tenemos lugar para 10 mesas en el lugar")
      return;
    }

    if(this.cantidadComensales < 1 || this.cantidadComensales > 4)
    {
      this.presentToast("Los comensales solo pueden ser de 1 a 4")
      return;
    }

    

  /*  let mesasRef = this.firebase.database().ref("mesas");

    mesasRef.push({
      numeroMesa: this.numeroMesa,
      cantidadComensales: this.cantidadComensales,
      tipo: this.tipo,





     
    });*/

    let verMesaRef = this.firebase.database().ref("mesas");

    verMesaRef.once("value", (snap) => {

      let data = snap.val();
      this.esValido = true;
     

      for (let item in data) 
      {

        if (data[item].numeroMesa == parseInt(this.numeroMesa)) 
        {

          this.presentToast("La mesa ingresada ya esta registrada");
          this.esValido = false;
          break;
        }
      }
      
    });

    if (this.esValido) {
          let mesasRef = this.firebase.database().ref("mesas");


          let pictures = this.firebase.storage().ref(`mesas/${this.nombreFoto+"mesaNumero:"+this.numeroMesa}`);

          pictures.putString(this.foto, "data_url").then(() => {

            pictures.getDownloadURL().then((url) => {

              mesasRef.push({
                numeroMesa: this.numeroMesa,
                cantidadComensales: this.cantidadComensales,
                tipo: this.tipo,
                img: url
              });

              
            });

            this.presentToast("La mesa se pudo cargar con exito");
          this.navCtrl.setRoot(this.navCtrl.getActive().component);

          });

          

    
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

  Leer()
  {
   /* this.qrScanner.prepare()
          .then((status: QRScannerStatus) => {
            if (status.authorized) {
              // camera permission was granted


              // start scanning
              let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                console.log('Scanned something', text);

                this.qrScanner.hide(); // hide camera preview
                scanSub.unsubscribe(); // stop scanning
              });

            } else if (status.denied) {
              // camera permission was permanently denied
              // you must use QRScanner.openSettings() method to guide the user to the settings page
              // then they can grant the permission from there
            } else {
              // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
          })
          .catch((e: any) => console.log('Error is', e));

*/
this.cerrarqr=true;
this.probandingg=false;

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
      //(window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "#FDE8C9";
      this.estado = "vertical-container";
      this.probandingg=true;
      this.cerrarqr=false;
    });

    this.scanSub.unsubscribe();
  }


  




   





}
