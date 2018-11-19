import { Injectable } from '@angular/core';

import { AltaDuenioSupervisorPage } from "../../pages/alta-duenio-supervisor/alta-duenio-supervisor";
import { AltaEmpleadoPage } from "../../pages/alta-empleado/alta-empleado";
import { ListadoSupervisorPage } from "../../pages/listado-supervisor/listado-supervisor";
import { ReservaPage } from "../../pages/reserva/reserva";
import { CuentaPage } from "../../pages/cuenta/cuenta";
import { ListadoReservasPage } from "../../pages/listado-reservas/listado-reservas";

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
          { accion: "Nueva mesa", img: "ocupar-mesa.jpg", ruta: "./" }
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
          { accion: "Ocupar una mesa", img: "ocupar-mesa.jpg", ruta: "./" },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: "./" },
          { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "cocinero":
        acciones = [
          { accion: "Tomar un pedido", img: "pedido.jpg", ruta: "./" },
          { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "bartender":
        acciones = [
          { accion: "Tomar un pedido", img: "pedido.jpg", ruta: "./" },
          { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "metre":
        acciones = [
          { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
        ];
        break;

      case "repartidor":
        acciones = [
          { accion: "Mapa de ruta", img: "mapa.jpg", ruta: "./" }
        ];
        break;

        case "cliente":
        acciones = [
          { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
          { accion: "Ingresar al local", img: "entrada.jpg", ruta: "./" },
          { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: "./" },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" },
          { accion: "Reservar", img: "reserva.jpg", ruta: ReservaPage },
          { accion: "Juegos", img: "juegos.jpg", ruta: "./" }
        ];
        break;

        case "anonimo":
        acciones = [
          { accion: "Pagar", img: "propina.jpg", ruta: CuentaPage },
          { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: "./" },
          { accion: "Hacer un pedido", img: "pedido.jpg", ruta: "./" },
          { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: "./" },
          { accion: "Juegos", img: "juegos.jpg", ruta: "./" }
        ];
        break;
    }

    return acciones;
  }
}
