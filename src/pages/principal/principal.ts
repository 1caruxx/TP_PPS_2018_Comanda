import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { VerificarTipoProvider } from "../../providers/verificar-tipo/verificar-tipo";

import { LoginPage } from "../login/login";
import { PerfilPage } from "../perfil/perfil";

import firebase from "firebase";
import "firebase/firestore";

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  public acciones: Array<any> = [];
  public accionesRespaldoCliente: Array<any> = [];
  public usuario: any;
  public usuarioKey: any;
  public firebase = firebase;

  public estadoBoton: boolean = false;
  public ocultarAlert: boolean = true;
  public alertTitulo;
  public alertMensaje;
  public alertMensajeBoton;
  public alertHandler;

  public sonidos;

  constructor(public navCtrl: NavController, public navParams: NavParams, private verificarTipo: VerificarTipoProvider) {

    this.acciones = this.verificarTipo.RetornarAcciones();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.sonidos = localStorage.getItem("sonidos");

    if (this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {

      this.accionesRespaldoCliente = this.acciones;

      let usuarioRef = this.firebase.database().ref("usuarios");
      let pedidoRef;

      usuarioRef.once("value", (snap) => {

        let data = snap.val();

        for (let item in data) {

          if (data[item].correo == this.usuario.correo) {

            this.usuarioKey = item;
            break;
          }
        }
      }).then(() => {

        setInterval(() => {

          this.acciones = this.acciones;
        }, 500);

        usuarioRef.child(this.usuarioKey).child("estado").on("value", (snap) => {

          let data = snap.val();
          let estadoCliente = data;
          let flag = true;
          this.acciones = [];

          switch (estadoCliente) {

            case 'delivery':
              this.acciones[0] =  this.accionesRespaldoCliente[7];
              break;
            /*
             * 
             * Puede hacer un pedido
             * Jugar
             * 
             */
            case 'atendido':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[6] : this.accionesRespaldoCliente[4];
              break;

            /*
             * 
             * Ve el estado del pedido
             * hacer un pedido 
             * Jugar
             *  
             */

            case 'pidio':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[2] : this.accionesRespaldoCliente[1];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[2] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[6] : this.accionesRespaldoCliente[4];

              if (flag) {

                flag = false;
                let estaComiendo;
                usuarioRef.child(this.usuarioKey).once("value", (snap) => {

                  let data = snap.val();
                  pedidoRef = this.firebase.database().ref("pedidos").child(data.mesa);
                }).then(() => {

                  pedidoRef.on("value", (snap) => {

                    if (estadoCliente != "pago") {

                      let data = snap.val();
                      estaComiendo = true;

                      for (let item in data) {

                        if (data[item].estado && data[item].estado != "terminado") {

                          estaComiendo = false;
                          break;
                        }
                      }

                      if (estaComiendo) {

                        usuarioRef.child(this.usuarioKey).update({
                          estado: "comiendo"
                        });
                      }
                    }
                  });
                });
              }

              break;

            /*
             * 
             * Pagar
             * Ve el estado del pedido
             * hacer un pedido
             * Jugar
             *  
             */

            case 'comiendo':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[0] : this.accionesRespaldoCliente[0];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[2] : this.accionesRespaldoCliente[1];
              this.acciones[2] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[3] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[6] : this.accionesRespaldoCliente[4];
              break;

            /*
             * 
             * El cliente no esta en espera, atendido, comiendo, esperando la comida, puede ser undefined o pago
             * ingresar al local
             * reservar
             *  
             */
            default:
              this.acciones[0] = this.accionesRespaldoCliente[1];
              this.acciones[1] = this.accionesRespaldoCliente[3];
              this.acciones[2] = this.accionesRespaldoCliente[5];
              break;
          }
        });
      }).catch(() => console.log("Algo salio mal..."));
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  ionViewWillEnter() {

    if (localStorage.getItem("refrescarImagen") == "true") {

      localStorage.setItem("refrescarImagen", "false");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
  }

  Redireccionar(ruta) {

    this.navCtrl.push(ruta);
  }

  IrAPerfil() {
    this.navCtrl.push(PerfilPage);
  }

  AlternarSonidos() {

    if (localStorage.getItem("sonidos") == "false") {

      localStorage.setItem("sonidos", "true");
      this.sonidos = "true";
    } else {

      localStorage.setItem("sonidos", "false");
      this.sonidos = "false";
    }

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

  Logout() {

    let usuariosRef = this.firebase.database().ref("usuarios");

    usuariosRef.once("value", (snap) => {

      let data = snap.val();

      for (let item in data) {

        if (data[item].correo == this.usuario.correo) {

          usuariosRef.child(item).update({
            logueado: false
          }).then(() => {

            switch (this.usuario.tipo) {

              case 'mozo':
              case 'cocinero':
              case 'bartender':
              case 'metre':
              case 'repartidor':
                localStorage.clear();
                this.navCtrl.setRoot(LoginPage);
                break;

              default:
                localStorage.clear();
                this.navCtrl.setRoot(LoginPage);
                break;
            }
          });

          break;
        }
      }
    });
  }
}