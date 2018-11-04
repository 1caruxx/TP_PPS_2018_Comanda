import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';



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
  contErrores:number=0;
  mensaje:string;
  mostrarAlert:boolean=false;
  ocultarPlatos:boolean;
  cantidad:number;
  titulo:string;
  platos:any[]=[];
  bebidas:any[]=[];
  mostrarAlert2:boolean=false;
  mostrarAlert3:boolean=false;
  valor:number;
  foto1;
  foto2;
  foto3;
  nombre;
  desc;
  cantidadNueva=undefined;
  tipo:string;
  tipo1:string;
  mesa;
  foto;
  correo:string;
  pedido:any[]=[];
  ocultarBebidas:boolean;
  for="let plato of platos";
  mostrarslide:boolean;
  ocultarTitulo:boolean;
contador;
  constructor(public navCtrl: NavController, public navParams: NavParams,   private authInstance: AngularFireAuth,private alertCtrl: AlertController) {
    this.ocultarPlatos = true;
    this.ocultarBebidas=true;
    this.mostrarslide=false;
    this.TraerPlatos();
    this.contador=0;
  this.tipo1 = localStorage.getItem("usuario");
  this.tipo1 =(JSON.parse(this.tipo1)).tipo;
    this.ocultarTitulo=false;
    this.correo=localStorage.getItem("usuario");

    this.correo =(JSON.parse(this.correo)).correo;
    this.mensaje="Su pedido ha sido enviado en breve se lo llevaremos...";
this.foto="";

this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
if(this.tipo1=="mozo")
{
  this.mostrarAlert2=true;
}
    this.TraerTipoMesa();
   
  }
  onChangeTime(value)
  {
    this.cantidad=value;
  }
  ionViewDidLoad() {
 
  }
  CancelarAlert2()
  {
    this.navCtrl.pop();
  }
  AceptarAlert2()
  {
    if(!this.mesa)
    {
      alert("ingrese el numero de mesa");
      return;
    }
    this.mostrarAlert2=false;
   
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
  ElegirPlato(nombre, valor, es, tiempo)
  {
    
    
    if(valor<=0 )
    {
      if(this.contErrores==3)
      {
        this.contErrores=0;
        this.mensaje="Coloque la cantidad del elemento del menu";
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
        }, 3000);
        return;
      }
      this.contErrores++;
     
      return;
    }

    if(tiempo=="cero")
    {
      tiempo=0;
    }
 
  
   


    this.pedido.push({cant:valor, nombre:nombre, es:es, tiempo});
    console.log(this.pedido);
    (window.document.querySelector('#'+nombre) as HTMLElement).classList.add("mostrarElegido");
    valor=0;
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
  

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Mesa',
      inputs: [
        {
          name: 'mesa',
          placeholder: 'Ingrese numero de mesa'
        },
        {
          name: 'number',
          placeholder: 'numero',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.mesa=data;
          }
        }
      ]
    });
    alert.present();
  }
  Platos()
  {

    this.valor=null;
    console.log(this.valor);
    this.ocultarPlatos =false;
    this.ocultarTitulo=true;
    this.titulo ="Nuestros platos";

  }
  Bebidas()
  {
    this.ocultarPlatos =true;
    this.valor=undefined;
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
    this.valor=undefined;
    this.Cerrar();
   
 
  }
  PedirFinal()
  {
    if(this.pedido.length<=0)
    {
      this.mensaje="No agrego ningun pedido a la orden";
      this.mostrarAlert3=true;
      setTimeout(()=>{

        this.mostrarAlert3=false;
      }, 2000);
      return;
    }
  
    let mensaje = firebase.database().ref().child("pedidos/"+"mesa"+this.mesa+"/cocinero");
    let mensaje2 = firebase.database().ref().child("pedidos/"+"mesa"+this.mesa+"/bartender");
   let tiempoMax=0;
   let nodoPadre:any;
    for(let i=0;i<this.pedido.length;i++)
    {

      console.log(this.pedido[i].es);
      if(this.pedido[i].es=="bebida")
      {
        mensaje2.push({nombre:this.pedido[i].nombre, cantidad:this.pedido[i].cant});
        break;
      }
      if(this.pedido[i].es=="plato")
      {
        if(tiempoMax<this.pedido[i].tiempo)
        {
          tiempoMax=this.pedido[i].tiempo;
        }
        mensaje.push({nombre:this.pedido[i].nombre, cantidad:this.pedido[i].cant});
      }

      
    }
    mensaje.update({estado:"tomado"});
    mensaje2.update({estado:"tomado"});

    let mensaje3  =firebase.database().ref().child("pedidos/"+"mesa"+this.mesa);
    mensaje3.update({tiempo:tiempoMax}).then(()=>{
      for(let i=0;i<this.pedido.length;i++)
      {
        (window.document.querySelector('#'+this.pedido[i].nombre) as HTMLElement).classList.remove("mostrarElegido");
  
      }
      
      
      this.pedido=[];
    
    
    });
     
      
    this.mostrarAlert=true;
    setTimeout(()=>{

      this.mostrarAlert=false;
    }, 4000);
    
  }

  TraerTipoMesa()
  {
    if(this.tipo1=="mozo")
    {
      return;
    }
    let usuariosRef = firebase.database().ref("usuarios");
     usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let item in data) {

        if (data[item].correo == this.correo) {

          
          this.tipo = data[item].tipo;
      
          if(this.tipo!="mozo")
          {
            this.mesa=data[item].mesa;
          
          }
          break;
        }
      }
      console.log(this.mesa + this.tipo);

  });
}
}
