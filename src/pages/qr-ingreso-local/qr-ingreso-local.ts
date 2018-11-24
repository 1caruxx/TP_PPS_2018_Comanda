import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
import { PrincipalPage } from '../principal/principal';


/**
 * Generated class for the QrIngresoLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//FER EN LA LINEA 145 TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL.
@Component({
  selector: 'page-qr-ingreso-local',
  templateUrl: 'qr-ingreso-local.html',
})
export class QrIngresoLocalPage {
  nombreAnonimo:string="";
  tieneReserva:boolean=false;
  mesa;
  public moment = moment;
  mostrarAnonimo:boolean=false;
  comensales:number;
  desplegarHeader:boolean=false;
  //EL VALOR DE ESTE STRING FOTO DEBE SER VACIO
  foto:string="";
  imgAnonimo:string;
  correo:string;
  mostrarAlert2:boolean=false;
  encuestas:any[]=[];
  mostrarEncuestasVacias:boolean=false;
  maximaMesa:number=0;

  noHayEncuestas:boolean=false;
  mostrarAlert3:boolean=false;
  mensaje:string;
  mostrarMiSpinner:boolean=true;
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
 //this.VerificarReserva();
    this.TraerEncuestas();

   
this.ObtenerMesaMaxima();   
    if(  localStorage.getItem("anonimo")=="true")
    {
    
      this.mostrarAnonimo=true;
      this.mostrarMiSpinner=false;
     this.desplegarHeader = false;

    }
    else
    {
      //Aca hago lo otro si no es anonimo
     // this.VerificarReserva();
     this.desplegarHeader=true;
     this.VerificarEstado();
    }
  }
  Atras()
  {
    this.navCtrl.pop();
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

          this.mostrarEncuestasVacias=true;
        //  this.noHayEncuestas=true;
          //this.desplegarEncuesta=false;
          console.log(this.noHayEncuestas);
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrIngresoLocalPage');
  }

  leerQr()
  {

   
    
  
      
    if(this.tieneReserva)
    {
      this.correo=localStorage.getItem("usuario");
  
 
     this.correo =(JSON.parse(this.correo)).correo;
    this.options = { prompt : "Escaneá el qr de la puerta", formats: 'QR_CODE' }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
        let miScan = (barcodeData.text);


        if(barcodeData.text==="bienvenido")
        {
          this.mensaje="Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
          this.mostrarAlert3=true;
          
            //Si es bienvenido y adémas no hay encuestas muestro la pagina negra y el relog de arena 
          
            if(this.mostrarEncuestasVacias)
            {
              this.noHayEncuestas=true;
              this.desplegarEncuesta=false;

            }
            else
            {
              this.desplegarEncuesta=true;
              this.noHayEncuestas=false;
            }



          this.desplegarHeader=false;
          setTimeout(()=>{
        
            this.mostrarAlert3=false;
            
        
          }, 4500);


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
            usuario.mesa=this.mesa;
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
              this.navCtrl.setRoot(PrincipalPage);
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
    else
    {
      this.correo=localStorage.getItem("usuario");
  
 
     this.correo =(JSON.parse(this.correo)).correo;
    this.options = { prompt : "Escaneá el qr de la puerta", formats: 'QR_CODE' }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
        let miScan = (barcodeData.text);


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
              this.navCtrl.setRoot(PrincipalPage);
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
        targetWidth: 300,
        targetHeight: 300,
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
    if(this.maximaMesa==0)
    {
      this.mensaje="No hay mesas cargadas en el salón";
      this.mostrarAlert3=true;
    
      setTimeout(()=>{
        
        this.mostrarAlert3=false;
        
       
    
      },2000);
      return;

    }
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
    if(this.comensales> this.maximaMesa)
    {
      this.mensaje="La cantidad de comensales máxima es de "+ this.maximaMesa;
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

 /*   console.log(localStorage.getItem("anonimo").toString());
   
    if(  localStorage.getItem("anonimo")=="true")
    {
    
      this.mostrarAnonimo=true;

    }*/

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
  this.mostrarAlert2=true;

  }
  
  VerificarReserva()
  {
      
    this.correo=localStorage.getItem("usuario");
  
 
     this.correo =(JSON.parse(this.correo)).correo;

    let usuariosRef = firebase.database().ref("reservas");
    usuariosRef.once("value", (snap) => {
      console.log("En verificar Reserva");

      let data = snap.val();
      let esValido = true;
    let hayReserva:boolean=false;
      for (var key in data) {

        console.log("reservas:" +data[key]);
        //Verifico si hay una reserva confirmada
        if(data[key].estado=="confirmada" && data[key].correo==this.correo)
        {
          console.log("Este cliente tiene reservaaaa");
    
          let momentoReserva:any = moment(data[key].horario, "DD/MM/YYYY HH:mm");
          console.log(momentoReserva);
          let momentoActual:any = moment(new Date(), "DD/MM/YYYY HH:mm");
          console.log(momentoActual);
         console.log( Math.abs(momentoActual.diff(momentoReserva, "m")));
        // if(Math.abs(momentoReserva.diff(momentoActual, "m")) <= 40)
        if(momentoReserva.diff(momentoActual, "m")>-40 && momentoReserva.diff(momentoActual, "m")<20) 
        {
          hayReserva=true;
           this.tieneReserva=true;
           this.mesa = data[key].mesa;
          this.comensales=data[key].cantidadPersonas;
          this.mostrarAlert2=false;
          this.mostrarMiSpinner=false;

          return;
         
         }
         else
         {
           console.log("Pero la reserva es de mas tarde no de ahoraa");
           this.mostrarMiSpinner=false;
           this.mostrarAlert2=true;
           return;
         }
            //Aca debo restar el momento actual menos el de la reserva 

            //si es menor a 50 
            //Cambio el estado a espera
        }
    


        }
    

        if(!hayReserva)
        {
          this.mostrarMiSpinner=false;

          this.mostrarAlert2=true;
          return
          

        }


    });
 

  }
  ObtenerMesaMaxima()
  {
    let mesaMaxima:number=0;

    let usuariosRef = firebase.database().ref("mesas");
    usuariosRef.once("value", (snap) => {
      
      let data = snap.val();
      let esValido = true;
    let hayReserva:boolean=false;
      for (var key in data) {

        if(data[key].cantidadComensales>mesaMaxima)
        {
          mesaMaxima = data[key].cantidadComensales;

        }

      }
      this.maximaMesa =mesaMaxima;

      
    });

  }
  VerificarEstado()
  {

    this.correo=localStorage.getItem("usuario");
  
 
     this.correo =(JSON.parse(this.correo)).correo;
    let usuariosRef = firebase.database().ref("usuarios");
    usuariosRef.once("value", (snap) => {
      console.log("En verificar estado");

     let data = snap.val();
     let esValido = true;

     for (var key in data) {

       if (data[key].correo == this.correo) {
      

        //Pregunto si esta seteado el estado para que no pinche la app
        if(data[key].estado)
        {

          //Si ese estado que ahora se que esta seteado por que estoy dentro del if 
          //es en espera directamente le muestro las encuestas de usuarios
          if(data[key].estado=="espera")
          { 

            if(this.mostrarEncuestasVacias)
            {

              this.noHayEncuestas=true;
              this.desplegarEncuesta=false;
              this.desplegarHeader=false;
              this.mostrarMiSpinner=false;

            }
            else
            {
              this.mostrarMiSpinner=false;
              this.desplegarEncuesta=true;
              this.desplegarHeader=false;
            }
           

          }
          else
          {
            this.VerificarReserva();
          }

        }
        else
        {
          this.VerificarReserva();
        }
       



       }
      }
    }).catch(()=>console.log("por las dudas"));

  }
}
