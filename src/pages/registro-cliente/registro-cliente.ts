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
//Descomentar linea 189 y 118 antes de hacer el push.

@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})
export class RegistroClientePage {
  nombre:string;
  apellido:string;
  prueba:string="";
  dni:number;
  mostrarSpinner:boolean=false;
  correo:string;
  clase:string;

  pass:string;
  formReg:boolean;
  formInicial:boolean;
  formAnon:boolean;
  public foto:string="";

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
    this.prueba="";
   // this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
      this.formReg =true;
      this.ocultarCabecera=false;
      this.formInicial=false;
      this.formAnon=false;
      this.ocultarContenido=false;
      this.ocultarCabecera=false;
      this.foto="../../assets/imgs/alfa/perfil.jpg";
      console.log(this.foto);
  }
  ionViewDidEnter(){
    this.foto="";
    // fires on navCtrl.push(DBLocomotive)
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
    this.mostrarSpinner=true;
    let usuariosRef = firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let item in data) {

        if (data[item].dni == this.dni) {
          this.mostrarSpinner=false;
          this.presentToast("El DNI ingresado es de  otro usuario registrado.");
          esValido = false;
       
          break;
        }
      }

      if (esValido) {

        let correo = this.correo.toLowerCase();

        this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
          .then(() => {

            this.authInstance.auth.currentUser.sendEmailVerification();

              usuariosRef.push({
                nombre: this.nombre,
                apellido: this.apellido,
                correo: correo,
                dni: this.dni,
            
                tipo: "cliente",
                clave: this.pass,
                img: this.foto,
                "encuesta": {
                  "pregunta1": {
                    "pesimo": 0,
                    "malo": 0,
                    "mediocre": 0,
                    "bueno": 0,
                    "excelente": 0
                  },
                  "pregunta2": {
                    "si": 0,
                    "no": 0
                  },
                  "pregunta3": {
                    "item1": 0,
                    "item2": 0,
                    "item3": 0
                  },
                  "pregunta4": {
                    "si": 0,
                    "no": 0
                  },
                  "pregunta5": [0]
                }    
              }).then(() => {

                this.mostrarSpinner = false;
                this.mostrarAlert=true;

                setTimeout(()=>{
            
                  this.mostrarAlert=false;
                  this.navCtrl.pop();
                  this.LimpiarCampos();
               //   this.navCtrl.pop();
                }, 4000);
       
         
              });
           
                  //});
            })  .catch(error => {

              let mensaje: string;
  
              console.log(error.code);
  
              switch (error.code) {
                case "auth/invalid-email":
                  mensaje = "El correo ingresado no es válido.";
                  this.correo="";

                  break;
  
                case "auth/email-already-in-use":
                  mensaje = "Este usuario ya fue registrado previamente.";
                  this.correo="";
                  break;
  
                case "auth/weak-password":
                  mensaje = "La contraseña debe tener 6 o más caracteres.";
                  this.pass="";
                  
                  break;
  
                default:
                  mensaje = "Ups... Tenemos problemas técnicos.";
                
                  break;
              }
              this.mostrarSpinner=false;
              this.presentToast(mensaje);
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
            this.mostrarSpinner=false;
            this.presentToast(mensaje);
          });
      }
      Atras()
      {
        this.navCtrl.pop();
      }

      RegistrarAnonimo()
      {
        if (!this.correo || !this.pass || !this.nombre) {
          this.presentToast("Todos los campos deben ser completados.");
          return;
        }
        this.mostrarSpinner=true;
        let usuariosRef = firebase.database().ref("usuarios");
    
        let correo = this.correo.toLowerCase();
    
            this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
              .then(() => {
    
            
              
    
                  usuariosRef.push({
                    nombre: this.nombre,
                    tipo: "anonimo",
                    correo:correo,
                    clave: this.pass,
                    img: this.foto,
                    "encuesta": {
                      "pregunta1": {
                        "pesimo": 0,
                        "malo": 0,
                        "mediocre": 0,
                        "bueno": 0,
                        "excelente": 0
                      },
                      "pregunta2": {
                        "si": 0,
                        "no": 0
                      },
                      "pregunta3": {
                        "item1": 0,
                        "item2": 0,
                        "item3": 0
                      },
                      "pregunta4": {
                        "si": 0,
                        "no": 0
                      },
                      "pregunta5": [0]
                    }
                  }).then(() => {
                    this.mostrarSpinner=false;
                    this.mostrarAlert=true;
                    setTimeout(()=>{
                      this.mostrarAlert=false;
                      this.LimpiarCampos();
                      
                     // this.navCtrl.pop();
                    
                    }, 3000);
            
             
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
                this.mostrarSpinner=false;
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
          this.LimpiarCampos();
          this.prueba="";
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
            this.prueba= this.foto;

      
         
            
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
              let unNombre =  this.miScan[2];
              //this.nombre = this.miScan[2];
              let nombres = unNombre.split(' ');
              this.nombre= nombres[0];
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
