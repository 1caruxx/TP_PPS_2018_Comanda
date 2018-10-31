import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";



/**
 * Generated class for the PedirPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pedir-platos',
  templateUrl: 'pedir-platos.html',
})
export class PedirPlatosPage {
  @ViewChild('cant') cant:any;


  ocultarPlatos:boolean;
  cantidad:number;
  titulo:string;
  platos:any[]=[];
  bebidas:any[]=[];
  foto1;
  foto2;
  foto3;
  nombre;
  desc;
  foto;
  pedido:any[]=[];
  ocultarBebidas:boolean;
  for="let plato of platos";
  mostrarslide:boolean;
  ocultarTitulo:boolean;
contador;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ocultarPlatos = true;
    this.ocultarBebidas=true;
    this.mostrarslide=false;
    this.TraerPlatos();
    this.contador=0;
    this.ocultarTitulo=false;
this.foto="";
  

  }
  onChangeTime(value)
  {
    this.cantidad=value;
  }
  ionViewDidLoad() {
  }
  swipeLeftEvent($event)
  {
    console.log($event.direction);
    if($event.direction==4)
    {
      if(this.contador==0)
      {
        return;
      }
      if(this.contador==1)
      {
        this.foto=this.foto1;
        this.contador=0;
        return;
      }
      if(this.contador==2)
      {
        this.foto=this.foto2;
        this.contador=1;
        return;
      }
      
    }
    if($event.direction==2)
    {
      if(this.contador==0)
      {
        this.foto=this.foto2;
        this.contador=1;
        return;
      }
      if(this.contador==1)
      {
        this.foto=this.foto3;
        this.contador=2;
        return;
      }
      if(this.contador==2)
      {
        return;
    
      }
    }
  
  }
  ElegirPlato(nombre, valor)
  {
    

   
 
 
   


    this.pedido.push({cant:valor, nombre:nombre});
    console.log(this.pedido);
    (window.document.querySelector('#'+nombre) as HTMLElement).classList.add("mostrarElegido");
  }
  mostrarSlide(foto1,foto2,foto3,nombre,desc)
  {
    this.foto= foto1;
    this.foto1 =foto1;
    this.foto2 =foto2;
    this.foto3 =foto3;
    this.nombre = nombre;
    this.desc=desc;
    this.mostrarslide=true;
  }
  Platos()
  {
    this.ocultarPlatos =false;
    this.ocultarTitulo=true;
    this.titulo ="Nuestros platos";

  }
  Bebidas()
  {
  
    this.ocultarBebidas =false;
    this.titulo ="Nuestras bebidas" ;

  }
  Cerrar()
  {
    this.ocultarPlatos =true;
    this.ocultarTitulo=false;
    this.ocultarBebidas=true;


  }
  cerrarSlide()
  {
    this.mostrarslide=false;
    this.contador=0;

  }
  TraerPlatos()
  {
      let mensaje = firebase.database().ref().child("platos/");
 mensaje.on("value",(snap)=>{
 
var data =snap.val();
       this.platos =[];
       this.bebidas=[];
        for(var key in data)
        {
          if(data[key].carga.es=="plato")
          {
            this.platos.push(data[key]);
          }
          else
          {
            this.bebidas.push(data[key]);
          }

          

        }
 
        


      });
  }
  AceptarPedido()
  {
    this.Cerrar();
  }
  CancelarPedido()
  {
    for(let i=0;i<this.pedido.length;i++)
    {
      (window.document.querySelector('#'+this.pedido[i].nombre) as HTMLElement).classList.remove("mostrarElegido");
    }
    this.pedido.splice(0, this.pedido.length);
    console.log(this.pedido);
    
    this.Cerrar();
   
 
  }
  PedirFinal()
  {
    let mensaje = firebase.database().ref().child("pedidos");
    let nodo= mensaje.push("Ignorar").key;
    let mensaje2 = firebase.database().ref().child("pedidos/"+nodo);
    for(let i=0;i<this.pedido.length;i++)
    {
      mensaje2.push(this.pedido[i]);
    }
  }
}
