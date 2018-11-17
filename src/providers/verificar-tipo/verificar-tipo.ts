import { Injectable } from '@angular/core';

import { AltaDuenioSupervisorPage } from "../../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { AltaEmpleadoPage } from "../../pages/alta-empleado/alta-empleado";
import { ListadoSupervisorPage } from "../../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../../pages/reserva/reserva";
import { CuentaPage } from "../../pages/cuenta/cuenta";
import { ListadoReservasPage } from "../../pages/listado-reservas/listado-reservas";

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
import { JuegoQuinterosPage } from "../../pages/juego-quinteros/juego-quinteros";
import { JuegoPage } from "../../pages/juego/juego";

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
          { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
          { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
          { accion: "Nueva mesa", img: "ocupar-mesa.jpg", ruta: AltaDeMesaPage }
        ];
        break;

      case "supervisor":
        acciones = [
          { accion: "Confirmar reservas", img: "reserva.jpg", ruta: ListadoReservasPage },
          { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: AltaDuenioSupervisorPage },
          { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: AltaEmpleadoPage },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: ListadoSupervisorPage }
        ];
        break;

      case "mozo":
        acciones = [
          { accion: "Ocupar una mesa", img: "ocupar-mesa.jpg", ruta: QrDeLaMesaPage },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: RegistroClientePage }
          // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
        ];
        break;

      case "cocinero":
        acciones = [
          { accion: "Tomar un pedido", img: "pedido.jpg", ruta: TomarPedidoPage },
          { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: AltaPlatosPage }
          // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
        ];
        break;

      case "bartender":
        acciones = [
          { accion: "Tomar un pedido", img: "pedido.jpg", ruta: TomarPedidoPage },
          { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: AltaPlatosPage }
          // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "metre":
        acciones = [
          { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: RegistroClientePage }
          // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "repartidor":
        acciones = [
          { accion: "Mapa de ruta", img: "mapa.jpg", ruta: MapaDeRutaPage }
        ];
        break;

        case "cliente":
        acciones = [
          { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
          { accion: "Ingresar al local", img: "entrada.jpg", ruta: QrIngresoLocalPage },
          { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: QrDeLaMesaPage },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaClientePage },
          { accion: "Reservar", img: "reserva.jpg", ruta: ReservaPage },
          { accion: "juego facu", img: "juegos.jpg", ruta: JuegoPage },
          { accion: "juego axel", img: "juegos.jpg", ruta: JuegoQuinterosPage }
        ];
        break;

        case "anonimo":
        acciones = [
          { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
          { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: QrDeLaMesaPage },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: PedirPlatosPage },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: EncuestaClientePage },
          { accion: "juego facu", img: "juegos.jpg", ruta: JuegoPage },
          { accion: "juego axel", img: "juegos.jpg", ruta: JuegoQuinterosPage }
        ];
        break;
    }

    return acciones;
  }
}
