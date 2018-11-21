import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from "../login/login";

import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-juego-fer',
  templateUrl: 'juego-fer.html',
})
export class JuegoFerPage {

  // { pregunta: "", respuesta: "" },

  public preguntas: Array<any>;
  public indice: number;
  public respuestaUsuario;
  public preguntaSeleccionada: any;
  public preguntasAcertadas: number;
  public puedeGanarPostre: boolean;

  public firebase = firebase;
  public usuario: any;
  public usuarioKey;
  public usuarioMesa;

  public estadoBoton: boolean = true;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;
  public ocultarSpinner = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {

    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.puedeGanarPostre = true;

    this.MostrarAlert("Preguntas y respuestas", "Responde correctamente 5 preguntas aleatorias seguidas para ganar! Un postre gratis espera a quienes triunfen en el primer intento!", "Hecho", this.EmpezarJuego)

    let usuariosRef = firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          this.usuarioKey = item;
          this.usuarioMesa = data[item].mesa;

          if (data[item].juegoFer) {
            this.puedeGanarPostre = false;
          }
        }
      }
    }).then(() => {

      this.estadoBoton = false;
      this.ocultarSpinner = true;
    });

    /*this.preguntas = [
      { pregunta: "¿Cuál es la ciudad más poblada del mundo?", respuesta: "tokio", respuesta2: "tokyo" },
      { pregunta: "¿Cuantos huesos tiene el cuerpo humano?", respuesta: "206", respuesta2: "tiene 206", respuesta3: "206 huesos", respuesta4: "tiene 206 huesos" },
      { pregunta: "¿Cuál es el río más grande del mundo?", respuesta: "nilo", respuesta2: "el nilo", respuesta3: "el rio nilo" },
      { pregunta: "¿De donde son originarios los juegos olímpicos?", respuesta: "olimpia", respuesta2: "de olimpia", respuesta3: "olimpia, grecia", respuesta4: "de olimpia, grecia", respuesta5: "son originarios de olimpia", respuesta6: "son originarios de olimpia, grecia", respuesta7: "son originarios de grecia, olimpia" },
      { pregunta: "¿Quién escribió \"La Odisea\"?", respuesta: "homero", respuesta2: "la escribio homero", respuesta3: "fue homero", respuesta4: "fue homero quien la escribio" },
      { pregunta: "¿Quién pintó \"La última cena\"?", respuesta: "leonardo da vinci", respuesta2: "da vinci", respuesta3: "la pinto da vinci", respuesta4: "la pinto leonardo da vinci" },
      { pregunta: "¿Cuál es el país más grande del mundo?", respuesta: "rusia", respuesta2: "es rusia" },
      { pregunta: "¿En que año empezó la segunda guerra mundial?", respuesta: "1939", respuesta2: "en 1939", respuesta3: "empezo en 1939", respuesta4: "en el 1939", respuesta5: "en el ano 1939", respuesta6: "empezo en el ano 1939" },
      { pregunta: "¿Cuál es el quinto planeta en el sistema solar?", respuesta: "jupiter", respuesta2: "es jupiter" },
      { pregunta: "¿Cuál es la capital de Suecia?", respuesta: "estocolmo", respuesta2: "es estocolmo", respuesta3: "la capital es estocolmo", respuesta4: "la capital de suecia es estocolmo" },
      { pregunta: "¿Cuál es el nombre oficial de la lengua china?", respuesta: "mandarin", respuesta2: "el mandarin" },
      { pregunta: "¿Como se llama la estación espacial rusa?", respuesta: "mir", respuesta2: "se llama mir" },
      { pregunta: "¿Cuál fue el primer metal que empleó el hombre?", respuesta: "cobre", respuesta2: "el cobre" },
      { pregunta: "¿De que lengua proviene el español?", respuesta: "latin", respuesta2: "del latin", respuesta3: "viene del latin", respuesta4: "proviene del latin" },
      { pregunta: "¿Quién originó la frase \"solo sé que no sé nada\"?", respuesta: "socrates", respuesta2: "fue socrates", respuesta3: "la origino socrates", respuesta4: "fue socrates quien la origino", respuesta5: "fue socrates quien la creo", respuesta6: "la creo socrates" },
      { pregunta: "¿Quién es el autor de la novela \"Don Quijote de la Mancha\"?", respuesta: "miguel de cervantes", respuesta2: "es miguel de cervantes" },
      { pregunta: "¿Qué instrumento óptico permite ver los astros de cerca?", respuesta: "telescopio", respuesta2: "el telescopio" },
      { pregunta: "¿Cuál es el único mamífero capaz de volar?", respuesta: "murcielago", respuesta2: "el murcielago" },
      { pregunta: "¿Cuantos dientes tiene una persona adulta?", respuesta: "32", respuesta2: "tiene 32", respuesta3: "tiene 32 dientes", respuesta4: "32 dientes" },
      { pregunta: "Según los escritos bíblicos, ¿Quién traicionó a Jesús?", respuesta: "judas", respuesta2: "fue judas", respuesta3: "judas traiciono a jesus", respuesta4: "fue judas quien traiciono a jesus" },
      { pregunta: "¿Cuántos años duró la guerra de los 100 años?", respuesta: "116", respuesta2: "116 anos", respuesta3: "duro 116", respuesta4: "duro 116 anos" },
      { pregunta: "¿Como se llama la ciencia que estudia los mapas?", respuesta: "cartografia", respuesta2: "se llama cartografia", respuesta3: "la cartografia" },
      { pregunta: "¿Cuál es el lugar más frío de la tierra?", respuesta: "antartida", respuesta2: "la antartida" },
      { pregunta: "¿En que país se encuentra la torre de Pisa?", respuesta: "italia", respuesta2: "en italia", respuesta3: "esta en italia", respuesta4: "se encuentra en italia", respuesta5: "la torre de pisa se encuentra en italia" },
      { pregunta: "¿En que año llegó Cristóbal Colón a América?", respuesta: "1942", respuesta2: "en 1942", respuesta3: "llego en 1942", respuesta4: "en el ano 1942", respuesta5: "llego en el ano 1942", respuesta6: "en el 1942" },
      { pregunta: "¿Donde se encuentra la famosa \"Torre Eiffel\"?", respuesta: "paris", respuesta2: "francia", respuesta3: "en paris", respuesta4: "en francia", respuesta5: "paris, francia", respuesta6: "francia, paris", respuesta7: "en paris, francia", respuesta8: "en francia, paris" },
      { pregunta: "¿En qué lugar del cuerpo se produce la insulina?", respuesta: "pancreas", respuesta2: "en el pancreas" },
      { pregunta: "¿Qué rama de la biología estudia los animales?", respuesta: "zoologia", respuesta2: "la zoologia", respuesta3: "los estudia la zoologia", respuesta4: "los estudia la zoologia", respuesta5: "la rama zoologia", respuesta6: "los estudia la rama zoologia" }
    ];*/
    this.preguntas = [
      { pregunta: "¿Cuál es la ciudad más poblada del mundo?", respuesta: "Tokio", opcion1: "Nueva York", opcion2: "Tokio", opcion3: "Seúl" , opcion4: "Los Ángeles" },
      { pregunta: "¿Cuantos huesos tiene el cuerpo humano?", respuesta: "206", opcion1: "208", opcion2: "200", opcion3: "206", opcion4: "210"},
      { pregunta: "¿Cuál es el río más grande del mundo?", respuesta: "Río Amazonas", opcion1: "Río Amazonas", opcion2: "Nilo", opcion3: "Río Misisipi", opcion4: "Río Amarillo" },
      { pregunta: "¿De donde son originarios los juegos olímpicos?", respuesta: "Olimpia", opcion1: "Londres", opcion2: "Chipre", opcion3: "Cerdeña", opcion4: "Olimpia" },
      { pregunta: "¿Quién escribió \"La Odisea\"?", respuesta: "Homero", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
      { pregunta: "¿Quién pintó \"La última cena\"?", respuesta: "Leonardo da Vinci", opcion1: "Pablo Picasso", opcion2: "Vincent van Gogh", opcion3: "Leonardo da Vinci", opcion4: "Salvador Dalí" },
      { pregunta: "¿Cuál es el país más grande del mundo?", respuesta: "Rusia", opcion1: "Estados Unidos", opcion2: "Rusia", opcion3: "Brazil", opcion4: "Australia" },
      { pregunta: "¿En que año empezó la segunda guerra mundial?", respuesta: "1939", opcion1: "1940", opcion2: "1935", opcion3: "1942", opcion4: "1939" },
      { pregunta: "¿Cuál es el quinto planeta en el sistema solar?", respuesta: "Júpiter", opcion1: "Júpiter", opcion2: "Urano", opcion3: "Marte", opcion4: "Venus" },
      { pregunta: "¿Cuál es la capital de Suecia?", respuesta: "Estocolmo", opcion1: "Gotemburgo", opcion2: "Upsala", opcion3: "Estocolmo", opcion4: "Kalmar" },
      { pregunta: "¿Cuál es el nombre oficial de la lengua china?", respuesta: "Mandarín", opcion1: "Chino", opcion2: "Hiragano", opcion3: "Asiático", opcion4: "Mandarín" },
      { pregunta: "¿Como se llama la estación espacial rusa?", respuesta: "MIR", opcion1: "NASA", opcion2: "MIR", opcion3: "ISS", opcion4: "La Salyut" },
      { pregunta: "¿Cuál fue el primer metal que empleó el hombre?", respuesta: "Cobre", opcion1: "Cobre", opcion2: "Acero", opcion3: "Plata", opcion4: "Titanio" },
      { pregunta: "¿De que lengua proviene el español?", respuesta: "Latín", opcion1: "Italiano", opcion2: "Griego", opcion3: "Castellano", opcion4: "Latín" },
      { pregunta: "¿Quién originó la frase \"solo sé que no sé nada\"?", respuesta: "Sócrates", opcion1: "Platón", opcion2: "Sócrates", opcion3: "Aristóteles", opcion4: "Pitágoras" },
      { pregunta: "¿Quién es el autor de la novela \"Don Quijote de la Mancha\"?", respuesta: "Miguel de Cervantes", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
      { pregunta: "¿Qué instrumento óptico permite ver los astros de cerca?", respuesta: "Telescopio", opcion1: "Telescopio", opcion2: "Microscopio", opcion3: "Television", opcion4: "Lupa" },
      { pregunta: "¿Cuál es el único mamífero capaz de volar?", respuesta: "Murciélago", opcion1: "Colibrí barbinegro", opcion2: "Pez volador", opcion3: "Búho", opcion4: "Murciélago" },
      { pregunta: "¿Cuantos dientes tiene una persona adulta?", respuesta: "32", opcion1: "32", opcion2: "35", opcion3: "30", opcion4: "34" },
      { pregunta: "Según los escritos bíblicos, ¿Quién traicionó a Jesús?", respuesta: "Judas", opcion1: "Abel", opcion2: "Jacob‎", opcion3: "Judas", opcion4: "Moisés‎" },
      { pregunta: "¿Cuántos años duró la guerra de los 100 años?", respuesta: "116 años", opcion1: "100 años", opcion2: "116 años", opcion3: "117 años", opcion4: "105 años" },
      { pregunta: "¿Como se llama la ciencia que estudia los mapas?", respuesta: "Cartografía", opcion1: "Cartografía", opcion2: "Geografía", opcion3: "Oceanografía", opcion4: "Ciencias sociales" },
      { pregunta: "¿Cuál es el lugar más frío de la tierra?", respuesta: "La antartida", opcion1: "Polo sur", opcion2: "Polo norte", opcion3: "Tierra del Fuego", opcion4: "La antartida" },
      { pregunta: "¿En que país se encuentra la torre de Pisa?", respuesta: "Italia", opcion1: "Grecia", opcion2: "Francia", opcion3: "Portugal", opcion4: "Italia" },
      { pregunta: "¿En que año llegó Cristóbal Colón a América?", respuesta: "1942", opcion1: "1940", opcion2: "1942", opcion3: "1937", opcion4: "1945" },
      { pregunta: "¿Donde se encuentra la famosa \"Torre Eiffel\"?", respuesta: "Francia", opcion1: "Francia", opcion2: "Grecia", opcion3: "Portugal", opcion4: "Italia" },
      { pregunta: "¿En qué lugar del cuerpo se produce la insulina?", respuesta: "En el pancreas", opcion1: "En el apéndice", opcion2: "En la vejiga", opcion3: "En el estómago", opcion4: "En el pancreas" },
      { pregunta: "¿Qué rama de la biología estudia los animales?", respuesta: "La zoología", opcion1: "La zoología", opcion2: "La biología", opcion3: "La entomología", opcion4: "La ornitología" }
    ];
    this.preguntasAcertadas = 0;

    this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;

    this.preguntaSeleccionada = this.preguntas[this.indice];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoFerPage');
  }

  Validar() {

    // if (!this.respuestaUsuario) {
    //   this.presentToast("No olvides escribir tu respuesta.");
    //   return;
    // }

    // let respuestaAux = this.respuestaUsuario;

    // respuestaAux = respuestaAux.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    // respuestaAux = respuestaAux.toLowerCase();

    // console.log("respuesta del usuario: " + respuestaAux);

    // if (respuestaAux == this.preguntaSeleccionada.respuesta
    //   || respuestaAux == this.preguntaSeleccionada.respuesta2
    //   || respuestaAux == this.preguntaSeleccionada.respuesta3
    //   || respuestaAux == this.preguntaSeleccionada.respuesta4
    //   || respuestaAux == this.preguntaSeleccionada.respuesta5
    //   || respuestaAux == this.preguntaSeleccionada.respuesta6
    //   || respuestaAux == this.preguntaSeleccionada.respuesta7
    //   || respuestaAux == this.preguntaSeleccionada.respuesta8) {
    console.log(this.respuestaUsuario);

    if(this.respuestaUsuario == this.preguntaSeleccionada.respuesta) {

      this.NuevaPregunta();

    } else {

      this.estadoBoton = true;
      this.ocultarSpinner = false;
      this.MostrarAlert("¡Respuesta incorrecta!", `Más suerte la próxima.`, "Volver", this.Volver);

      firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(() => {
        this.estadoBoton = false;
        this.ocultarSpinner = true;
      }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));

    }

  }

  NuevaPregunta() {

    this.preguntasAcertadas++;

    if (this.preguntasAcertadas == 5) {

      if (this.puedeGanarPostre) {

        this.estadoBoton = true;
        this.ocultarSpinner = false;
        this.MostrarAlert("Ganaste!", "Tu postre gratis aguarda!", "Volver", this.Volver);

        firebase.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(() => {

          firebase.database().ref("pedidos").child(this.usuarioMesa).child("cocinero").push({
            cantidad: 1,
            nombre: "postre gratuito",
            precio: 0
          }).then(() => {
            firebase.database().ref("pedidos").child(this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(() => {
              this.estadoBoton = false;
              this.ocultarSpinner = true;
            })
          })
        }).catch(() => this.presentToast("Ups... Tenemos problemas técnicos."));
      } else {

        this.MostrarAlert("Ganaste!", "", "Volver", this.Volver);
      }
    } else {

      this.presentToast("¡Respuesta correcta!");
      this.preguntas.splice(this.indice, 1);
      this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;
      this.preguntaSeleccionada = this.preguntas[this.indice];
      this.respuestaUsuario = undefined;
    }

  }

  EmpezarJuego() {
    this.OcultarAlert();
  }

  MostrarAlert(titulo: string, mensaje: string, mensajeBoton: string, handler) {
    this.ocultarAlert = false;
    this.alertTitulo = titulo;
    this.alertMensaje = mensaje;
    this.alertMensajeBoton = mensajeBoton;
    this.alertHandler = handler;
  }

  OcultarAlert() {
    this.ocultarAlert = true;
  }

  Volver() {
    this.navCtrl.pop();
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

  Logout() {

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

              // Para redireccionar a la encuesta de axel.
              // localStorage.setItem("desloguear", "true");
              // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);

              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            } else {

              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            }
          });

          break;
        }
      }
    });
  }

}
