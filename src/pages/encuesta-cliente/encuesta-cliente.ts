import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PedirPlatosPage } from '../pedir-platos/pedir-platos';

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

  cliente:string;
 ocultar:boolean;
 ocultar2:boolean;
 ocultar3:boolean;
 ocultar4:boolean;
 ocultar5:boolean;
 ocultar6:boolean;
 resp1;
 resp2;
 resp3comodidad=false;
 resp3platos=false;
 resp3precios=false;
 resp3atencion=false;
 resp4;
 resp5="";
foto1:string="";
foto2:string="";
foto3:string="";
mostrarfoto1:boolean;
ocultarBoton1:boolean;
ocultarBoton2:boolean;
ocultarBoton3:boolean;
mostrarfoto2:boolean;
mostrarfoto3:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,  private aut:AngularFireAuth) {
    this.ocultar=true;
    this.ocultar2=true;
    this.ocultar3=true;
    this.ocultar4=true;
    this.ocultar5=true;
    this.ocultarBoton1=false;
    this.ocultarBoton2=false;
    this.ocultarBoton3=false;
    this.ocultar6=true;
   
    this.mostrarfoto1=false;
    this.mostrarfoto2=false;
    this.mostrarfoto3=false;

    //setear esta variable con el cliente sacado del local storage
    this.cliente ="yoCliente";
    this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaClientePage');
  }
  pregunta1()
  {
    this.ocultar=false;
    
    
  
  }
  irA()
  {
    this.navCtrl.push(PedirPlatosPage);
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
    console.log(this.resp1);
   console.log(this.resp2);
 
   console.log(this.resp3comodidad);
   
   console.log(this.resp3platos);
   console.log(this.resp3precios);
   console.log(this.resp3atencion);
   console.log(this.resp4);
   console.log(this.resp5);

  }
  Foto1()
  {
    
    try{

      this.camera.getPicture({
        quality:50,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 400,
        targetHeight: 400,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
    }).then((imageData) => {

      
      
      this.foto1 = "data:image/jpeg;base64," + imageData;
   
      this.mostrarfoto1=true;
      this.ocultarBoton1=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

  }

  }
  Foto2()
  {
    
    try{

      this.camera.getPicture({
        quality:50,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 400,
        targetHeight: 400,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
    }).then((imageData) => {

      
      
      this.foto2 = "data:image/jpeg;base64," + imageData;
   
      this.mostrarfoto2=true;
      this.ocultarBoton2=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

  }
  }
  Foto3()
  {
    try{

      this.camera.getPicture({
        quality:50,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 400,
        targetHeight: 400,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
    }).then((imageData) => {

      
      
      this.foto3 = "data:image/jpeg;base64," + imageData;
   
      this.mostrarfoto3=true;
      this.ocultarBoton3=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

  }
  
  }

  SubirEncuesta()
  {


    let carga=
    {
      preg1:this.resp1,
      preg2:this.resp2,
      preg3:this.resp3platos+"-"+this.resp3comodidad+"-"+this.resp3precios+"-"+this.resp3atencion,
      preg4:this.resp4,
      preg5:this.resp5,
      foto1:this.foto1,
      foto2:this.foto2,
      foto3:this.foto3
    };
    let mensaje = firebase.database().ref().child("encuestaCliente/"+this.cliente);
    mensaje.push(carga);

  }
}
