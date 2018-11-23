import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from "firebase";
/**
 * Generated class for the JuegoQuinterosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego-quinteros',
  templateUrl: 'juego-quinteros.html',
})
export class JuegoQuinterosPage {

  public segundos;
  puntajeMaximo=0;
  //JWTHelper = new JwtHelperService();
 // token = this.JWTHelper.decodeToken(localStorage.getItem("token"));
  n1;
  n2;
  answer;
  question;
  userAnswer;
  public operador: number;
  primeraVezJugando=0;
  asd;
  public meta=3;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  public firebase = firebase;
  public usuario: any;
  public usuarioKey;
  public usuarioMesa;
  public puedeGanarBebida: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.puedeGanarBebida=true;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));


    let usuariosRef = firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          this.usuarioKey = item;
          this.usuarioMesa = data[item].mesa;

          if (data[item].juegoAxel) {
            this.puedeGanarBebida = false;
          }
        }
      }
    })



    this.getNewQuestion();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoQuinterosPage');
  }


  Timer() 
  {

  
   this.asd=  setInterval(() => {

      this.segundos--;

      if (this.segundos == 0) {
      
        this.MostrarAlert("¡Perdió!", "Se le acabó el tiempo para responder.", "Aceptar", this.limpiar);
        firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true });
        //alert("Se acabo el tiempo");
        clearInterval(this.asd);
        this.navCtrl.pop();
        
        
        
      }


    }, 1000);

    

    

    
  }





  getNewQuestion()   
    {

      if(this.primeraVezJugando==0)
      {
        this.Timer();
      }



      this.segundos=15;
   
        this.operador = Math.floor(Math.random() * (4 - 1)) + 1;
        this.n1 = Math.floor(Math.random() * (50 - 1)) + 1;
        this.n2 = Math.floor(Math.random() * (50 - 1)) + 1;
    
        switch (this.operador) {
    
          case 1:
            this.question = `${this.n1} + ${this.n2} = `;
            this.answer = this.n1 + this.n2;
            break;
    
          case 2:
            this.question = `${this.n1} - ${this.n2} = `;
            this.answer = this.n1 - this.n2;
            break;
    
          case 3:
            this.n1 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
            this.n2 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
            this.question = `${this.n1} X ${this.n2} = `;
            this.answer = this.n1 * this.n2;
            break;
    
          default:
            
        }



    }


    onSubmitAnswer() 
    {

      if(!this.userAnswer)
      {
          //alert("No escribio ninguna respuesta");
          this.MostrarAlert("¡Error!", "No escribió ninguna respuesta.", "Aceptar", this.limpiar);
          return;
      }



      if (parseInt(this.userAnswer) == this.answer) 
      {
          //alert("respuesta correcta");
          this.MostrarAlert("¡Respuesta correcta!", "Tiene que acertar 3 veces.", "Aceptar", this.limpiar);
          this.userAnswer="";
          this.puntajeMaximo++;
          this.primeraVezJugando++;
          this.getNewQuestion();
          if(this.puntajeMaximo==this.meta)
          {
            //alert("Enhorabuena,usted gano el juego");
            //this.MostrarAlert("Gano!!", "Se gano su bebida gratis", "Aceptar", this.limpiar);
            this.question=="";
            this.segundos==0;
            clearInterval(this.asd);      
            
            if (this.puedeGanarBebida) 
            {


            

              this.estadoBoton = true;
              //this.ocultarSpinner = false;
              this.MostrarAlert("¡Ganaste!", "¡Tu bebida gratis aguarda!", "Volver", this.limpiar);
      
              firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true }).then(() => {
      
                firebase.database().ref("pedidos").child(this.usuarioMesa).child("cocinero").push({
                  cantidad: 1,
                  nombre: "bebida gratuita",
                  precio: 0
                }).then(() => {
                  firebase.database().ref("pedidos").child(this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(() => {
                    this.estadoBoton = false;
                   // this.ocultarSpinner = true;
                   //this.navCtrl.pop();
                  })
                })
              });
            } 

            else {

              this.MostrarAlert("¡Ganaste!", "", "Volver", this.limpiar);
              this.navCtrl.pop();
            }
          }

        }

        
      
      else 
      {
        //alert("respuesta incorrecta");
        this.MostrarAlert("¡Perdió!", "¡Escribió un número incorrecto.", "Aceptar", this.limpiar);
        firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true })
        clearInterval(this.asd);
        this.navCtrl.pop();

      
      }
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

  volver()
  {
    clearInterval(this.asd);
    this.navCtrl.pop();
  }






}
