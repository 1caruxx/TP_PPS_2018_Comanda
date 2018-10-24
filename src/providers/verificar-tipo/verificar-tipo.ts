import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginPage } from "../../pages/login/login";

/*
  Generated class for the VerificarTipoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VerificarTipoProvider {

  constructor() {
    console.log('Hello VerificarTipoProvider Provider');
  }

  public RetornarAcciones() {

    let acciones: Array<any> = [];
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    switch(usuario.tipo) {

      case "dueño":
        acciones = [
          { accion: "Dar de alta un dueño o supervisor.", img: "pedido.jpg", ruta: LoginPage },
          { accion: "Dar de alta un empleado.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "supervisor":
        acciones = [
          { accion: "Dar de alta un dueño o supervisor.", img: "pedido.jpg", ruta: "./" },
          { accion: "Dar de alta un empleado.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "mozo":
        acciones = [
          { accion: "Ocupar una mesa.", img: "pedido.jpg", ruta: "./" },
          { accion: "Pedir un plato y bebida.", img: "pedido.jpg", ruta: "./" },
          { accion: "Dar de alta un cliente.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "cocinero":
        acciones = [
          { accion: "Tomar un pedido.", img: "pedido.jpg", ruta: "./" },
          { accion: "Dar de alta un plato o bebida.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "bartender":
        acciones = [
          { accion: "Tomar un pedido.", img: "pedido.jpg", ruta: "./" },
          { accion: "Dar de alta un plato o bebida.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "metre":
        acciones = [
          { accion: "Dar de alta un cliente.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

      case "cajero":
        acciones = [
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" }
        ];
        break;

        case "cliente-registrado":
        acciones = [
          { accion: "Ingresar al local.", img: "pedido.jpg", ruta: "./" },
          { accion: "Hacer un pedido.", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "pedido.jpg", ruta: "./" },
          { accion: "Dar propina.", img: "pedido.jpg", ruta: "./" },
          { accion: "Reservar.", img: "pedido.jpg", ruta: "./" },
        ];
        break;
    }

    return acciones;
  }
}
