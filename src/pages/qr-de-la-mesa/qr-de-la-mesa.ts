import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import 'rxjs/add/operator/map'
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";


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

  user_data= [];
  public firebase = firebase;
  public db = firebase.firestore();
  public scanSub;
  public cerrarqr=false;
  public probandingg=true;
  public clientovich;

  public usuarios: Array<any>;
  public espera: Array<any>;
  public atendidos: Array<any>;


  

  constructor(public navCtrl: NavController, public navParams: NavParams,private qrScanner: QRScanner,private toastCtrl: ToastController,private authInstance: AngularFireAuth)
   {
                 /* this.qrScanner.prepare()
              .then((status: QRScannerStatus) => {

                if (status.authorized) {

                  this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

                  
                    alert(text);
                   
                  });

                  this.qrScanner.show().then(() => {

                    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                    (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                    (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                  
                  });

                } else if (status.denied) {
                  

                } else {
                 
                }
              })
              .catch((e: any) => this.presentToast(e));

*/
    this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");


  /*  let pedidosRef = this.firebase.database().ref("usuarios");

    pedidosRef.once("value", (snap) => {

      //let data = snap.val();
     // let esValido = true;
     let result = snap.val();
    for(let k in result){ //"k" provides key Id of each object
      this.user_data.push({
       id : k,
       apellido : result[k].apellido,
       clave : result[k].clave,
       correo : result[k].correo,
       cuil : result[k].cuil,
       dni : result[k].dni,
       nombre : result[k].nombre,
       tipo : result[k].tipo
     });
    }



      
    });*/  
    this.usuarios = [];
    this.espera = [];
    this.atendidos = [];


    let genteRef = this.firebase.database().ref("usuarios");

    genteRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      console.log(this.usuarios);
    }).then(() => {
      this.espera = this.usuarios.filter(item => {

        return item.mesa == null;
      });

      this.atendidos = this.usuarios.filter(item => {

        return item.mesa != null;
      });


      

    });



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


  MostrarQr(correo)
  {

          this.cerrarqr=true;
          this.probandingg=false;

          this.qrScanner.prepare()
          .then((status: QRScannerStatus) => {

            if (status.authorized) {

              this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

                
               // alert(text);

                //if(text=="1")
                //{
                  alert("bienvenido,se relaciono al cliente con la mesa " + text)

                  var ref = this.firebase.database().ref("usuarios");
             
                  ref.on('value', function (snap) {
                      var data = snap.val();
                      for(var key in data){
                          if (correo == data[key].correo) {
                              data[key].mesa = text;
                             // this.clientovich = data[key].correo;
                              ref.child(key).update(data[key]);

                             
      
 
                          };                  
                      }
                  });

                  var refDos = this.firebase.database().ref("mesas");
             
                  refDos.on('value', function (snap) {
                      var data2 = snap.val();
                      for(var key2 in data2){
                          if (text == data2[key2].numeroMesa) {
                              data2[key2].cliente = correo;
                              refDos.child(key2).update(data2[key2]);
                             
                          };                  
                      }
                  });

              


              //  }




             

               // this.estado = "vertical-container";
              });

              this.qrScanner.show().then(() => {

                (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                //this.estado = "ocultar";
              });

            } else if (status.denied) {
           

            } else {
              
            }
          })
          .catch((e: any) => this.presentToast(e));


  }

  OcultarLectorQR() {

    this.qrScanner.hide().then(() => {

      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
      (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
      //(window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "#FDE8C9";
      //this.estado = "vertical-container";
      this.probandingg=true;
      this.cerrarqr=false;
    });

    this.scanSub.unsubscribe();
  }

  Modificar(correo)
  {
    alert("bienvenido,se relaciono al cliente con la mesa uno")

    var ref = this.firebase.database().ref("usuarios");
    
    ref.on('value', function (snap) {
        var data = snap.val();
        for(var key in data){
            if (correo == data[key].correo) {
                data[key].mesa = 1;
                ref.child(key).update(data[key]);/*SOLUTION*/
               
            };                  
        }
    });

    
  }

}
