import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AltaDuenioSupervisorPage } from "../../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { AltaEmpleadoPage } from "../../pages/alta-empleado/alta-empleado";
import { ListadoSupervisorPage } from "../../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../../pages/reserva/reserva";

import { RegistroClientePage } from '../../pages/registro-cliente/registro-cliente';
import { AltaPlatosPage } from '../../pages/alta-platos/alta-platos';
import { QrIngresoLocalPage } from '../../pages/qr-ingreso-local/qr-ingreso-local';
import {  EncuestaClientePage } from '../../pages/encuesta-cliente/encuesta-cliente';
import { PedirPlatosPage } from '../../pages/pedir-platos/pedir-platos';

import { AltaDeMesaPage } from '../../pages/alta-de-mesa/alta-de-mesa';
import { EncuestaDeEmpleadoPage } from '../../pages/encuesta-de-empleado/encuesta-de-empleado';
import { QrDeLaMesaPage } from '../../pages/qr-de-la-mesa/qr-de-la-mesa';
import { TomarPedidoPage } from '../../pages/tomar-pedido/tomar-pedido';
import { MapaDeRutaPage } from '../../pages/mapa-de-ruta/mapa-de-ruta';

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
          { accion: "Nuevo dueño o supervisor.", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
          { accion: "Nuevo empleado.", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
          { accion: "Nueva mesa.", img: "ocupar-mesa.jpg", ruta: AltaDeMesaPage }
        ];
        break;

      case "supervisor":
        acciones = [
          { accion: "Nuevo dueño o supervisor.", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
          { accion: "Nuevo empleado.", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: ListadoSupervisorPage },
          { accion: "Nueva mesa.", img: "ocupar-mesa.jpg", ruta: AltaDeMesaPage }
        ];
        break;

      case "mozo":
        acciones = [
          { accion: "Ocupar una mesa.", img: "ocupar-mesa.jpg", ruta: QrDeLaMesaPage },
          { accion: "Hacer un pedido.", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Nuevo cliente.", img: "nuevo-cliente.jpg", ruta: RegistroClientePage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage },
          { accion: "Mapa de ruta.", img: "encuesta.jpg", ruta: MapaDeRutaPage }
        ];
        break;

      case "cocinero":
        acciones = [
          { accion: "Tomar un pedido.", img: "pedido.jpg", ruta: TomarPedidoPage },
          { accion: "Nuevo plato o bebida.", img: "nueva-comida.jpg", ruta: AltaPlatosPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
        ];
        break;

      case "bartender":
        acciones = [
          { accion: "Tomar un pedido.", img: "pedido.jpg", ruta: TomarPedidoPage },
          { accion: "Nuevo plato o bebida.", img: "nueva-comida.jpg", ruta: AltaPlatosPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
        ];
        break;

      case "metre":
        acciones = [
          { accion: "Ocupar una mesa.", img: "ocupar-mesa.jpg", ruta: QrDeLaMesaPage },
          { accion: "Nuevo cliente.", img: "nuevo-cliente.jpg", ruta: RegistroClientePage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
        ];
        break;

      case "cajero":
        acciones = [
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

        case "cliente-registrado":
        acciones = [
          { accion: "Ingresar al local.", img: "entrada.jpg", ruta: QrIngresoLocalPage },
          { accion: "Hacer un pedido.", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaClientePage },
          { accion: "Dar propina.", img: "propina.jpg", ruta: "./" },
          { accion: "Reservar.", img: "reserva.jpg", ruta: ReservaPage }
        ];
        break;

        case "cliente-anonimo":
        acciones = [
          { accion: "Ingresar al local.", img: "entrada.jpg", ruta: QrIngresoLocalPage },
          { accion: "Hacer un pedido.", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaClientePage },
          { accion: "Dar propina.", img: "propina.jpg", ruta: "./" }
        ];
        break;
    }

    return acciones;
  }
}
