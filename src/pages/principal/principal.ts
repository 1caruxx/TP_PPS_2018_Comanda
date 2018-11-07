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

  constructor(public navCtrl: NavController, public navParams: NavParams, private verificarTipo: VerificarTipoProvider) {

    this.acciones = this.verificarTipo.RetornarAcciones();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    if(this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {

      this.accionesRespaldoCliente = this.acciones;

      let usuarioRef = this.firebase.database().ref("usuarios");

      usuarioRef.once("value", (snap) => {

        let data = snap.val();

        for (let item in data) {

          if (data[item].correo == this.usuario.correo) {

            this.usuarioKey = item;
            break;
          }
        }
      }).then(() => {
        console.clear();
        usuarioRef.child(this.usuarioKey).child("estado").on("value", (snap) => {
          let data = snap.val();
          console.log(this.usuarioKey)
          console.log(data);

          this.acciones = [];

          switch (data) {
            /*
             * 
             * Puede hacer un pedido
             * Confeccionar encuesta
             *  
             */
            case 'atendido':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[4] : this.accionesRespaldoCliente[3];
              break;

            /*
             * 
             * Ve el estado del pedido
             * hacer un pedido X
             * Confeccionar encuesta
             *  
             */

            case 'pidio':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[2] : this.accionesRespaldoCliente[1];
              // this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[4] : this.accionesRespaldoCliente[3];
              break;

            /*
             * 
             * Pagar
             * Ve el estado del pedido X
             * hacer un pedido X
             * Confeccionar encuesta
             *  
             */

            case 'comiendo':
              this.acciones[0] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[0] : this.accionesRespaldoCliente[0];
              //this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[2] : this.accionesRespaldoCliente[1];
              //this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[3] : this.accionesRespaldoCliente[2];
              this.acciones[1] = (this.usuario.tipo == "cliente") ? this.accionesRespaldoCliente[4] : this.accionesRespaldoCliente[3];
              break;
          
            /*
             * 
             * El cliente no esta en espera, atendido, comiendo, esperando la comida, puede ser undefined o pago
             * ingresar al local
             * reservar
             *  
             */
            default:
            console.log("entre al default")
              this.acciones[0] = this.accionesRespaldoCliente[1];
              this.acciones[1] = this.accionesRespaldoCliente[5];
              break;
          }
        });
      }).catch(() => console.log("Algo salio mal...") );
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  Redireccionar(ruta) {

    this.navCtrl.push(ruta);
  }

  IrAPerfil() {
    this.navCtrl.push(PerfilPage);
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
              || this.usuario.tipo == "cajero") {

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
