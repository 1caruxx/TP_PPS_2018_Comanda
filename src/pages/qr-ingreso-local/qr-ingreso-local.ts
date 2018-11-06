import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';

/**
 * Generated class for the QrIngresoLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//FER EN LA LINEA 94 TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL.
@Component({
  selector: 'page-qr-ingreso-local',
  templateUrl: 'qr-ingreso-local.html',
})
export class QrIngresoLocalPage {
  correo:string;
  encuestas:any[]=[];
  mostrarAlert3:boolean=false;
  mensaje:string;
  desplegarEncuesta:boolean=false;
  claveActual;
foto1="";
foto2;
foto3;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth) {
    this.correo=localStorage.getItem("usuario");
   // this.foto1="assets/imgs/beta/comida.png";
    this.foto2="assets/imgs/beta/comida.png";
    this.foto3="assets/imgs/beta/comida.png";

    //this.correo =(JSON.parse(this.correo)).correo;
    this.correo="lucas@soylucas.com";
    //DESCOMENTAR PARA TRABAJAR A NIVEL LOCAL!!!!!!!
    this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");

    this.TraerEncuestas();
  }
  TraerEncuestas()
  {
    let mensaje = firebase.database().ref().child("encuestaCliente/");
 mensaje.once("value",(snap)=>{
 
var data =snap.val();
      
       this.encuestas=[];
        for(var key in data)
        {
          
            this.encuestas.push(data[key]);

      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrIngresoLocalPage');
  }
  leerQr()
  { 
    this.mensaje="Bienvenido!! Se ha anunciado con exito, en breve vendra el mozo a atenderlo";
  this.mostrarAlert3=true;
  this.desplegarEncuesta=true;
  setTimeout(()=>{

    this.mostrarAlert3=false;

  }, 3000);

    
    let usuariosRef = firebase.database().ref("usuarios");
    usuariosRef.once("value", (snap) => {

     let data = snap.val();
     let esValido = true;

     for (var key in data) {

       if (data[key].correo == this.correo) {
      
      let usuario= data[key];
      usuario.estado="espera";
      console.log(usuario);
     
   
      let usuariosRef = firebase.database().ref("usuarios/"+key);
      this.claveActual=key;
      usuariosRef.set(usuario).then(()=>{

     
    usuariosRef.on("value",(snap)=>{

      var data =snap.val();
      console.log(data);
      if(data.estado!="espera")
      {
        //FER EN ESTA LINEA TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL
        this.navCtrl.setRoot(RegistroClientePage);
      }
   
    });


        
      });
      
  
       }
     }
     

 });

  }

}
