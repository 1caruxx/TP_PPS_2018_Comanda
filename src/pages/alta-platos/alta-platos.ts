import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from "firebase";
import { firebaseConfig } from '../../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import "firebase/firestore";
import { PedirPlatosPage } from '../pedir-platos/pedir-platos';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
  foto1:any="";
  foto2:any="";
  foto3:any="";
  error:string;
  cocineroBebida:boolean=false;
  mostrarbtn1:boolean;
  mostrarbtn2:boolean;
  mostrarbtn3:boolean;
  mostrarfoto1:boolean;
  mostrarfoto2:boolean;
  bloquearBotones:boolean=false;
  esCocinero:boolean=false;
  esBartender:boolean=false;
  tipo;
  ocultarQr:boolean=true;
  mensaje;
  mostrarAlert3:boolean=false;
  tipoBebida="";
  public firebase = firebase;
  mostrarfoto3:boolean;
nombre;
descripcion;

tiempo;
cantidad;
precio;
image1;
carga;
options : any;
imageName1;
bebida:boolean;
plato:boolean;
platost:boolean;
bebidast:boolean;
cantMostrar;
ocultarTiempo:boolean;
mostrarSpinner:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     private camera: Camera,
      private aut:AngularFireAuth,
      private barcodeScanner: BarcodeScanner

    ) {
    this.ocultar=false;
    this.mostrar=false;
    this.mostrarbtn1=true;
    this.mostrarbtn2=true;
    this.mostrarbtn3=true;
    this.mostrarfoto1=false;
    this.mostrarfoto2=false;
    this.mostrarfoto3=false;
    this.ocultarTiempo=false;
    this.carga="platos";

    //Descomentar esta linea antes de hacer el push
   this.tipo = localStorage.getItem("usuario");
   this.tipo =JSON.parse(this.tipo).tipo;

   this.cantMostrar="grs";
 //this.tipo ="cocinero";
 
  
    if(this.tipo=="cocinero")
    {
      this.esCocinero=true;

    }
    else
    {
      this.esBartender=true;
      this.ocultarTiempo=true;
    }
  
    //BORRAR ESTA LINEA ANTES DE HACER EL PUSH.
  //this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
  }

  ionViewDidLoad() {
     
       // AngularFireModule.initializeApp(firebaseConfig.fire);

    console.log('ionViewDidLoad AltaPlatosPage');
  }
  pedido()
  {
    /*if(this.tipo=="cocinero")
    {
      this.tipo="bartender";
      this.esCocinero=false;
      this.esBartender=true;
     
    }
    else
    {
      this.tipo="cocinero";
      this.esBartender=false;
      this.esCocinero=true;
     
    }
  
*/

  }
  opcion(valor)
  {
   if(valor=="salir")
   {
     return;
   }
   
    if(this.carga =="platos")
    {
      this.cantMostrar ="grs";
      this.ocultarTiempo=false;
      this.cocineroBebida=false;
      this.tiempo="";
      this.precio="";
      this.cantidad="";
      this.nombre="";
      this.descripcion="";
      this.ocultarQr=true;
      this.mostrarbtn1=true;
      this.mostrarfoto1=false;
      this.mostrarbtn2=true;
      this.mostrarfoto2=false;
      this.mostrarbtn3=true;
      this.mostrarfoto3=false;
    }
    if(this.carga=="bebidas")
    {
      this.cantMostrar ="cent. cúbicos";
      this.ocultarTiempo=true;
      this.cocineroBebida=true;
      this.tiempo="";
      this.precio="";
      this.cantidad="";
      this.nombre="";
      this.descripcion="";
      this.ocultarQr=false;
      this.mostrarbtn1=true;
      this.mostrarfoto1=false;
      this.mostrarbtn2=true;
      this.mostrarfoto2=false;
      this.mostrarbtn3=true;
      this.mostrarfoto3=false;

    }
   
  }
 
  Fotos()
  {
    this.ocultar=true;
    this.mostrar=true;

  }
  Atras()
  {
    this.navCtrl.pop();
  }
  LeerQr()
  {
    this.options = { prompt : "Escaneá el qr del producto", formats: 'QR_CODE' }

   

    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      let texto = (barcodeData.text);
   
      let miScan= (texto).split('@');

      if(miScan[5]==undefined)
      {
        this.mensaje="QR no válido";
        this.mostrarAlert3=true;
      
        setTimeout(()=>{
      
          this.mostrarAlert3=false;
          
      
        }, 3000);
      return      
      }
      if(miScan[5]!="true")
      {
    
        this.mensaje="QR no válido";
        this.mostrarAlert3=true;
      
        setTimeout(()=>{
      
          this.mostrarAlert3=false;
          
      
        }, 3000);
      return 
      
  
      }

      this.nombre= miScan[0];
      this.descripcion= miScan[1];
  
      this.cantidad=miScan[3];
      this.precio=miScan[4];
    //  this.tipoBebida=miScan[6];

    });
  
     

  

  }
  Cancelar()
  {
    if(this.bloquearBotones)
    {
      return;
    }
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
     if(this.bloquearBotones)
    {
      return;
    }
  
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
    if(this.bloquearBotones)
    {
      return;
    }
    
    
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
    if(this.bloquearBotones)
    {
      return;
    }
    
    try{

      this.camera.getPicture({

        destinationType: this.camera.DestinationType.DATA_URL,
        quality:50,
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
    if(this.bloquearBotones)
    {
      return;
    }
    this.bloquearBotones=true;
    let carga:any;

  
    if(this.tipo=="cocinero")
    {
     
      
      //valido cocinero
      if(this.carga=="bebidas")
      {
       
        
      
        if(!this.nombre|| !this.precio || !this.cantidad  ||!this.descripcion)
        {
          this.mensaje="Todos los campos son obligatorios";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;
          }, 3000);
          return;
        }

    /*    if(this.tipoBebida=="")
        {
          this.mensaje="Debe indicar que tipo de bebida cargara";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
          }, 3000);
          return;
        }*/
        if (!this.ValidarNumero(this.cantidad)) {

          
          this.mensaje="La cantidad ingresada debe ser un numero";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if(parseInt(this.cantidad)>5000)
        {
          this.mensaje="La cantidad ingresada es demasiado alta";
          this.cantidad=undefined;
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if (!this.ValidarNumero(this.precio)) {
       
          this.mensaje="El precio ingresado debe ser un numero";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
    
          return;
        }
        if (parseInt(this.precio)>5000) {
       
          this.mensaje="El precio ingresado es demasiado alto";
          this.precio=undefined;
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
    
          return;
        }
        if(this.foto1===""||this.foto2==""||this.foto3=="")
        {
          this.mensaje="Las fotos son obligatorias";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;

        }
        //valido los campos de cocinero para bebidas
      }
      else
      {
       
        if(!this.nombre|| !this.precio || !this.cantidad ||!this.tiempo ||!this.descripcion)
        {
          this.mensaje="Todos los campos son obligatorios";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if (!this.ValidarNumero(this.cantidad)) {
          this.mensaje="La cantidad ingresada debe ser un numero";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if (!this.ValidarNumero(this.precio)) {
          this.mensaje="El precio ingresado debe ser un numero";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if (!this.ValidarNumero(this.tiempo)) {
          this.mensaje="El tiempo ingresado debe ser un numero";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if(parseInt(this.cantidad)>5000)
        {
          this.mensaje="La cantidad ingresada es demasiado alta";
          this.cantidad=undefined;
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;
        }
        if (parseInt(this.precio)>5000) {
       
          this.mensaje="El precio ingresado es demasiado alto";
          this.precio=undefined;
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
    
          return;
        }
        if (parseInt(this.tiempo)>150) {
       
          this.mensaje="El tiempo ingresado es demasiado alto";
          this.tiempo=undefined;
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
    
          return;
        }
        if(this.foto1===""||this.foto2==""||this.foto3=="")
        {
          this.mensaje="Las fotos son obligatorias";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;

        }
    

    }
      this.mostrarSpinner=true;

      let pedidoRef = firebase.database().ref("platos");
      pedidoRef.once("value", (snap) => {
  
        let data = snap.val();
        let esValido = true;
  
        for (let item in data) {
  
          if(this.carga=="bebidas")
          { 
            if (data[item].carga.nombre == this.nombre)
            {
          
              
                this.mostrarSpinner=false;
                this.mensaje="La bebida que intenta cargar ya esta existe intente con otro nombre.";
                this.mostrarAlert3=true;
                setTimeout(()=>{
      
                  this.mostrarAlert3=false;
                  this.bloquearBotones=false;

                }, 3000);
                esValido = false;

              
             
           
              

            }
          }
          else
          {
            if (data[item].carga.nombre == this.nombre) {
  
              this.mostrarSpinner=false;
              this.mensaje="El nombre del plato   que intenta cargar ya existe  intente con otro nombre.";
              this.mostrarAlert3=true;
              setTimeout(()=>{
    
                this.mostrarAlert3=false;
                this.bloquearBotones=false;

              }, 3000);
              esValido = false;
           
              break;
            }

          }
   
        }
        if(esValido)
        {
          if(this.carga=="bebidas")
          {
            carga =
          {
                  nombre:this.nombre,
                  desc:this.descripcion,
                  precio:parseFloat(this.precio),
                  cant:parseInt(this.cantidad),
                  
                foto1:this.foto1,
                  foto2:this.foto2,
                  foto3:this.foto3,
                  es:"bebida",
                  para:"cocinero"
                  }; 
                  let mensaje = firebase.database().ref().child("platos");
                  mensaje.push({carga}).then(()=>{
                    this.mostrarSpinner=false;
                    this.mensaje="La bebida se cargo exitósamente";
                    this.mostrarAlert3=true;
                    setTimeout(()=>{
                      this.tiempo="";
                      this.precio="";
                      this.cantidad="";
                      this.nombre="";
                      this.descripcion="";
                      this.tipoBebida="";
                      this.mostrarbtn1=true;
                      this.mostrarfoto1=false;
                      this.mostrarbtn2=true;
                      this.mostrarfoto2=false;
                      this.mostrarbtn3=true;
                      this.mostrarfoto3=false;
                      this.mostrarAlert3=false;
                      this.bloquearBotones=false;

                    }, 3000);
                  
                  });
  
          }
          else
          {
            carga =
        {
          nombre:this.nombre,
          desc:this.descripcion,
          precio:parseFloat(this.precio),
          cant:parseInt(this.cantidad),
          tiempo:parseInt(this.tiempo),
        foto1:this.foto1,
          foto2:this.foto2,
          foto3:this.foto3,
          es:"plato",
          para:"cocinero"
        }; 
        let mensaje = firebase.database().ref().child("platos");
        mensaje.push({carga}).then(()=>{
          
          this.mostrarSpinner=false;
          this.mensaje="El plato se cargo exitósamente";
          this.mostrarAlert3=true;
          setTimeout(()=>{
            this.tiempo="";
            this.precio="";
            this.cantidad="";
            this.nombre="";
            this.descripcion="";
            this.tipoBebida="";
            this.mostrarbtn1=true;
            this.mostrarfoto1=false;
            this.mostrarbtn2=true;
            this.mostrarfoto2=false;
            this.mostrarbtn3=true;
            this.mostrarfoto3=false;
            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
      
      
      });
  
          }
  
  
        }
        });
  

    } 
    else
    {
      
      
      //VALIDO TODO LO DEL BARTENDER!!!!!!
      if(!this.nombre|| !this.precio || !this.cantidad  ||!this.descripcion)
      {
        this.mensaje="Todos los campos son obligatorios";
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.bloquearBotones=false;

        }, 3000);
        return;
      }

      if (!this.ValidarNumero(this.precio)) {
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.bloquearBotones=false;

        }, 3000);
        return;
      }
      if (parseInt(this.precio)>5000) {
       
        this.mensaje="El precio ingresado es demasiado alto";
        this.precio=undefined;
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.bloquearBotones=false;

        }, 3000);
  
        return;
      }
      if (!this.ValidarNumero(this.cantidad)) {
        this.mensaje="La cántidad ingresado debe ser un número";
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.bloquearBotones=false;

        }, 3000);
        return;
      }
      if (parseInt(this.cantidad)>3000) {
       
        this.mensaje="Los centímetros cúbicos  ingresados son demasiados";
        this.cantidad=undefined;
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.bloquearBotones=false;

        }, 3000);
  
        return;
      }
      if(this.foto1===""||this.foto2==""||this.foto3=="")
        {
          this.mensaje="Las fotos son obligatorias";
          this.mostrarAlert3=true;
          setTimeout(()=>{

            this.mostrarAlert3=false;
            this.bloquearBotones=false;

          }, 3000);
          return;

        }
      //VALIDO EL NOMBRE EN LA BASE DE DATOS
      this.mostrarSpinner=true;
      let pedidoRef = firebase.database().ref("platos");
      pedidoRef.once("value", (snap) => {
  
        let data = snap.val();
        let esValido = true;
  
        for (let item in data) {
  
          if (data[item].carga.nombre == this.nombre) {
  
            this.mostrarSpinner=false;
            this.mensaje="El nombre de la bebida o trago que intenta cargar ya existe  utilize otro por favor.";
            
            this.mostrarAlert3=true;
            setTimeout(()=>{
  
              this.mostrarAlert3=false;
              this.bloquearBotones=false;

            }, 3000);
            esValido = false;
         
            break;
          }
        }
        if(esValido)
        {
          carga =
          {
                  nombre:this.nombre,
                  desc:this.descripcion,
                  precio:parseFloat(this.precio),
                  cant:parseInt(this.cantidad),
                  
                foto1:this.foto1,
                  foto2:this.foto2,
                  foto3:this.foto3,
                  es:"bebida",
                  para:"bartender"
                  }; 
                  let mensaje = firebase.database().ref().child("platos");
                  mensaje.push({carga}).then(()=>{
                    this.mostrarSpinner=false;
                    this.mensaje="La bebida se cargo exitósamente";
                    this.mostrarAlert3=true;
                    setTimeout(()=>{
                      this.tiempo="";
                      this.precio="";
                      this.cantidad="";
                      this.nombre="";
                      this.descripcion="";
                      this.mostrarbtn1=true;
                      this.mostrarfoto1=false;
                      this.mostrarbtn2=true;
                      this.mostrarfoto2=false;
                      this.mostrarbtn3=true;
                      this.mostrarfoto3=false;
                      this.tipoBebida="";
                      this.mostrarAlert3=false;
                      this.bloquearBotones=false;

                    }, 3000);
                  
                  });
  
  
        }

      });

      //VALIDO TOOD LO DEL BARTENDER:


    }
  
  
     
      /*  else
        {
          carga =
      {
        nombre:this.nombre,
        desc:this.descripcion,
        precio:parseFloat(this.precio),
        cant:parseInt(this.cantidad),
        tiempo:parseInt(this.tiempo),
      foto1:this.foto1,
        foto2:this.foto2,
        foto3:this.foto3,
        es:"plato",
        para:"cocinero"
      }; 

        }
        let mensaje = firebase.database().ref().child("platos");
        mensaje.push({carga});

      }
      else
      {
        //Valido bartender
        carga =
      {
        nombre:this.nombre,
        desc:this.descripcion,
        precio:this.precio,
        cant:this.cantidad,
        es:"bebida",
        foto1:this.foto1,
        foto2:this.foto2,
        foto3:this.foto3,
        para:"bartender"
    
      }; 

      }

    

    
        let mensaje = firebase.database().ref().child("platos");
      mensaje.push({carga});


*/
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
}

        

       
 

