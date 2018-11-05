import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegistroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for m
 * import { BarcodeScanner } from '@ionic-native/barcode-scanner';ore info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})
export class RegistroClientePage {
  nombre:string;
  apellido:string;
  dni:number;
  correo:string;
  clase:string;
  pass:string;
  formReg:boolean;
  formInicial:boolean;
  formAnon:boolean;
  foto:string="";
  scanedCode;
  miScan = {};
  options : any;
  ocultarContenido:boolean;
  public scanSub;
  mostrarAlert:boolean=false;
  ocultarCabecera:boolean;
  constructor
  (
    public navCtrl: NavController,
     public navParams: NavParams,  
     private authInstance: AngularFireAuth,
     private camera: Camera,
 
      private barcodeScanner: BarcodeScanner,
      private toastCtrl: ToastController,
      private alertCtrl: AlertController
  ) 
  {
    this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
      this.formReg =false;
      this.formInicial=true;
      this.formAnon=false;
      this.ocultarContenido=false;
      this.ocultarCabecera=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroClientePage');
  }
  Registrar()
  {
    //Valido los campos que no esten vacios

    if (!this.correo || !this.pass || !this.nombre || !this.apellido || !this.dni ) {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }
    let usuariosRef = firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let item in data) {

        if (data[item].dni == this.dni) {

          this.presentToast("El DNI ingresado es de  otro usuario registrado.");
          esValido = false;
       
          break;
        }
      }

      if (esValido) {

        let correo = this.correo.toLowerCase();

        this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
          .then(() => {

        
          

              usuariosRef.push({
                nombre: this.nombre,
                apellido: this.apellido,
                correo: correo,
                dni: this.dni,
            
                tipo: "cliente",
                clave: this.pass,
                img: this.foto
              }).then(() => {

                this.mostrarAlert=true;
                setTimeout(()=>{
            
                  this.mostrarAlert=false;
                }, 4000);
          this.LimpiarCampos();
          this.navCtrl.pop();
         
              });
           
                  });
                }
                })
              .catch(error => {

            let mensaje: string;

            console.log(error.code);

            switch (error.code) {
              case "auth/invalid-email":
                mensaje = "El correo ingresado no es válido.";
              
                break;

              case "auth/email-already-in-use":
                mensaje = "Este usuario ya fue registrado previamente.";
                
                break;

              case "auth/weak-password":
                mensaje = "La contraseña debe tener 6 o más caracteres.";
                
                break;

              default:
                mensaje = "Ups... Tenemos problemas técnicos.";
              
                break;
            }

            this.presentToast(mensaje);
          });
      }

      RegistrarAnonimo()
      {
        if (!this.correo || !this.pass || !this.nombre) {
          this.presentToast("Todos los campos deben ser completados.");
          return;
        }
        let usuariosRef = firebase.database().ref("usuarios");
    
        let correo = this.correo.toLowerCase();
    
            this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
              .then(() => {
    
            
              
    
                  usuariosRef.push({
                    nombre: this.nombre,
                    tipo: "anonimo",
                    correo:this.correo,
                    clave: this.pass,
                    img: this.foto
                  }).then(() => {
    
                    this.mostrarAlert=true;
                    setTimeout(()=>{
                
                      this.mostrarAlert=false;
                    }, 3000);
              this.LimpiarCampos();
              this.navCtrl.pop();
             
                  });
               
                      })
                .catch(error => {
    
                let mensaje: string;
    
                console.log(error.code);
    
                switch (error.code) {
                  case "auth/invalid-email":
                    mensaje = "El correo ingresado no es válido.";
                  
                    break;
    
                  case "auth/email-already-in-use":
                    mensaje = "Este usuario ya fue registrado previamente.";
                    
                    break;
    
                  case "auth/weak-password":
                    mensaje = "La contraseña debe tener 6 o más caracteres.";
                    
                    break;
    
                  default:
                    mensaje = "Ups... Tenemos problemas técnicos.";
                  
                    break;
                }
    
                this.presentToast(mensaje);
              });

      }
    
    //Valido que el dni no este en la base de datos
 //  let miusuariosRef = firebase.database().ref("usuarios");

 /* miusuariosRef.once("value", (snap) => {

    let data = snap.val();
    let esValido = true;

    for (let item in data) {

      if (data[item].dni == this.dni) {

        this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
        esValido = false;
       
        break;
      
    }
  }
  if (esValido) {

    let correo = this.correo.toLowerCase();
   
      

    this.authInstance.auth.createUserWithEmailAndPassword(this.correo, this.pass.toString())
          .then(() => {
            console.log("subo a la base");
         
         
              miusuariosRef.push({
                nombre: this.nombre,
                apellido: this.apellido,
                dni:this.dni,
                correo:this.correo,
                clave:this.pass,
                tipo:"cliente",
                img:this.foto
              
              }).then(() => {
                alert("¡Éxito!,Se registró correctamente el cliente");
                this.LimpiarCampos();
               
            
              });
            });
          });
        }
      })
        .catch(error => {

          let mensaje: string;

          console.log(error.code);
        });
       
*/
        LimpiarCampos() {

       
          this.correo = undefined;
          this.pass = undefined;
          this.nombre = undefined;
          this.apellido = undefined;
          this.dni = undefined;
          
          this.foto = "";
        }
    
        
      
        ElegirUsuario(tipo)
        {
          this.formInicial=false;
          if(tipo=="anonimo")
          {
            this.clase="anonimo";
            this.formAnon=true;
            this.formReg=false; 
            this.ocultarCabecera=true;
          }
          if(tipo=="registrado")
          {
            this.clase="registrado";
            this.formReg=true;
            this.formAnon=false;
            this.ocultarCabecera=true;
          //  (window.document.querySelector("#cab") as HTMLElement).style.display="none";
          }

        }
        cerrarForm()
        {
          this.formInicial=true;
          this.formReg=false;
          this.formAnon=false;
          this.ocultarCabecera=false;
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
         
      
         
            
          }, (err) => {
              console.log(err);
          });
      
      
          }
          catch(err)
          {
      
          }
          
        
      
         
      

      
        
        }
        scanear()
      {
          this.options = { prompt : "Escaneá tu DNI", formats: "PDF_417" }

          this.barcodeScanner.scan(this.options).then((barcodeData) => {
              this.miScan = (barcodeData.text).split('@');
              this.apellido = this.miScan[1];
              this.nombre = this.miScan[2];
              this.dni = this.miScan[4];
              alert(this.miScan);
          }, (error) => {
              //this.errorHandler.mostrarErrorLiteral(error);
          });
        
      
          /*
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.scanedCode = text;
            try{
              this.scanedCode=JSON.parse(this.scanedCode);
              this.nombre =this.scanedCode.nombre;
              this.apellido=this.scanedCode.apellido;
              this.dni=this.scanedCode.dni;
            }
            catch(err)
            {

            }
           
            this.qrScanner.hide().then(() => {

             this.hideCamera();
            });
        
          
          });
      
           this.qrScanner.show().then(()=>{
      
            this.showCamera();
           });
      
      */
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
      
      
    
}
