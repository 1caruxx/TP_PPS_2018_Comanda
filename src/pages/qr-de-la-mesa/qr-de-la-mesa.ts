import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the QrDeLaMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-de-la-mesa',
  templateUrl: 'qr-de-la-mesa.html',
})
export class QrDeLaMesaPage {

  user_data= [];
  public firebase = firebase;
  public firebaseDos= firebase;
  public db = firebase.firestore();
  public scanSub;
  public cerrarqr=false;
  public probandingg=true;
  public clientovich;
  public estaLibre=false;
  public ocultarQR = false;
  public estaOcupada=false;

  public usuarios: Array<any>;
  public espera: Array<any>;
  public atendidos: Array<any>;
  
  public tiempopedidos;

  public pedidos=false;


  public usuario;
  public vistaMozo:boolean;
  public vistaCliente:boolean;

  options : any;

  miScan;


public estadoBoton: boolean = false;
public ocultarAlert: boolean = true;
public alertTitulo;
public alertMensaje;
public alertMensajeBoton;
public alertHandler;



  

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,private authInstance: AngularFireAuth,private barcode: BarcodeScanner)
   {
                 /* this.qrScanner.prepare()
              .then((status: QRScannerStatus) => {

                if (status.authorized) {

                  this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

                  
                    alert(text);
                   
                  });

                  this.qrScanner.show().then(() => {

                    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                    (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                    (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                  
                  });

                } else if (status.denied) {
                  

                } else {
                 
                }
              })
              .catch((e: any) => this.presentToast(e));

*/
    //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");

    //this.vistaCliente=true;
    //his.vistaMozo=true;

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if(this.usuario.tipo=="mozo")
    {
      this.vistaMozo=true;
    }

    if(this.usuario.tipo=="cliente" || this.usuario.tipo=="anonimo")
    {
      this.vistaCliente=true;
    }

    
    setInterval(() => {
      if(this.ocultarQR) {
        this.OcultarLectorQR();
        this.ocultarQR = false;
      }
    }, 500);



  /*  let pedidosRef = this.firebase.database().ref("usuarios");

    pedidosRef.once("value", (snap) => {

      //let data = snap.val();
     // let esValido = true;
     let result = snap.val();
    for(let k in result){ //"k" provides key Id of each object
      this.user_data.push({
       id : k,
       apellido : result[k].apellido,
       clave : result[k].clave,
       correo : result[k].correo,
       cuil : result[k].cuil,
       dni : result[k].dni,
       nombre : result[k].nombre,
       tipo : result[k].tipo
     });
    }



      
    });*/  
    this.estaLibre=false;
    this.usuarios = [];
    this.espera = [];
    this.atendidos = [];


    //let genteRef = this.firebase.database().ref("usuarios/clientes");
   /* let genteRef = this.firebase.database().ref("usuarios");

    genteRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      console.log(this.usuarios);
    }).then(() => {
      this.espera = this.usuarios.filter(item => {

        
        return item.estado=="espera";
      });

      this.atendidos = this.usuarios.filter(item => {

       
       return item.estado=="atendido";
      });


      

    });*/

    let genteRef = this.firebase.database().ref("usuarios");

    genteRef.on("value", (snap) => {

      this.usuarios=[];

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      this.espera = this.usuarios.filter(item => {

        
        return item.estado=="espera";
      });

      this.atendidos = this.usuarios.filter(item => {

       
       return item.estado=="atendido";
      });

      console.log(this.usuarios);


    });
     


      

    

    



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

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad QrDeLaMesaPage');
  }


  MostrarQr(correo)
  {

         /* this.cerrarqr=true;
          this.probandingg=false;

          this.qrScanner.prepare()
          .then((status: QRScannerStatus) => {
            .then((status) => {

            if (status.authorized) {

              this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

             
                  alert(text);
                  this.Modificar(correo,text);
                  this.ocultarQR = true;

           
              });

              this.qrScanner.show().then(() => {

                (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                //this.estado = "ocultar";
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
      
      this.probandingg=true;
      this.cerrarqr=false;
    });

    this.scanSub.unsubscribe();*/
  }

  Modificar(correo,text)
  {
    var ocup=true;

    this.estaLibre=true;

          var refDos = this.firebase.database().ref("mesas");
                        
                        refDos.once('value', (snap) => {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data){
                                if (text == data[key].numeroMesa) {

                                  //if(data[key].cliente!=null)
                                  //CAMBIE ESTA LINEA
                                  if(data[key].estado=="ocupada")
                                  {
                                    this.estaLibre=false;
                                    //ocup=false;
                                   // alert("La mesa ya esta ocupada");
                                   this.MostrarAlert("Error!", "La mesa ya esta ocupada", "Aceptar", this.limpiar);
                                    break;
                                    //return;
                                    
                                  }



                                    data[key].cliente = correo;
                                    data[key].estado = "ocupada";
                                    refDos.child(key).update(data[key]);
                                    //alert("bienvenido,se relaciono la mesa tres")



                                    //var ref = this.firebase.database().ref("usuarios/clientes");
                                    var ref = this.firebase.database().ref("usuarios");
             
                                    ref.once('value', (snap) => {
                                        var data = snap.val();
                                        for(var key in data){
                                            if (correo == data[key].correo) {
                                                data[key].mesa = text;
                                                data[key].estado = "atendido";
                                               
                                                ref.child(key).update(data[key]);
                                                //alert("Listo,se relaciono al cliente con la mesa " + text);
                                                this.MostrarAlert("Exito!", "Listo,se relaciono al cliente con la mesa " + text, "Aceptar", this.limpiar);
                                                this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                                
                                                
                                                
                     
                                            };                  
                                        }
                                    });





                                   
                                };                  
                            }
                        });



                          //if(this.estaLibre)


                          //if(ocup==true)
                       /*   if(this.estaLibre)
                          {

                            var ref = this.firebase.database().ref("usuarios/clientes");
             
                            ref.once('value', (snap) => {
                                var data = snap.val();
                                for(var key in data){
                                    if (correo == data[key].correo) {
                                        data[key].mesa = 3;
                                       
                                        ref.child(key).update(data[key]);
                                        alert("bienvenido,se relaciono al cliente con la mesa " + 3);
                                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                        
                                        
                                        
             
                                    };                  
                                }
                            });


                          }*/

                          
                          //this.cargarPersonas();
           
                          
  }

  MostrarPedidos(mesa)
  {

                   this.pedidos=true;

                          
                          var reftres = this.firebase.database().ref("probandopedidos");
             
                            reftres.once('value', (snap) => {
                                var data = snap.val();
                                for(var key in data){
                                   // if ("1" == data[key]) 
                                  // alert(key);
                                  if(key==mesa)
                                  {
                                    alert("El tiempo de espera es " + data[key].tiempo + " minutos")
                                    break;

                                  }
                                  else
                                  {
                                    alert("No hicieron ningun pedido todavia");
                                    break;

                                  }
                                  // if(parseInt(data[key])==3)
                                  // {
                                        //data[key].mesa = 3;
                                       
                                        //ref.child(key).update(data[key]);
                                       
                                        
             
                                   // }                
                                }
                            });




  }

  cargarPersonas()
  {
  /*  this.usuarios = [];
    this.espera = [];
    this.atendidos = [];


    let genteRef = this.firebase.database().ref("usuarios/clientes");

    genteRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      console.log(this.usuarios);
    }).then(() => {
      this.espera = this.usuarios.filter(item => {

        return item.mesa == null;
      });

      this.atendidos = this.usuarios.filter(item => {

        return item.mesa != null;
      });


      

    });*/
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }


  MostrarTiempoEsperaCliente()
  {

/*
        this.cerrarqr=true;
          this.probandingg=false;

          this.qrScanner.prepare()
          //.then((status: QRScannerStatus) => {
            .then((status) => {

            if (status.authorized) {

              this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

                
            
                

                  var refDos = this.firebase.database().ref("mesas");
                        
                        refDos.once('value', (snap) => {
                            var data = snap.val();
                           
                            for(var key in data)
                            {
                                if (text == data[key].numeroMesa) 
                                {
                                    alert(data[key].tiempoMinimo);
                                    break;
                                                                                        
                                }
                              }
                            });



                 



                  this.ocultarQR = true;

               
              });

              this.qrScanner.show().then(() => {

                (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
               
              });

            } else if (status.denied) {
           

            } else {
              
            }
          })
          .catch((e: any) => this.presentToast(e));


          */

  }

  probandoBarcode(correo)
  {

  /*  this.options = { prompt : "Escaneá tu DNI", formats: "PDF_417" }

    this.barcode.scan(this.options).then((barcodeData) => {
        this.miScan = (barcodeData.text);
        alert(this.miScan);
    }, (error) => {
       
    });*/

    this.barcode.scan().then(barcodeData => {
      this.Modificar(correo,barcodeData.text);
        alert(barcodeData.text);
    });

  }

  ocuparMesaBarcode(correo)
  {
    this.barcode.scan().then(barcodeData => {
      this.Modificar(correo,barcodeData.text);
        //alert(barcodeData.text);
    });


  }

  mostrarTiempoBarcode()
  {
    let banderita=0;

    let usuario = JSON.parse(localStorage.getItem("usuario"));

    this.barcode.scan().then(barcodeData => {



     
        //alert(barcodeData.text);
        var refDos = this.firebase.database().ref("mesas");
                        
        refDos.once('value', (snap) => {
            var data = snap.val();
           
            for(var key in data)
            {
                //if (barcodeData.text == data[key].numeroMesa)
                if (barcodeData.text == data[key].numeroMesa) 
                {
                  if(data[key].cliente==usuario.correo)
                  {
                    if(data[key].tiempoMinimo!=null)
                    {
                    //alert("El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos");
                    this.MostrarAlert("¡Cocinandose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", this.limpiar);
                    banderita=1;
                    break;

                    }
                    else
                    {
                      //alert("Su pedido fue tomado,falta que el cocinero ponga un tiempo minimo");
                      this.MostrarAlert("A esperar!", "Su pedido fue tomado,falta que el cocinero ponga un tiempo minimo", "Aceptar", this.limpiar);
                      banderita=1;
                      break;
                    }
                    
                  }
                  else
                  {
                    //alert("Esa no es su mesa");
                    this.MostrarAlert("Error!", "Esta no es su mesa", "Aceptar", this.limpiar);
                    banderita=1;
                    break;
                  }
                    
                                                                        
                }
                
              }
            }).then(() => 
            {
              if(banderita==0)
              {
                //alert("Por favor escanee una mesa valida");
                this.MostrarAlert("NOOOOOOOOOOOOOOO!", "por favor escanee una mesa valida", "Aceptar", this.limpiar);
              }
            });

          




    });



  }


  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) 
  {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;

   
  }

  limpiar()
  {
    this.ocultarAlert=true;

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
            if (this.usuario.tipo == "mozo"
              || this.usuario.tipo == "cocinero"
              || this.usuario.tipo == "bartender"
              || this.usuario.tipo == "metre"
              || this.usuario.tipo == "repartidor") {

              this.navCtrl.setRoot("");
            } else {
              localStorage.clear();
              this.navCtrl.setRoot("");
            }
          });

          break;
        }
      }
    });
  }

  

}
