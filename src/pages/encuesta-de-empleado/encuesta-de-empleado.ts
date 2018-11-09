import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";


//LINEA 361 Y 364 LAJSDKLASDLKASJDLKAJDKLJDLK
/**
 * Generated class for the EncuestaDeEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta-de-empleado',
  templateUrl: 'encuesta-de-empleado.html',
})
export class EncuestaDeEmpleadoPage {

  encuestita=true;
  probabilidad=false;

  


  public firebase = firebase;
  public db = firebase.firestore();
  public foto: string = "";
  public nombreFoto: string;
  public uno;
  public dos;
  public tres;
  public cuatro;
  //public cinco;
  public cinco = {item1: false, item2: false};

  public pregUnoPrimeraRespuesta=0;
  public pregUnoSegundaRespuesta=0;
  public pregUnoTerceraRespuesta=0;

  public pregTresPrimeraRespuesta=0;
  public pregTresSegundaRespuesta=0;

  public pregCuatroPrimeraRespuesta=0;
  public pregCuatroSegundaRespuesta=0;

  public pregCincoPrimeraRespuesta=0;
  public pregCincoSegundaRespuesta=0;

  public usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth,private toastCtrl: ToastController,private camera: Camera)
  {
     //this.encuesta();
     this.usuario = JSON.parse(localStorage.getItem("desloguear"));
     //this.encuesta();


  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad EncuestaDeEmpleadoPage');
  }

  Volver()
  {
    //this.navCtrl.setRoot(SuperControlPanelPage);
  }

  
  public pieChartType:string = 'pie';
 
  // Pie
  //public pieChartLabels:string[] = ['Bueno', 'Malo'];
  //public pieChartData:number[] = [300, 500];

  public pieChartLabelsUno:string[];
  public pieChartDataUno:number[];

  public pieChartLabels:string[];
  public pieChartData:number[];

  public pieChartLabelsDos:string[];
  public pieChartDataDos:number[];

  public pieChartLabelsCinco:string[];
  public pieChartDataCinco:number[];
 
  public randomizeType():void {
    
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  enviarEncuesta()
  {
    //this.encuestita=false;
   // this.probabilidad=true;

   if (!this.uno || !this.dos || !this.tres || !this.cuatro || !this.cinco)
    {
      this.presentToast("Todos los campos deben ser completados.");
      return;
    }

    if(this.foto=="")
    {
      this.presentToast("Tiene que cargar una foto");
      return;
    }

  
    let mesasRef = this.firebase.database().ref("encuestaDeEmpleado");

    let pictures = this.firebase.storage().ref(`encuestaDeEmpleado/${this.nombreFoto}`);

    pictures.putString(this.foto, "data_url").then(() => {

      pictures.getDownloadURL().then((url) => {

        mesasRef.push({
          uno: this.uno,
          dos: this.dos,
          tres: this.tres,
          cuatro:this.cuatro,
          cinco:this.cinco,
          img: url
        });
      });
    }).then(() => {

      this.presentToast("la encuesta fue cargada con exito");
      this.encuesta();




    });


    
    

  


    //this.navCtrl

  }



  async SacarFoto() {

    let date = new Date();
    let nombreFoto = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;

    try {

      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      let result = await this.camera.getPicture(options);

      this.foto = `data:image/jpeg;base64,${result}`;
      this.nombreFoto = nombreFoto;
    } catch (error) {

      // this.presentToast(error);
    }
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

  encuesta()
  {

    let probRef = this.firebase.database().ref("encuestaDeEmpleado");

    probRef.once("value", (snap) => {

      let data = snap.val();
      //this.esValido = true;
     

      for (let item in data) 
      {

        if (data[item].uno == 1) 
        {

          this.pregUnoPrimeraRespuesta++;
        
          
        }
        if (data[item].uno == 2) 
        {

         this.pregUnoSegundaRespuesta++;
        
          
        }

        if (data[item].uno == 3) 
        {

          this.pregUnoTerceraRespuesta++;
        
          
        }

        if (data[item].tres == "si") 
        {

          this.pregTresPrimeraRespuesta++
         // alert("entre");
        
          
        }

        if (data[item].tres == "no") 
        {

          this.pregTresSegundaRespuesta++;
        
          
        }

        if (data[item].cuatro == "si") 
        {

          this.pregCuatroPrimeraRespuesta++;
        
          
        }

        if (data[item].cuatro == "no") 
        {

          this.pregCuatroSegundaRespuesta++;
        
          
        }

        if (data[item].cinco.item1 == true) 
        {

          this.pregCincoPrimeraRespuesta++;
        
          
        }

        if (data[item].cinco.item2 == true) 
        {

          this.pregCincoSegundaRespuesta++;
        
          
        }





      }
      
      
    }).then(() => 
    {
      this.pieChartLabels = ['si', 'no'];
    //this.pieChartData = [this.pregTresPrimeraRespuesta, this.pregTresSegundaRespuesta];
    this.pieChartData = [this.pregTresPrimeraRespuesta, this.pregTresSegundaRespuesta];

    this.pieChartLabelsDos = ['si', 'no'];
    this.pieChartDataDos = [this.pregCuatroPrimeraRespuesta, this.pregCuatroPrimeraRespuesta];

    this.pieChartLabelsCinco = ['si', 'no'];
    this.pieChartDataCinco = [this.pregCincoPrimeraRespuesta, this.pregCincoSegundaRespuesta];

    this.pieChartLabelsUno = ["bien","masomenos","mal"];
    this.pieChartDataUno = [this.pregUnoPrimeraRespuesta,this.pregUnoSegundaRespuesta,this.pregUnoTerceraRespuesta];


    

    this.encuestita=false;
    this.probabilidad=true;




    });
      


    


  }


  Logout()
  {

    if(this.usuario==false)
    {
      this.navCtrl.pop();

    }

    if(this.usuario==true)
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

 




}
