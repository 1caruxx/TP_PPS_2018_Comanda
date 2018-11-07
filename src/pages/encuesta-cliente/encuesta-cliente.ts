import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PedirPlatosPage } from '../pedir-platos/pedir-platos';
import { QrIngresoLocalPage } from '../qr-ingreso-local/qr-ingreso-local';
import { Chart } from 'chart.js';

/**
 * Generated class for the EncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-encuesta-cliente',
  templateUrl: 'encuesta-cliente.html',
})
export class EncuestaClientePage {
  correo:string;
  public pregunta4Labels: string[] = ['Horribles', 'Feos', 'Pasable', 'Aceptable', 'Buenos', 'Ricos', 'Muy ricos'];
  public pregunta4Data: number[] = [0, 0, 0, 0, 0,0,0];
  public pregunta1Labels: string[] = ['Sí', 'No'];
  public pregunta1Data: number[] = [0, 0];
  public pregunta2Labels: string[] = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'];
  public pregunta2Data: number[] = [0, 0 ,0 ,0, 0];
  public pregunta3Labels: string[] = ['Comodidad', 'Platos', 'Precios', 'Atención'];
  public pregunta3Data: number[] = [0, 0, 0, 0];
  public pregunta5Labels: string[] = ['Puntuaron 1', ' Puntuaron 2', ' Puntuaron 3', 'Puntuaron 4', 'Puntuaron 5', 'Puntuaron 6', 'Puntuaron 7', 'Puntuaron 8','Puntuaron 9','Puntuaron 10'];
  public pregunta5Data: number[] = [0, 0, 0, 0, 0,0,0,0 , 0,0];
  public doughnutChartType: string = 'doughnut';
  //Para los votos de la preg 

  votosPreg1Si=0;
  votosPreg1No=0;
  votosHorribles=0;
  votosFeos=0;
  votosPasable=0;
  votosAceptable=0;
  votosBuenos=0;
  votosRicos=0;
  votosMuyRicos=0;
  votos1=0;
  votos2=0;
  votos3=0;
  votos4=0;
  votos5=0;
  votos6=0;
  votos7=0;
  votos8=0;
  votos9=0;
  votos10=0;
  votosComodidad=0;
  votosAtencion=0;
  votoPrecios=0;
  votosPlatos=0;

  votosMuyMala=0;
  votosMala=0;
  votosRegular=0;
  votosBuena=0;
  votosMuyBuena=0;
  cliente:string;
 ocultar:boolean;
 ocultar2:boolean;
 ocultar3:boolean;
 ocultar4:boolean;
 ocultar5:boolean;
 ocultar6:boolean;
 mensaje;
 resp1;
 resp2;
 resp3comodidad=false;
 resp3platos=false;
 resp3precios=false;
 resp3atencion=false;
 resp4=4;
 resp5="";
foto1:string="";
foto2:string="";
foto3:string="";
mostrarAlert3:boolean=false;
mostrarfoto1:boolean;
ocultarBoton1:boolean;
ocultarBoton2:boolean;
ocultarBoton3:boolean;
mostrarfoto2:boolean;
mostrarfoto3:boolean;
textoRange;

mostrarChart:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,  private aut:AngularFireAuth) {
    this.ocultar=true;
    this.ocultar2=true;
    this.ocultar3=true;
    this.ocultar4=true;
    this.ocultar5=true;
    this.ocultarBoton1=false;
    this.ocultarBoton2=false;
    this.ocultarBoton3=false;
    this.ocultar6=true;
    /*this.correo=localStorage.getItem("usuario");

    this.correo =(JSON.parse(this.correo)).nombre;*/
    this.correo="miCorreo@correo.com";
    this.mostrarfoto1=false;
    this.mostrarfoto2=false;
    this.mostrarfoto3=false;

    //setear esta variable con el cliente sacado del local storage
    this.cliente ="yoCliente";
    //DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!
  //  this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
    Chart.defaults.global.legend.display = false;
    let encuestaRef =firebase.database().ref("encuestaCliente/");
    encuestaRef.once("value", (snap) => {

      let data = snap.val();
      for (let item in data) {
        //Cargo los puntos para la pregunta 4.
          console.log(data[item].preg4);
        if(data[item].preg4 ==1)
        {
          this.votosHorribles++;
    
        }
        if(data[item].preg4 ==2)
        {
          this.votosFeos++;
   
        }
        if(data[item].preg4 ==3)
        {
          this.votosPasable++;
      
        }
        if(data[item].preg4 ==4)
        {
          this.votosAceptable++;
      
        }
        if(data[item].preg4 ==5)
        {
          this.votosBuenos++;
    
        }
        if(data[item].preg4 ==6)
        {
          this.votosRicos++;
      
        }
        if(data[item].preg4 ==7)
        {
          this.votosMuyRicos++;
      
        }
        //Cargo los puntos para pregunta 1
        if(data[item].preg1 =="Si")
        {
          this.votosPreg1Si++;
      
        }
        else
        {
          this.votosPreg1No++;
        }
        //Cargo los puntos para pregunta 2
        if(data[item].preg2 =="muy mala")
        {
          this.votosMuyMala++;
      
        }
        if(data[item].preg2 =="mala")
        {
          this.votosMala++;
      
        }
        if(data[item].preg2 =="muy buena")
        {
          this.votosMuyBuena++;
      
        }
        if(data[item].preg2 =="buena")
        {
          this.votosBuena++;
      
        }
        if(data[item].preg2 =="regular")
        {
          this.votosRegular++;
      
        }

        
        //Valido pregunta 3
      let resp3 = data[item].preg3.split("-");

      if(resp3[0]=="true")
      {
        this.votosComodidad++;
      }
      if(resp3[1]=="true")
      {
        this.votosPlatos++;
      }
      if(resp3[2]=="true")
      {
        this.votoPrecios++;
      }
      if(resp3[3]=="true")
      {
        this.votosAtencion++;
      }
    

      //Valido pregunta 5
      if(data[item].preg5=="1")
      {
        this.votos1++;
      }
      if(data[item].preg5=="2")
      {
        this.votos2++;
      }
      if(data[item].preg5=="3")
      {
        this.votos3++;
      }
      if(data[item].preg5=="4")
      {
        this.votos4++;
      }
      if(data[item].preg5=="5")
      {
        this.votos5++;
      }
      if(data[item].preg5=="6")
      {
        this.votos6++;
      }
      if(data[item].preg5=="7")
      {
        this.votos7++;
      }
      if(data[item].preg5=="8")
      {
        this.votos8++;
      }
      if(data[item].preg5=="9")
      {
        this.votos9++;
      }
      if(data[item].preg5=="10")
      {
        this.votos10++;
      }

      }
    
      this.pregunta4Data = [
        this.votosHorribles,
        this.votosFeos,
        this.votosPasable,
        this.votosAceptable,
       this.votosBuenos,
       this.votosRicos,
       this.votosMuyRicos
      ];

      this.pregunta5Data = [
        this.votos1,
        this.votos2,
        this.votos3,
        this.votos4,
        this.votos5,
        this.votos6,
        this.votos7,
        this.votos8,
        this.votos9,
        this.votos10,
      ];
      this.pregunta1Data= 
      [
        this.votosPreg1Si,
        this.votosPreg1No
      ];
      this.pregunta2Data=[
        this.votosMuyMala,
        this.votosMala,
        this.votosRegular,
        this.votosBuena,
        this.votosMuyBuena

      ];
      this.pregunta3Data=[
        this.votosComodidad,
        this.votosPlatos,
        this.votoPrecios,
        this.votosAtencion

      ];

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaClientePage');
  }
  pregunta1()
  {
    this.ocultar=false;
    
    
  
  }
  public chartClicked(e: any): void {
    console.log(e);
  }
  irA()
  {
    this.navCtrl.push(PedirPlatosPage);
  }
  pregunta2()
  {
    this.ocultar2=false;
  }
  pregunta3()
  {
    this.ocultar3=false;
  }
  pregunta4()
  {
    this.ocultar4=false;
    console.log(this.votosAceptable);
  }
  pregunta5()
  {
    this.ocultar5=false;
  }
  pregunta6()
  {
    this.ocultar6=false;
  }
  Aceptar()
  {
    this.ocultar=true;
    this.ocultar2=true;
    this.ocultar3=true;
    this.ocultar4=true;
    this.ocultar5=true;
    this.ocultar6=true;
    console.log(this.resp1);
   console.log(this.resp2);
 
   console.log(this.resp3comodidad);
   
   console.log(this.resp3platos);
   console.log(this.resp3precios);
   console.log(this.resp3atencion);
   console.log(this.resp4);
   console.log(this.resp5);

  }
  Aceptar5()
  {
    if(!this.ValidarNumero(this.resp5))
    {
      this.mensaje="Debe ingresar un número en este campo.";
      this.mostrarAlert3=true;
      setTimeout(()=>{

        this.mostrarAlert3=false;
      }, 3500);
      return
    
    }

    let valor =parseInt(this.resp5)
    if(valor<1 || valor>10)
    {
  
      this.mensaje="El número ingresado debe estar en el rango del 1 a 10.";
      this.mostrarAlert3=true;
      setTimeout(()=>{

        this.mostrarAlert3=false;
      }, 3500);
      return
    
    }
    this.ocultar5=true;

  }

  Foto1()
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
   
      this.mostrarfoto1=true;
      this.ocultarBoton1=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

  }

  }
  Foto2()
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
   
      this.mostrarfoto2=true;
      this.ocultarBoton2=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

  }
  }
  Foto3()
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

      
      
      this.foto3 = "data:image/jpeg;base64," + imageData;
   
      this.mostrarfoto3=true;
      this.ocultarBoton3=true;
      
    }, (err) => {
        console.log(err);
    });
  }
  catch(err)
  {

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
  mostrarelChart()
  {
    this.mostrarChart=true;
  }
  cerrarChart()
  {
    this.mostrarChart=false;
  }
  SubirEncuesta()
  {
    if(!this.resp1||!this.resp2||!this.resp4||!this.resp5)
    {
      this.mensaje="Debe contestar todas las preguntas para poder enviar la encuesta.";
      this.mostrarAlert3=true;
      setTimeout(()=>{

        this.mostrarAlert3=false;
      }, 3500);
      return

    }

    let carga=
    {
      preg1:this.resp1,
      preg2:this.resp2,
      preg3:this.resp3platos+"-"+this.resp3comodidad+"-"+this.resp3precios+"-"+this.resp3atencion,
      preg4:this.resp4,
      preg5:parseInt(this.resp5),
      foto1:this.foto1,
      foto2:this.foto2,
      foto3:this.foto3,
      cliente:this.correo
    };
    let mensaje = firebase.database().ref().child("encuestaCliente/");
    mensaje.push(carga);
    this.navCtrl.push(QrIngresoLocalPage);
  }

  ModificarTextoRange()
  {
    switch (this.resp4) {
      case 1:
        this.textoRange = "Horribles";
        break;

      case 2:
        this.textoRange = "Feos";
        break;

      case 3:
        this.textoRange = "Pasable";
        break;

      case 4:
        this.textoRange = "Aceptable";
        break;

      case 5:
        this.textoRange = "Buenos";
        break;
        case 6:
        this.textoRange = "Ricos";
        break;
        case 7:
        this.textoRange = "Muy Ricos";
        break;
      default:
        this.textoRange = "Algo fallo";
        break;
    }
  }
}
