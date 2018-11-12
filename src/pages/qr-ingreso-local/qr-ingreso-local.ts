import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the QrIngresoLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//FER EN LA LINEA 120 TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL.
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
options : any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private authInstance: AngularFireAuth,
     private barcodeScanner: BarcodeScanner
    ) 
    {
      //ANTES DE SUBIR A GITHUB  DESCOMENTO STAS LINEAS:
    this.correo=localStorage.getItem("usuario");
   /* this.foto1="assets/imgs/beta/comida.png";
    this.foto2="assets/imgs/beta/comida.png";
    this.foto3="assets/imgs/beta/comida.png";*/

    this.correo =(JSON.parse(this.correo)).correo;
  // this.correo="lucas@soylucas.com";
    //DESCOMENTAR PARA TRABAJAR A NIVEL LOCAL!!!!!!!
  // this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");

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
    this.options = { prompt : "Escaneá el qr de la puerta", formats: 'QR_CODE' }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
        let miScan = (barcodeData.text);

        alert(miScan);
        if(barcodeData.text==="bienvenido")
        {
          this.mensaje="Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
          this.mostrarAlert3=true;
          this.desplegarEncuesta=true;
          setTimeout(()=>{
        
            this.mostrarAlert3=false;
            
        
          }, 3000);


          //Aca cambio el estado del usuario y escucho al cambio d este estado
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
        else
        {
          this.mensaje="Qr no valido";
          this.mostrarAlert3=true;
          
          setTimeout(()=>{
        
            this.mostrarAlert3=false;
            return;
        
          }, 3000);
        }
    }, (error) => {
        //this.errorHandler.mostrarErrorLiteral(error);
    });

   

    
   

  }

}
