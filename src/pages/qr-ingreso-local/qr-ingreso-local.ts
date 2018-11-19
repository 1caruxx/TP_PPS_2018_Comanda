import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
  nombreAnonimo:string="";
  mostrarAnonimo:boolean=false;
  comensales:number;
  foto:string="";
  imgAnonimo:string;
  correo:string;
  mostrarAlert2:boolean=true;
  encuestas:any[]=[];
  noHayEncuestas:boolean=false;
  mostrarAlert3:boolean=false;
  mensaje:string;
  desplegarEncuesta:boolean=false;
  claveActual;
foto1;
foto2;
foto3;
options : any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private authInstance: AngularFireAuth,
     private barcodeScanner: BarcodeScanner,
     private camera: Camera
    ) 
    {
      this.imgAnonimo ="assets/imgs/beta/anonimo.png";
      //ANTES DE SUBIR A GITHUB  DESCOMENTO STAS LINEAS:
  
  // this.correo="lucas@soylucas.com";
    //DESCOMENTAR PARA TRABAJAR A NIVEL LOCAL!!!!!!!
 // this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");

    this.TraerEncuestas();
  }
  TraerEncuestas()
  {
    console.log("En traer ecnuesta");
    let mensaje = firebase.database().ref().child("encuestaCliente/");
 mensaje.once("value",(snap)=>{
 
var data =snap.val();
console.log("Dentro de observable ecnuesta");

       this.encuestas=[];
        for(var key in data)
        {
          
            this.encuestas.push(data[key]);
          console.log(data);
        }
        console.log(this.encuestas);
        if(this.encuestas.length < 1)
        {
          this.noHayEncuestas=true;
          this.desplegarEncuesta=false;
          console.log(this.noHayEncuestas);
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrIngresoLocalPage');
  }
  leerQr()
  {
    
  
      
    
    
    this.correo=localStorage.getItem("usuario");
  
 
     this.correo =(JSON.parse(this.correo)).correo;
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
            usuario.comensales=this.comensales;
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
  ValidarNumero(numero: string) {

    let arrayNumero = numero.split("");

    for (let caracter of arrayNumero) {

      if (isNaN(parseInt(caracter))) {

        return false;
      }
    }

    return true;
  }
  tomarFoto()
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

      
      
      this.foto= "data:image/jpeg;base64," + imageData;
     
      this.imgAnonimo=this.foto;
      
    }, (err) => {
        console.log(err);
    });


    }
    catch(err)
    {

    }
    
  

   




  
  }
  AceptarAlert2()
  {
    if(this.comensales< 1)
    {
      this.mensaje="La cantidad de comensales mínima es de 1";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;
   
    }
    if(this.comensales> 8)
    {
      this.mensaje="La cantidad de comensales máxima es de 8";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;
    }
    if(!this.comensales)
    {
      this.mensaje="Debe ingresar un número";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;

    }
    this.mostrarAlert2=false;

    console.log(localStorage.getItem("anonimo").toString());
   
    if(  localStorage.getItem("anonimo")=="true")
    {
    
      this.mostrarAnonimo=true;

    }

  }

  aceptarAnonimo()
  {
    if(!this.nombreAnonimo)
    {
      this.mensaje="Debe ingresar un nombre";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;
    }
    if(this.ValidarNumero(this.comensales.toString()))
    {

this.mensaje="Debe ingresar solo números";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;
    }
    if(!this.foto)
    {
      this.mensaje="Debe tomar una foto";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        this.comensales=undefined;
       
    
      },2000);
      return;
    }

    this.mostrarAnonimo=false;

    //Guardo el anonimo en firebase
    let usuariosRef = firebase.database().ref("usuarios/");
  let raiz=  usuariosRef.push({nombre:this.nombreAnonimo, tipo:"anonimo", img:this.foto}).key;
  let ref2= firebase.database().ref("usuarios/"+raiz);
  ref2.update({correo:raiz});
  let unUsuario =
  {
    nombre:this.nombreAnonimo,
    tipo:"anonimo",
    img:this.foto,
    correo:raiz
  }
  localStorage.setItem("usuario",JSON.stringify(unUsuario));

  }
}
