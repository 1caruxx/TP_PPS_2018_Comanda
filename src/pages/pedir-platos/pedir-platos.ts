import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import  {SpinnerComponent } from '../../components/spinner/spinner';



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
  mostrarSpinnerMonto:boolean=true;
  ocultarMontoPrincipal=true;
  mostrarAlert:boolean=false;
  ocultarPlatos:boolean;
  cantidad:number;
  titulo:string;
  claveUsuarioActual;
  platos:any[]=[];
  bebidas:any[]=[];
  mostrarSpinner:boolean=false;
  mostrarAlert2:boolean=false;
  ocultarMonto:boolean=true;
  mostrarAlert3:boolean=false;
  valor:number;
  miValor:number=undefined;
  foto1;
  foto2;
  eligio:boolean=false;
  foto3;
  nombre;
  valorPlatos:number;
  yaPidio:boolean=false;
  desc;
  cantidadNueva=undefined;
  tipo:string;
  tipo1:string;
  mesa;
  foto;
  apreto=1;
 tiempoPedido:number=0;
  correo:string;
  pedido:any[]=[];
  ocultarBebidas:boolean;
  for="let plato of platos";
  monto:number=0;
  mostrarslide:boolean;
  ocultarTitulo:boolean;
  montoPlatos=0;
  montoBebidas=0;
  ocultarElMonto:boolean=false;
  mostrarSpinnerPlatos:boolean=false;
contador;
  constructor
  (
    public navCtrl: NavController,
     public navParams: NavParams, 
       private authInstance: AngularFireAuth,
       private alertCtrl: AlertController,
       private toastCtrl: ToastController,
      )
       {
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
//DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!!!
//this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
if(this.tipo1=="mozo")
{
  this.mostrarAlert2=true;
  
  return
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

    let valida:boolean=true;
    //Valido el campo de la mesa
    if(!this.mesa)
    {
      valida=false;
      this.mensaje="Ingrese el numero de mesa";
      this.mostrarAlert3=true;
      setTimeout(()=>{

        this.mostrarAlert3=false;
        this.mensaje="Su pedido ha sido enviado en breve se lo llevaremos";
      },2000);
      return;
    }

    //Valido que la mesa exista:

let mensaje = firebase.database().ref().child("mesas/");
mensaje.once("value",(snap)=>{
 let esta:boolean =false;
 let ocupada:boolean=false;
  var data =snap.val();
  for (let item in data) {

    if (data[item].numeroMesa == this.mesa) 
    {
      console.log(this.mesa);
      console.log(data[item].estado);
      esta=true;
      if(data[item].estado=="ocupada")
      {
        ocupada=true;

      }
     
    }
    
  }

  if(!esta)
  {
    this.presentToast("El numero de mesa ingresado no existe!!");

      return;
  }
  else
  {
    //Aca valido que la mesa no esta ocupada
   

     if(!ocupada)
     {
      this.presentToast("La mesa ingresada no es la corrcta ya que esta vacia");
 
     return;

     }
     else
     {
       this.mostrarAlert2=false;
       this.TraerClaveMozo();

     }
   
    

  }


});

   //Valido que la mesa no este ocupada
   
      
    

 
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
  presentToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      cssClass: "infoToast"
    });

    toast.present();
  } 
  ElegirPlato(nombre, valor, es, tiempo, para, precio, id)
  {
   //this.miValor=undefined;

  
  
    if(parseInt(valor)<=0 ||valor==undefined ||valor=="")
    {
      if(this.contErrores==3)
      {
        this.contErrores=0;
        this.mensaje="Coloque la cantidad del elemento del menu";
        this.mostrarAlert3=true;
        setTimeout(()=>{

          this.mostrarAlert3=false;
          this.mensaje="Su pedido ha sido enviado en breve se lo llevaremos...";
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
 
  
   


    this.pedido.push({cant:valor, nombre:nombre, es:es, tiempo:tiempo, para:para, precio:precio, id:id});
    
    (window.document.querySelector('#'+id) as HTMLElement).classList.add("mostrarElegido");
    console.log(this.pedido);

//Si es plato le sumo el monto a plato si es bebida a bebida:
let total=0;
if(es=="plato")
{

  let sumar= parseInt(valor) * parseInt(precio);
  console.log(sumar);
  this.montoPlatos=this.montoPlatos+sumar;
  total=this.montoPlatos;
}
else
{
  let sumar= parseInt(valor) * parseInt(precio);
  console.log(sumar);

  this.montoBebidas=this.montoBebidas+sumar;
  total=this.montoBebidas;
}


this.monto=this.monto +total; 

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

    this.mostrarSpinnerPlatos=true;
  if((this.platos.length>0))
  {
    this.mostrarSpinnerPlatos=false;
  }
      this.miValor=undefined;
     
   

  
    
    this.ocultarPlatos =false;
    this.ocultarTitulo=true;
    this.titulo ="Nuestros platos";
    this.ocultarMonto=false;
  }
  Bebidas()
  {
    this.mostrarSpinnerPlatos=true;
    if((this.platos.length>0))
    {
      this.mostrarSpinnerPlatos=false;
    }
    
    this.miValor=undefined;
    this.ocultarPlatos =true;
    this.valor=undefined;
    this.ocultarBebidas =false;
    this.ocultarTitulo=true;
        this.titulo ="Nuestras bebidas" ;
    this.ocultarMonto=false;

  }
  Cerrar()
  {
    this.ocultarPlatos =true;
    this.ocultarTitulo=false;
    this.ocultarBebidas=true;

    this.ocultarMonto=true;
    this.ocultarMontoPrincipal=false;

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
           this.platos[this.platos.length-1].MiCantidad=undefined;
           
            let nombre =(this.platos[this.platos.length-1].carga.nombre).split(" ");
            console.log(this.platos[this.platos.length-1].carga.nombre);
            if(nombre.length>1)
            {
              let nombreFinal="";
              for(let i=0;i<nombre.length;i++)
              {
                nombreFinal=nombreFinal+ nombre[i];

              }
              this.platos[this.platos.length-1].carga.id=nombreFinal;
              console.log("id compuesto de nombre"+this.platos[this.platos.length-1].carga.id);
            }
            else
            {
              this.platos[this.platos.length-1].carga.id= this.platos[this.platos.length-1].carga.nombre;
              console.log("id  de nombre simple" +this.platos[this.platos.length-1].carga.id);
            }
          }
          else
          {
            this.bebidas.push(data[key]);
            this.bebidas[this.bebidas.length-1].MiCantidad=undefined;
           
            let nombre =(this.bebidas[this.bebidas.length-1].carga.nombre).split(" ");
            if(nombre.length>1)
            {
              let nombreFinal="";
              for(let i=0;i<nombre.length;i++)
              {
                nombreFinal=nombreFinal+ nombre[i];

              }
              this.bebidas[this.bebidas.length-1].carga.id=nombreFinal;
            
            }
            else
            {
              this.bebidas[this.bebidas.length-1].carga.id= this.bebidas[this.bebidas.length-1].carga.nombre;
            
            }

          }

          

        }
 
        this.mostrarSpinnerPlatos=false;


      });
  }
  AceptarPedido()
  {
    this.eligio=true;
    this.Cerrar();
    
  }
  CancelarPedido(cual)
  {
    if(cual=="plato")
    {
     console.log("Le resto: " +this.montoPlatos );
     console.log("El monto es de :" + this.monto);
      this.monto= this.monto-this.montoPlatos;
      this.valorPlatos=null;       
      this.montoPlatos=0;
      

    }
    else
    {
      console.log("Le resto: " +this.montoBebidas );
      this.monto =this.monto-this.montoBebidas;
      this.montoBebidas=0;
      this.valor=null;
    }
    this.eligio=false;
  
  console.log("elementos en array pedidios" +this.pedido.length);

    for(let i=0;i<this.pedido.length;i++)
    {

    
      
    
console.log("Dentro del for");    
      if(this.pedido[i].es == cual)
      {
        console.log("encontro el igual");
        (window.document.querySelector('#'+this.pedido[i].id) as HTMLElement).classList.remove("mostrarElegido");
        this.pedido.splice(i, 1);

      }
    
    }

    
   // this.pedido.splice(0, this.pedido.length);
   
 

    this.Cerrar();

  
   
 console.log(this.pedido);
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
    this.mostrarSpinner=true;
    let mensaje = firebase.database().ref().child("pedidos/"+this.mesa+"/cocinero");
    let mensaje2 = firebase.database().ref().child("pedidos/"+this.mesa+"/bartender");
   let tiempoMax=0;
   let nodoPadre:any;
   let tieneBartender:boolean=false;
   let tieneCocinero:boolean=false;
    for(let i=0;i<this.pedido.length;i++)
    {

      console.log(this.pedido[i].para);
      if(this.pedido[i].para=="bartender")
      {
        console.log("El de abajo es de bartender");
        console.log(this.pedido[i]);
        tieneBartender=true;
        mensaje2.push({nombre:this.pedido[i].nombre, cantidad:this.pedido[i].cant, precio:this.pedido[i].precio});
    
      }
      if(this.pedido[i].para=="cocinero")
      {
        console.log("El de abajo es de cocinero");
        console.log(this.pedido[i]);
        
        tieneCocinero=true;
        if(tiempoMax<this.pedido[i].tiempo)
        {
          tiempoMax=this.pedido[i].tiempo;
        }
        console.log(this.pedido[i].nombre);
        mensaje.push({nombre:this.pedido[i].nombre, cantidad:this.pedido[i].cant, precio:this.pedido[i].precio});
        this.yaPidio=true;
      }

      
    }
    if(tieneCocinero)
    {
      mensaje.update({estado:"tomado"}).then(()=>{

        for(let i=0;i<this.pedido.length;i++)
        {
          (window.document.querySelector('#'+this.pedido[i].id) as HTMLElement).classList.remove("mostrarElegido");
    
        }
        this.pedido=[];
    
      });
    }
    if(tieneBartender)
    {
      mensaje2.update({estado:"tomado"}).then(()=>{

        for(let i=0;i<this.pedido.length;i++)
        {
          (window.document.querySelector('#'+this.pedido[i].id) as HTMLElement).classList.remove("mostrarElegido");
    
        }
        this.pedido=[];
    
      });;
    }
    //Establecer tiempo:
    let refTiempo = firebase.database().ref().child("pedidos/"+this.mesa);
    refTiempo.once("value", (snap) => {

      let data = snap.val();

     let tiempo= data.tiempo;
     if(!tiempo  || tiempo< tiempoMax )
     {

      let mensaje3  =firebase.database().ref().child("pedidos/"+this.mesa);
  
      mensaje3.update({tiempo:tiempoMax}).then(()=>{
        for(let i=0;i<this.pedido.length;i++)
        {
          (window.document.querySelector('#'+this.pedido[i].id) as HTMLElement).classList.remove("mostrarElegido");
    
        }
        this.pedido=[];
    
    
      });


     }
     if(tiempo>tiempoMax)
     {
      for(let i=0;i<this.pedido.length;i++)
      {
        (window.document.querySelector('#'+this.pedido[i].id) as HTMLElement).classList.remove("mostrarElegido");
  
      }
      this.pedido=[];


     }

    });
 //Guardo el estado pidio  al cliente

      let usuariosRef = firebase.database().ref().child("usuarios/"+this.claveUsuarioActual);
      usuariosRef.update({estado:"pidio"});
      
  console.log(this.claveUsuarioActual);
  
    
      
      
      this.mostrarSpinner=false;
   
     
      this.mensaje="El pedido ha sido enviado en breve se lo llevaremos";
    this.mostrarAlert=true;
    setTimeout(()=>{

      this.mostrarAlert=false;
      this.navCtrl.pop();
    }, 4000);
    
  }
TraerClaveMozo()
{
  let usuariosRef = firebase.database().ref("usuarios");
     usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let key in data) {

      
         
     
      
        

            if(data[key].mesa==this.mesa)
            {
              this.claveUsuarioActual=key;
              break;
            }

      
    
      
      }
      console.log(this.mesa + this.tipo);

  });

}
  TraerTipoMesa()
  {
    console.log("Estoy trayendo la mesa");
/*   if(this.tipo1=="mozo")
    {
      return;
    }*/
    let usuariosRef = firebase.database().ref("usuarios");
     usuariosRef.once("value", (snap) => {

      let data = snap.val();
      let esValido = true;

      for (let key in data) {

        if (data[key].correo == this.correo) {
         
          this.tipo = data[key].tipo;
      
          if(this.tipo!="mozo")
          {
            //Si no tiene mesa la mesa va a ser su correo
           if(!data[key].mesa)
           {
            this.mesa= this.correo;
          
            //Le saco el arroba y el punto al string
            let patron ='@';
            let nuevo= '';
            let cadena=this.mesa.replace(patron, nuevo);
            patron ='.';
            nuevo= '';
            cadena=cadena.replace(patron, nuevo);
            this.mesa=cadena;
            console.log(cadena);
            return;

           }
            this.mesa=data[key].mesa;
            console.log(this.mesa);
            this.claveUsuarioActual=key;
            this.CalcularMonto();
            return;
          }

          if(this.tipo1=="mozo")
          {
            if(data[key].mesa==this.mesa)
            {
              this.claveUsuarioActual=key;
            }

          }
          break;
        }
      }
    

     
  });
}

CalcularMonto()
{
  let montos:any[] = [];

 let montoGuardado=0; //ACA ME FIJO EL MONTO DE LA MESA
   let usuariosRef2= firebase.database().ref("pedidos").child(this.mesa);
      

    
   usuariosRef2.once("value", (snap) => {

     let data = snap.val();
   
     if(data ==null)
     {
      this.monto=0;
     }
     for (let item in data) 
     {
       
        for(let subItem in data[item])
        {
          montos.push(data[item][subItem]);
        }

     }
     console.log(montos);
     //SUMO LOS VALORES:
     for(let i=0;i<montos.length-1;i++)
     {
      let suma= parseInt(montos[i].cantidad) *  montos[i].precio;
      console.log(suma);
      montoGuardado = montoGuardado + suma;
     }
     this.monto=montoGuardado;
     this.mostrarSpinnerMonto=false;
     this.ocultarElMonto=true;
   });
}
}
