import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, GESTURE_GO_BACK_SWIPE } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativeAudio } from '@ionic-native/native-audio';


import firebase from "firebase";


/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage {

  jugadorActual;
  claveJugador;
  yaJugo:boolean;
  taparJuego:boolean=false;
  animacion:any[]=[];
  fotos:any[]=[];
  coincide:boolean=false;
  claveActual;
  imgMostrar:any[]=[];
  
  contadorJugadas:number=0;
  mesa;
  valorViejo;
  primerId;
  x:any;
  tiempo="";
  mensaje="";
 
  correo:string;
  juegoIniciado:boolean=false;
  puntos:number;
  gano:boolean=false;
  mostrarAlert:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,   private authInstance: AngularFireAuth,private nativeAudio: NativeAudio) {
    //this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
    this.correo=localStorage.getItem("usuario");
    this.correo =(JSON.parse(this.correo)).correo;
 
    this.nativeAudio.preloadSimple('simple', 'assets/audio/beta/simple.mp3').catch(()=>{});
    this.nativeAudio.preloadSimple('coincide', 'assets/audio/beta/coincide.mp3').catch(()=>{});


    //Ademas de obtener la mesa tambien me fijo si el usuario ya jugo este juego
    this.ObtenerMesa();
    for(let i=0;i<16;i++)
      { 
        this.imgMostrar.push({img:"assets/imgs/beta/elLogo.png", ok:true});
        this.animacion.push(false);

      }
      this.fotos.push({img:"assets/imgs/beta/empanada.jpg", clave:1, id:1});
      this.fotos.push({img:"assets/imgs/beta/pizza.jpg", clave:2, id:2});
      this.fotos.push({img:"assets/imgs/beta/hamburguesa.jpg", clave:3, id:3});
      this.fotos.push({img:"assets/imgs/beta/milanesa.jpg", clave:4, id:4});
      this.fotos.push({img:"assets/imgs/beta/vino.jpg", clave:5, id:5});
      this.fotos.push({img:"assets/imgs/beta/jugo.jpg", clave:6, id:6});
      this.fotos.push({img:"assets/imgs/beta/papas.jpg", clave:7, id:7});
      this.fotos.push({img:"assets/imgs/beta/fondoPedido.jpg", clave:8, id:8});
      this.fotos.push({img:"assets/imgs/beta/empanada.jpg", clave:1, id:9});
      this.fotos.push({img:"assets/imgs/beta/pizza.jpg", clave:2, id:10});
      this.fotos.push({img:"assets/imgs/beta/hamburguesa.jpg", clave:3, id:11});
      this.fotos.push({img:"assets/imgs/beta/milanesa.jpg", clave:4, id:12});
      this.fotos.push({img:"assets/imgs/beta/vino.jpg", clave:5, id:13});
      this.fotos.push({img:"assets/imgs/beta/jugo.jpg", clave:6, id:14});
      this.fotos.push({img:"assets/imgs/beta/papas.jpg", clave:7, id:15});
      this.fotos.push({img:"assets/imgs/beta/fondoPedido.jpg", clave:8, id:16 });

      this. fotos = this.fotos.sort(function() {return Math.random() - 0.5});
      this.puntos=0;
  }
  Jugar()
  {
      this.juegoIniciado=true;
        
  let tope = new Date().getTime();
  tope=tope +60*1000;
  var countDownDate = new Date(tope).getTime();

  this.x = setInterval(()=> {

    // Get todays date and time
    var now = new Date().getTime();
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
  
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.tiempo =minutes+":"+seconds;
    
  
  if (distance < 0) {
    clearInterval(this.x);
this.gano=false;

    //Me fijo si jugo o si no para subirle el estado
    if(!this.yaJugo)
    {
      console.log(this.jugadorActual);
      console.log(this.claveJugador);

      let usuariosRef = firebase.database().ref("usuarios/"+this.claveJugador);
      //this.claveActual=key;
      usuariosRef.set(this.jugadorActual).then(()=>{

        this.mensaje="El tiempo se acabó, juego terminado, ustéd pierde";
        this.mostrarAlert=true;
        setTimeout(()=>{
    
          this.mostrarAlert=false;
        
          this.navCtrl.pop();
        }, 4000);

      });

    }
   this.tiempo ="Juego finalizado";

   this.taparJuego=true;
   this.puntos=0;
   for(let i=0;i<16;i++)
    { 
      this.imgMostrar[i]={img:"assets/imgs/beta/elLogo.png", ok:true};
      
  
    }

    //Aca muestro el alert de que perdio.
    this.mensaje="El tiempo se acabó, juego terminado, ustéd pierde";
    this.mostrarAlert=true;
    setTimeout(()=>{

      this.mostrarAlert=false;
    
      this.navCtrl.pop();
    }, 4000);
  }
  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }
  Salir()
  {
    this.navCtrl.pop();
  }

  cambiarImagen(valor)
  {
    console.log(this.contadorJugadas);
    console.log(this.puntos);
    
  
    valor = parseInt(valor);
    valor = valor-1;
    let imgMostrar="imgMostrar"+valor;

    if(this.imgMostrar[valor].ok ==false)
    {
      return;
    }
   
    this.contadorJugadas = this.contadorJugadas +1;
  
  
      this.imgMostrar[valor].img =this.fotos[valor].img;

  
   
     
    
   //this.contadorJugadas = this.contadorJugadas +1;
    if(this.contadorJugadas==1)
    {
      //Pregunto si esta desactivado el sonido.
      if(localStorage.getItem("sonidos")!="false")
      {
        this.nativeAudio.play('simple').catch(()=>{});

      }

      //Aca permito que se de vuelta la imagen
      this.valorViejo=valor;
      this.primerId = this.fotos[valor].id;
  this.claveActual=this.fotos[valor].clave;
    }
  
    if(this.contadorJugadas ==2)
    {
      //Aca necesito que aunque clikee no me de vuelta la imagen ni haga nada
      this.taparJuego=true;

      if(this.primerId == this.fotos[valor].id)
      {
        console.log(this.primerId);
        console.log(this.fotos[valor].id);
        this.contadorJugadas=1;
        this.taparJuego=false;
        return;
      }
    
        if(this.claveActual == this.fotos[valor].clave)
        {
          
          this.claveActual="";
          this.coincide=true;
          this.imgMostrar[this.valorViejo].ok=false;
          this.imgMostrar[valor].ok=false;
          this.animacion[valor]=true;
          this.animacion[this.valorViejo]=true;

        
          if(localStorage.getItem("sonidos")!="false")
          {
            this.nativeAudio.play('coincide').catch(()=>{});

          }


          this.puntos = this.puntos+10;
          if(this.puntos==80)
          {
            //  this.miCon.CargarScore(this.token.correo, "puntajeJM", this.puntos.toString()).subscribe(
              //exito => console.log("Exito" + JSON.stringify(exito)),
             // error => console.log("Error" + JSON.stringify(error))
           // );
           // this.IniciarJuego();
              this.gano=true;
    
          }
        }
        else
        {
          if(localStorage.getItem("sonidos")!="false")
          {
            this.nativeAudio.play('simple').catch(()=>{});

          }


          this.claveActual="";
        }
      this.contadorJugadas=0;
       // this.taparJuego=true;
      setTimeout( ()=>{
        for(let i=0;i<16;i++)
        { 
          
          if(this.imgMostrar[i].ok==false)
          {
            this.imgMostrar[i].img="assets/imgs/beta/ok2.png";
          }
          else
          {
            this.imgMostrar[i].img="assets/imgs/beta/elLogo.png";
          }
              
          this.taparJuego=false;
       
          
        
        
        }
        if(this.gano)
        {
          if(!this.yaJugo)
          {
            this.SubirDescuento();
            this.mensaje="!!Felicitaciones usted ganó un 10% de descuento!!";
            let usuariosRef = firebase.database().ref("usuarios/"+this.claveJugador);
         
            usuariosRef.set(this.jugadorActual).then(()=>{


              this.mostrarAlert=true;
              setTimeout(()=>{
          
                this.mostrarAlert=false;
              
                this.navCtrl.pop();
              }, 4000);
              clearInterval(this.x);
              
              this.tiempo="juego finalizado";

              
            });
            

          }
          else
          {
            this.mensaje="!!Felicitaciones ganó el juego!!";
            this.mostrarAlert=true;
            setTimeout(()=>{
        
              this.mostrarAlert=false;
            
              this.navCtrl.pop();
            }, 4000);
            clearInterval(this.x);
            
           this.tiempo="juego finalizado";
          }
         
        
        }
       
      }, 500);
      
    }
  }

  ObtenerMesa()
  {
    let usuariosRef = firebase.database().ref("usuarios");
    usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let key in data) {

        if (data[key].correo == this.correo) {

          
          //Si noo jugo pongo mi variable a false y subo que ya jugo a firebase
        
          if(data[key].juegoFacu==undefined)
          {
            this.yaJugo=false;

            this.jugadorActual= data[key];
            this.jugadorActual.juegoFacu="si";
            this.claveJugador=   key;
           
         
 
          }//Si jugo simplemente le aviso a mi variable local.
          else
          {
            this.jugadorActual= data[key];
            this.jugadorActual.juegoFacu="si";
            this.claveJugador=   key;
            this.yaJugo=true;
          }
         
          //Siempre va a tener mesa sino sera su correo pero el campo mesa siempre estara seteado asi que tranqui
         
            this.mesa =data[key].mesa;

        }
        
      }

  }).catch(()=>{ console.log("Por las dudas");});

  }
  SubirDescuento()
  {

  
      let desc = firebase.database().ref().child("pedidos/"+this.mesa);
      desc.update({desc:"10%"});

  }
 
}
