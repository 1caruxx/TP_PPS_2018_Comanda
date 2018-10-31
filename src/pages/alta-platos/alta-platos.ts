import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from "firebase";
import { firebaseConfig } from '../../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import "firebase/firestore";
import { PedirPlatosPage } from '../pedir-platos/pedir-platos';
/**
 * Generated class for the AltaPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-alta-platos',
  templateUrl: 'alta-platos.html',
})
export class AltaPlatosPage {
  ocultar:boolean;
  mostrar:boolean;
  foto1:any;
  foto2:any;
  foto3:any;
  error:string;
  mostrarbtn1:boolean;
  mostrarbtn2:boolean;
  mostrarbtn3:boolean;
  mostrarfoto1:boolean;
  mostrarfoto2:boolean;
  public firebase = firebase;
  mostrarfoto3:boolean;
nombre="";
descripcion="";
tiempo="";
cantidad="";
precio="";
image1;
carga;
imageName1;
bebida:boolean;
plato:boolean;
platost:boolean;
bebidast:boolean;
cantMostrar:string="";
ocultarTiempo:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private aut:AngularFireAuth) {
    this.ocultar=false;
    this.mostrar=false;
    this.mostrarbtn1=true;
    this.mostrarbtn2=true;
    this.mostrarbtn3=true;
    this.mostrarfoto1=false;
    this.mostrarfoto2=false;
    this.mostrarfoto3=false;
    this.ocultarTiempo=false;

    //BORRAR ESTA LINEA ANTES DE HACER EL PUSH.
  this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
  }

  ionViewDidLoad() {
     
        AngularFireModule.initializeApp(firebaseConfig.fire);

    console.log('ionViewDidLoad AltaPlatosPage');
  }
  pedido()
  {
    this.navCtrl.push(PedirPlatosPage);


  }
  opcion()
  {
   
   
    if(this.carga =="platos")
    {
      this.cantMostrar ="grs";
      this.ocultarTiempo=false;

    }
    if(this.carga=="bebidas")
    {
      this.cantMostrar ="cc";
      this.ocultarTiempo=true;
      
    }
   
  }
 
  Fotos()
  {
    this.ocultar=true;
    this.mostrar=true;

  }
  Cancelar()
  {
    this.ocultar=false;
    this.mostrar=false;
    this.mostrarbtn1=true;
    this.mostrarfoto1=false;
    this.mostrarbtn2=true;
    this.mostrarfoto2=false;
    this.mostrarbtn3=true;
    this.mostrarfoto3=false;
  }
  async tomarFoto1()
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
      this.mostrarbtn1=false;
    this.mostrarfoto1=true;

   
      
    }, (err) => {
        console.log(err);
    });


    }
    catch(err)
    {

    }
    
  

   


  
  }
  tomarFoto2()
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
      this.mostrarbtn2=false;
    this.mostrarfoto2=true;

   
      
    }, (err) => {
        console.log(err);
    });


    }
    catch(err)
    {

    }
  }
  tomarFoto3()
  {

    
    try{

      this.camera.getPicture({

        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
    }).then((imageData) => {

      
      
   
      this.foto3 = "data:image/jpeg;base64," + imageData;
      this.mostrarbtn3=false;
    this.mostrarfoto3=true;
      
    }, (err) => {
        console.log(err);
    });


    }
    catch(err)
    {

    }
  }
  Cargar()
  {
    let carga:any;

    if(this.carga=="platos")
    {
       carga =
      {
        nombre:this.nombre,
        desc:this.descripcion,
        precio:this.precio,
        cant:this.cantidad,
        tiempo:this.tiempo,
      foto1:this.foto1,
        foto2:this.foto2,
        foto3:this.foto3,
        es:"plato"
      }; 
    }
      else
      {
        carga =
      {
        nombre:this.nombre,
        desc:this.descripcion,
        precio:this.precio,
        cant:this.cantidad,
        es:"bebida",
        foto1:this.foto1,
        foto2:this.foto2,
        foto3:this.foto3
    
      }; 

      }

    

    
        let mensaje = firebase.database().ref().child("platos");
      mensaje.push({carga});



  }
}

        

       
 

