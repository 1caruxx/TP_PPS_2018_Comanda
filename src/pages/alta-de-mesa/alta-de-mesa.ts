import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

//NANANANAN MUY CLAVE ESTE COMENTARIOOOOOOOOOOOOOO
//LINEA 288 Y 291 FERNII

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

  public usuario;
  
  public mesas: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth,private toastCtrl: ToastController,private camera: Camera)
   {
    //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
    this.foto="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg";


    this.probandingg=true;

    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    this.mesas = [];

    let mesasRef = this.firebase.database().ref("mesas");

    mesasRef.once("value", (snap) => {

      let data = snap.val();

      for(let a in data)
      {
        this.mesas.push(data[a]);
        //console.log(data[a].numeroMesa);
      }

      this.mesas = this.mesas.sort((a, b) => {
        return a.numero - b.numero;
      });




    });


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

    //if(this.numeroMesa < 1 || this.numeroMesa > 10)
    if(this.numeroMesa==1||this.numeroMesa==2||this.numeroMesa==3||this.numeroMesa==4||this.numeroMesa==5||this.numeroMesa==6||this.numeroMesa==7||this.numeroMesa==8||this.numeroMesa==9||this.numeroMesa==10)
    {
      //this.presentToast("Solo tenemos lugar para 10 mesas en el restaurante")
      //return;
    }

    else
    {
      this.presentToast("Solo tenemos lugar para mesas del 1 al 10 en el restaurante.")
      return;
    }

    //if(this.cantidadComensales < 1 || this.cantidadComensales > 8)
    if(this.cantidadComensales==1 || this.cantidadComensales==2 || this.cantidadComensales==3 || this.cantidadComensales==4 || this.cantidadComensales==5 || this.cantidadComensales==6 || this.cantidadComensales==7 || this.cantidadComensales==8)
    {
      //this.presentToast("Los comensales solo pueden ser de 1 a 8")
     // return;
    }

    else
    {
      this.presentToast("Los comensales solo pueden ser de 1 a 8.")
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

          this.presentToast("Esa mesa ya ha sido registrada.");
          this.esValido = false;
          //break;
        }
      }


      if(this.foto=="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg" && this.esValido)
      {
        let url="";

        url="../../assets/imgs/gamma/llama.jpeg"

        let mesasRef = this.firebase.database().ref("mesas");

        mesasRef.push({
          numeroMesa: this.numeroMesa,
          cantidadComensales: this.cantidadComensales,
          tipo: this.tipo,
          estado: "libre",
          img: url
        }).then(() => 
        {
         
          this.numeroMesa="";
          this.cantidadComensales="";
          this.foto="";
          this.presentToast("La mesa fue cargada con éxito.");

        });;


        
      }


      if (this.esValido && this.foto != "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg") 
      {
        let mesasRef = this.firebase.database().ref("mesas");


        let pictures = this.firebase.storage().ref(`mesas/${this.nombreFoto+"mesaNumero:"+this.numeroMesa}`);

        pictures.putString(this.foto, "data_url").then(() => {

          pictures.getDownloadURL().then((url) => {

            mesasRef.push({
              numeroMesa: this.numeroMesa,
              cantidadComensales: this.cantidadComensales,
              tipo: this.tipo,
              estado: "libre",
              img: url
            }).then(() => 
            {
             
              this.numeroMesa="";
              this.cantidadComensales="";
              this.foto="";
            });;

            
          });




        });


        

  
      }



      

    });

   /* if (this.esValido) {
          let mesasRef = this.firebase.database().ref("mesas");


          let pictures = this.firebase.storage().ref(`mesas/${this.nombreFoto+"mesaNumero:"+this.numeroMesa}`);

          pictures.putString(this.foto, "data_url").then(() => {

            pictures.getDownloadURL().then((url) => {

              mesasRef.push({
                numeroMesa: this.numeroMesa,
                cantidadComensales: this.cantidadComensales,
                tipo: this.tipo,
                estado: "libre",
                img: url
              }).then(() => 
              {
               
                this.numeroMesa="";
                this.cantidadComensales="";
                this.foto="";
              });;

              
            });




          });


          

    
        }*/
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
    /*
   
this.cerrarqr=true;
this.probandingg=false;

this.qrScanner.prepare()
.then((status: QRScannerStatus) => {

  if (status.authorized) {

    this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

     
      alert(text);
     
      

      this.estado = "vertical-container";
    });

    this.qrScanner.show().then(() => {

      (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
      (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
      (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
      this.estado = "ocultar";
    });

  } else if (status.denied) {
   

  } else {
   
  }
})
.catch((e: any) => this.presentToast(e));

*/



  }

  OcultarLectorQR() {
    /*

    this.qrScanner.hide().then(() => {

      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
      (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
      
      this.estado = "vertical-container";
      this.probandingg=true;
      this.cerrarqr=false;
    });

    this.scanSub.unsubscribe();
    */
  }

  Logout() 
  {

    

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {

              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            
          });

          break;
        }
      }
    });
  }


  volver()
  {
	this.navCtrl.pop();
  }


  




   





}
