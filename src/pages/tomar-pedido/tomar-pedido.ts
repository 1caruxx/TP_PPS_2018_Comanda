import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
//LINEA 2460 Y 2463
/**
 * Generated class for the TomarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tomar-pedido',
  templateUrl: 'tomar-pedido.html',
})
export class TomarPedidoPage {
  information: any[];
  user_data= [];
  public firebase = firebase;
  public db = firebase.firestore();
  public cocina: Array<any>;
  public bartender: Array<any>;
  public pedidos: Array<any>;


  public pedidosCocinaUno: Array<any>;
  public pedidosBartenderUno: Array<any>;

  public pedidosCocinaDos: Array<any>;
  public pedidosBartenderDos: Array<any>;

  public pedidosCocinaTres: Array<any>;
  public pedidosBartenderTres: Array<any>;

  public pedidosCocinaCuatro: Array<any>;
  public pedidosBartenderCuatro: Array<any>;

  public pedidosCocinaCinco: Array <any>;
  public pedidosBartenderCinco: Array <any>;

  public pedidosCocinaSeis: Array <any>;
  public pedidosBartenderSeis: Array <any>;

  public pedidosCocinaSiete: Array <any>;
  public pedidosBartenderSiete: Array <any>;

  public pedidosCocinaOcho: Array<any>;
  public pedidosBartenderOcho: Array<any>;

  public pedidosCocinaNueve: Array<any>;
  public pedidosBartenderNueve: Array<any>;

  public pedidosCocinaDiez: Array<any>;
  public pedidosBartenderDiez: Array<any>;



  public tiempoMesaUno;

  public tiempoMesaDos;

  public tiempoMesaTres;

  public tiempoMesaCuatro;

  public tiempoMesaCinco;

  public tiempoMesaSeis;

  public tiempoMesaSiete;
  
  public tiempoMesaOcho;

  public tiempoMesaNueve;

  public tiempoMesaDiez;


  //public ocultar:boolean;
  public ocultarUno:boolean;
  public ocultarDos:boolean;
  public ocultarTres:boolean;
  public ocultarCuatro:boolean;
  public ocultarCinco:boolean;
  public ocultarSeis:boolean;
  public ocultarSiete:boolean;
  public ocultarOcho:boolean;
  public ocultarNueve:boolean;
  public ocultarDiez:boolean;


  public usuario;
  public vistaCocinero:boolean;
  public vistaBartender:boolean;

  public vistaCocinaMesaUno:boolean;
  public vistaCocinaMesaDos:boolean;
  public vistaCocinaMesaTres:boolean;
  public vistaCocinaMesaCuatro:boolean;
  public vistaCocinaMesaCinco:boolean;
  public vistaCocinaMesaSeis:boolean;
  public vistaCocinaMesaSiete:boolean;
  public vistaCocinaMesaOcho:boolean;
  public vistaCocinaMesaNueve:boolean;
  public vistaCocinaMesaDiez:boolean;

  public vistaBartenderMesaUno:boolean;
  public vistaBartenderMesaDos:boolean;
  public vistaBartenderMesaTres:boolean;
  public vistaBartenderMesaCuatro:boolean;
  public vistaBartenderMesaCinco:boolean;
  public vistaBartenderMesaSeis:boolean;
  public vistaBartenderMesaSiete:boolean;
  public vistaBartenderMesaOcho:boolean;
  public vistaBartenderMesaNueve:boolean;
  public vistaBartenderMesaDiez:boolean;

  public ponerTiempoMesaCocinaUnoIcono:boolean
  public terminarPedidoMesaCocinaUnoIcono:boolean;
  public ponerTiempoMesaCocinaDosIcono:boolean
  public terminarPedidoMesaCocinaDosIcono:boolean;
  public ponerTiempoMesaCocinaTresIcono:boolean
  public terminarPedidoMesaCocinaTresIcono:boolean;
  public ponerTiempoMesaCocinaCuatroIcono:boolean
  public terminarPedidoMesaCocinaCuatroIcono:boolean;
  public ponerTiempoMesaCocinaCincoIcono:boolean
  public terminarPedidoMesaCocinaCincoIcono:boolean;
  public ponerTiempoMesaCocinaSeisIcono:boolean
  public terminarPedidoMesaCocinaSeisIcono:boolean;
  public ponerTiempoMesaCocinaSieteIcono:boolean
  public terminarPedidoMesaCocinaSieteIcono:boolean;
  public ponerTiempoMesaCocinaOchoIcono:boolean
  public terminarPedidoMesaCocinaOchoIcono:boolean;
  public ponerTiempoMesaCocinaNueveIcono:boolean
  public terminarPedidoMesaCocinaNueveIcono:boolean;
  public ponerTiempoMesaCocinaDiezIcono:boolean
  public terminarPedidoMesaCocinaDiezIcono:boolean;

  public tiempoMinimoUno;
  public tiempoMinimoDos;
  public tiempoMinimoTres;
  public tiempoMinimoCuatro;
  public tiempoMinimoCinco;
  public tiempoMinimoSeis;
  public tiempoMinimoSiete;
  public tiempoMinimoOcho;
  public tiempoMinimoNueve;
  public tiempoMinimoDiez;

  public sinPedidos;


  public pedidosDeliveryCocinero:Array<any>;
  public pedidosDeliveryBartender:Array<any>;
  public vistaDeliveryCocinero:boolean;
  public vistaDeliveryBartender:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,private authInstance: AngularFireAuth) 
  {

   /* let localData = http.get('assets/imgs/gamma/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })*/

    this.sinPedidos=true;

    this.ponerTiempoMesaCocinaUnoIcono=true;
    this.terminarPedidoMesaCocinaUnoIcono=false;
    this.ponerTiempoMesaCocinaDosIcono=true;
    this.terminarPedidoMesaCocinaDosIcono=false;
    this.ponerTiempoMesaCocinaTresIcono=true;
    this.terminarPedidoMesaCocinaTresIcono=false;
    this.ponerTiempoMesaCocinaCuatroIcono=true;
    this.terminarPedidoMesaCocinaCuatroIcono=false;
    this.ponerTiempoMesaCocinaCincoIcono=true;
    this.terminarPedidoMesaCocinaCincoIcono=false;
    this.ponerTiempoMesaCocinaSeisIcono=true;
    this.terminarPedidoMesaCocinaSeisIcono=false;
    this.ponerTiempoMesaCocinaSieteIcono=true;
    this.terminarPedidoMesaCocinaSieteIcono=false;
    this.ponerTiempoMesaCocinaOchoIcono=true;
    this.terminarPedidoMesaCocinaOchoIcono=false;
    this.ponerTiempoMesaCocinaNueveIcono=true;
    this.terminarPedidoMesaCocinaNueveIcono=false;
    this.ponerTiempoMesaCocinaDiezIcono=true;
    this.terminarPedidoMesaCocinaDiezIcono=false;


    this.vistaCocinaMesaUno=false;
    this.vistaCocinaMesaDos=false;
    this.vistaCocinaMesaTres=false;
    this.vistaCocinaMesaCuatro=false;
    this.vistaCocinaMesaCinco=false;
    this.vistaCocinaMesaSeis=false;
    this.vistaCocinaMesaSiete=false;
    this.vistaCocinaMesaOcho=false;
    this.vistaCocinaMesaNueve=false;
    this.vistaCocinaMesaDiez=false;

    this.vistaBartenderMesaUno=false;
    this.vistaBartenderMesaDos=false;
    this.vistaBartenderMesaTres=false;
    this.vistaBartenderMesaCuatro=false;
    this.vistaBartenderMesaCinco=false;
    this.vistaBartenderMesaSeis=false;
    this.vistaBartenderMesaSiete=false;
    this.vistaBartenderMesaOcho=false;
    this.vistaBartenderMesaNueve=false;
    this.vistaBartenderMesaDiez=false;



    //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");

   /* let pedidosRef = this.firebase.database().ref("mesas");

    pedidosRef.once("value", (snap) => {

      //let data = snap.val();
     // let esValido = true;
     let result = snap.val();
    for(let k in result){ //"k" provides key Id of each object
      this.user_data.push({
       id : k,
       carga : result[k].cantidadComensales,
       numeroMesa : result[k].numeroMesa,
       name : "adasdasd"
     });
    }



      
    });*/

 

    //this.ocultar=true;

    //CAMBIAR ESTO PARA PROBAR

    //this.vistaCocinero=true;

    //this.vistaBartender=true;

    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    if(this.usuario.tipo=="cocinero")
    {
      this.vistaCocinero=true;
    }

    if(this.usuario.tipo=="bartender")
    {
      this.vistaBartender=true;
    }



    this.ocultarUno=true;
    this.ocultarDos=true;
    this.ocultarTres=true;
    this.ocultarCuatro=true;
    this.ocultarCinco=true;
    this.ocultarSeis=true;
    this.ocultarSiete=true;
    this.ocultarOcho=true;
    this.ocultarNueve=true;
    this.ocultarDiez=true;

    this.cocina = [];
    this.bartender = [];
    this.pedidos = [];

    this.pedidosCocinaUno=[];
    this.pedidosBartenderUno=[];

    this.pedidosCocinaDos=[];
    this.pedidosBartenderDos=[];

    this.pedidosCocinaTres=[];
    this.pedidosBartenderTres=[];


    this.pedidosCocinaCuatro= [];
    this.pedidosBartenderCuatro=[];

    this.pedidosCocinaCinco=[];
    this.pedidosBartenderCinco=[];

    this.pedidosCocinaSeis=[];
    this.pedidosBartenderSeis=[];

    this.pedidosCocinaSiete=[];
    this.pedidosBartenderSiete=[];
    
    this.pedidosCocinaOcho=[];
    this.pedidosBartenderOcho=[];

    this.pedidosCocinaNueve=[];
    this.pedidosBartenderNueve=[];

    this.pedidosCocinaDiez=[];
    this.pedidosBartenderDiez=[];

    this.pedidosDeliveryCocinero=[];
    this.pedidosDeliveryBartender=[];
    this.vistaDeliveryCocinero=false;
    this.vistaDeliveryBartender=false;

    //PROBANDO DELIVERY COCINERO


    let deliveryCocinero = this.firebase.database().ref("pedidos/");

    deliveryCocinero.on("value", (snap)=> {

      this.pedidosDeliveryCocinero=[];
      //this.vistaDeliveryCocinero=false;

      let result=snap.val();

      for(let item in result)
      {



              if(item=="1"||item=="2"||item=="3"||item=="4"||item=="5"||item=="6"||item=="7"||item=="8"||item=="9"||item=="10") 
              {
                continue;
              }

                      
                              //this.pedidosDeliveryCocinero.push(item);
                              //console.log(result[item]);
                     for(let a in result[item])
                        {  
                          if(a=="cocinero")
                          {
                            this.vistaDeliveryCocinero=true;
                            for(let j in result[item][a])
                            {

                             // console.log(result[item][a][j]);
    
                                if(result[item][a][j]=="tomado")
                                {
                                  console.log("llegue aca");
                                  this.pedidosDeliveryCocinero.push(item);
                                  //console.log(result[item]);

                                }
                                     

                            }
                            //this.pedidosBartenderUno.push(result[k][a]);
                            //this.pedidosDeliveryCocinero.push(result[item][a]);
                            //console.log(result[item][a]);
                          }
                                        
                        }
                          

      }

      
    
    });


    //PROBANDO DELIVERY BARTENDER

    let deliveryBartender = this.firebase.database().ref("pedidos/");

    deliveryBartender.on("value", (snap)=> {

      this.pedidosDeliveryBartender=[];
      this.vistaDeliveryBartender=false;

      let result=snap.val();

      for(let item in result)
      {



              if(item=="1"||item=="2"||item=="3"||item=="4"||item=="5"||item=="6"||item=="7"||item=="8"||item=="9"||item=="10") 
              {
                continue;
              }

                      
                              //this.pedidosDeliveryCocinero.push(item);
                              //console.log(result[item]);
                     for(let a in result[item])
                        {  
                          if(a=="bartender")
                          {
                            this.vistaDeliveryBartender=true;
                            for(let j in result[item][a])
                            {

                             // console.log(result[item][a][j]);
    
                                if(result[item][a][j]=="tomado")
                                {
                                  console.log("llegue aca");
                                  this.pedidosDeliveryBartender.push(item);
                                  //console.log(result[item]);

                                }
                                     

                            }
                            //this.pedidosBartenderUno.push(result[k][a]);
                            //this.pedidosDeliveryCocinero.push(result[item][a]);
                            //console.log(result[item][a]);
                          }
                                        
                        }
                          

      }

      
    
    });




    //PEDIDOS MESA 1


    let pedidosMesaUno = this.firebase.database().ref("pedidos/1/");


    pedidosMesaUno.on("value", (snap) => {

      this.vistaCocinaMesaUno=false;
      this.vistaBartenderMesaUno=false;
      this.pedidosCocinaUno=[];
      this.pedidosBartenderUno=[];
      //this.sinPedidos=false;

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
            {
              this.sinPedidos=true;
              break;
            }

              this.sinPedidos=false;
              console.log("aca estoy");
              this.vistaCocinaMesaUno=true;


            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaUno.push(result[k][a]);
                }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaUno=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderUno.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaUno=result[k];
          }

        
      
      }
      
    });

    //PEDIDOS MESA 2


    let pedidosMesaDos = this.firebase.database().ref("pedidos/2/");


    pedidosMesaDos.on("value", (snap) => {

      this.vistaBartenderMesaDos=false;
      this.vistaCocinaMesaDos=false;
      this.pedidosCocinaDos=[];
      this.pedidosBartenderDos=[];
     // this.sinPedidos=false;

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

           if(result[k].estado != "tomado")
           //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaDos=true;

            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaDos.push(result[k][a]);
                }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaDos=true;


            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderDos.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaDos=result[k];
          }

        
      
      }
      
    });

     //PEDIDOS MESA 3


     let pedidosMesaTres = this.firebase.database().ref("pedidos/3/");


     pedidosMesaTres.on("value", (snap) => {

      this.vistaCocinaMesaTres=false;
      this.vistaBartenderMesaTres=false;
      this.pedidosCocinaTres=[];
      this.pedidosBartenderTres=[];
     // this.sinPedidos=false;
 
       let result = snap.val();
 
       for(let k in result)
       { 

        if(this.usuario.tipo=="cocinero")
        {

        



         if(k=="cocinero")
           {

            if(result[k].estado != "tomado")
            //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
            {
              this.sinPedidos=true;
              break;
            }
            

            this.sinPedidos=false;
            this.vistaCocinaMesaTres=true;



             for(let a in result[k])
             {  
               if(a!="estado")
               {
                 if(result[k][a].terminado!="si")
                 {
                  this.pedidosCocinaTres.push(result[k][a]);
                 }
                 
               }
                
                
             }
        
           }

          }

          if(this.usuario.tipo=="bartender")
          {

         
 
           if(k=="bartender")
           {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaTres=true;


             for(let a in result[k])
             {  
               if(a!="estado")
               {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderTres.push(result[k][a]);
                }
               }
                             
             }
 
             
           }

          }
 
           if(k=="tiempo")
           {
             this.tiempoMesaTres=result[k];
           }
 
         
       
       }
       
     });

     




    //PEDIDOS MESA 4
    let pedidosMesaCuatro = this.firebase.database().ref("pedidos/4/");


    pedidosMesaCuatro.on("value", (snap) => {

      this.vistaCocinaMesaCuatro=false;
      this.vistaBartenderMesaCuatro=false;
      this.pedidosCocinaCuatro=[];
      this.pedidosBartenderCuatro=[];

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaCuatro=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                 {
                  this.pedidosCocinaCuatro.push(result[k][a]);
                 }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaCuatro=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderCuatro.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaCuatro=result[k];
          }

        
      
      }
      
    });




    //PEDIDOS MESA 5


    let pedidosMesaCinco = this.firebase.database().ref("pedidos/5/");


    pedidosMesaCinco.on("value", (snap) => {

      this.vistaCocinaMesaCinco=false;
      this.vistaBartenderMesaCinco=false;
      this.pedidosCocinaCinco=[];
      this.pedidosBartenderCinco=[];

      let result = snap.val();

      for(let k in result)
      { 
        //this.vistaCocinaMesaCinco=true;

        if(this.usuario.tipo=="cocinero")
        {


        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaCinco=true;


            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaCinco.push(result[k][a]);
                }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaCinco=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderCinco.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaCinco=result[k];
          }

        
      
      }
      
    });


    //MESA SEIS

    let pedidosMesaSeis = this.firebase.database().ref("pedidos/6/");


    pedidosMesaSeis.on("value", (snap) => {

      this.vistaCocinaMesaSeis=false;
      this.vistaBartenderMesaSeis=false;
      this.pedidosCocinaSeis=[];
      this.pedidosBartenderSeis=[];

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaSeis=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                 {
                  this.pedidosCocinaSeis.push(result[k][a]);
                 }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaSeis=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderSeis.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaSeis=result[k];
          }

        
      
      }
      
    });

     //PEDIDOS MESA 7


     let pedidosMesaSiete = this.firebase.database().ref("pedidos/7/");


     pedidosMesaSiete.on("value", (snap) => {

      this.vistaCocinaMesaSiete=false;
      this.vistaBartenderMesaSiete=false;
      this.pedidosCocinaSiete=[];
      this.pedidosBartenderSiete=[];
 
       let result = snap.val();
 
       for(let k in result)
       { 


        if(this.usuario.tipo=="cocinero")
        {

         if(k=="cocinero")
           {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }


            this.sinPedidos=false;
            this.vistaCocinaMesaSiete=true;


             for(let a in result[k])
             {  
               if(a!="estado")
               {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaSiete.push(result[k][a]);
                }
               }
                
                
             }
        
           }

          }

          if(this.usuario.tipo=="bartender")
          {
 
           if(k=="bartender")
           {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaSiete=true;



             for(let a in result[k])
             {  
               if(a!="estado")
               {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderSiete.push(result[k][a]);
                }
               }
                             
             }
 
             
           }

          }
 
           if(k=="tiempo")
           {
             this.tiempoMesaSiete=result[k];
           }
 
         
       
       }
       
     });

      //PEDIDOS MESA 8


    let pedidosMesaOcho = this.firebase.database().ref("pedidos/8/");


    pedidosMesaOcho.on("value", (snap) => {

      this.vistaCocinaMesaOcho=false;
      this.vistaBartenderMesaOcho=false;
      this.pedidosCocinaOcho=[];
      this.pedidosBartenderOcho=[];

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaOcho=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaOcho.push(result[k][a]);
                }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaOcho=true;



            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderOcho.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaOcho=result[k];
          }

        
      
      }
      
    });

    let pedidosMesaNueve = this.firebase.database().ref("pedidos/9/");


    pedidosMesaNueve.on("value", (snap) => {

      this.vistaCocinaMesaNueve=false;
      this.vistaBartenderMesaNueve=false;
      this.pedidosCocinaNueve=[];
      this.pedidosBartenderNueve=[];

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaNueve=true;


            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosCocinaNueve.push(result[k][a]);
                }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

              this.sinPedidos=false;
              this.vistaBartenderMesaNueve=true;

            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderNueve.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaNueve=result[k];
          }

        
      
      }
      
    });

    let pedidosMesaDiez = this.firebase.database().ref("pedidos/10/");


    pedidosMesaDiez.on("value", (snap) => {

      this.vistaCocinaMesaDiez=false;
      this.vistaBartenderMesaDiez=false;
      this.pedidosCocinaDiez=[];
      this.pedidosBartenderDiez=[];

      let result = snap.val();

      for(let k in result)
      { 

        if(this.usuario.tipo=="cocinero")
        {

        if(k=="cocinero")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaCocinaMesaDiez=true;

            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                 {
                  this.pedidosCocinaDiez.push(result[k][a]);
                 }
              }
               
               
            }
       
          }

        }

        if(this.usuario.tipo=="bartender")
        {

          if(k=="bartender")
          {

            if(result[k].estado != "tomado")
            {
              this.sinPedidos=true;
              break;
            }

            this.sinPedidos=false;
            this.vistaBartenderMesaDiez=true;


            for(let a in result[k])
            {  
              if(a!="estado")
              {
                if(result[k][a].terminado!="si")
                {
                 this.pedidosBartenderDiez.push(result[k][a]);
                }
              }
                            
            }

            
          }

        }

          if(k=="tiempo")
          {
            this.tiempoMesaDiez=result[k];
          }

        
      
      }
      
    });

   /* pedidosRef.once("value", (snap) => {

      //let data = snap.val();
     // let esValido = true;
     let result = snap.val();

     for(let k in result){ 
      this.user_data.push({
       numeroMesa : k,
       pedido : result[k].cocinero, 
       name : "adasdasd"
     });
    }*/

  
    

    //alert(this.user_data);





      
    
      








  }

  toggleSection(i) {
    //this.information[i].open = !this.information[i].open;
    this.user_data[i].open = !this.user_data[i].open;
  }
 
  toggleItem(i, j) {
    //this.information[i].children[j].open = !this.information[i].children[j].open;
    this.user_data[i].cocinero[j].open = !this.user_data[i].cocinero[j].open;

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarPedidoPage');
  }

  probando()
  {
    let pedidosRef = this.firebase.database().ref("mesas");

    pedidosRef.once("value", (snap) => {

      //let data = snap.val();
     // let esValido = true;
     let result = snap.val();
    for(let k in result){ //"k" provides key Id of each object
      this.user_data.push({
       id : k,
       carga : result[k].cantidadComensales,
       numeroMesa : result[k].numeroMesa,
       name : "adasdasd"
     });
    }



      
    });
      
      

    
  }

  pregunta1()
  {
    this.tiempoMinimoUno=this.tiempoMesaUno;
    this.ocultarUno=false;
    
    
  
  }

  pregunta2()
  {
    this.tiempoMinimoDos=this.tiempoMesaDos;
    this.ocultarDos=false;

    
    
  
  }

  pregunta3()
  {
    this.tiempoMinimoTres=this.tiempoMesaTres;
    this.ocultarTres=false;
    
    
  
  }

  pregunta4()
  {
    this.tiempoMinimoCuatro=this.tiempoMesaCuatro;
    this.ocultarCuatro=false;
  }

  pregunta5()
  {
    this.tiempoMinimoCinco=this.tiempoMesaCinco;
    this.ocultarCinco=false;
  }

  pregunta6()
  {
    this.tiempoMinimoSeis=this.tiempoMesaSeis;
    this.ocultarSeis=false;
  }

  pregunta7()
  {
    this.tiempoMinimoSiete=this.tiempoMesaSiete;
    this.ocultarSiete=false;
  }

  pregunta8()
  {
    this.tiempoMinimoOcho=this.tiempoMesaOcho;
    this.ocultarOcho=false;
  }

  pregunta9()
  {
    this.tiempoMinimoNueve=this.tiempoMesaNueve;
    this.ocultarNueve=false;
  }

  pregunta10()
  {
    this.tiempoMinimoDiez=this.tiempoMesaDiez;
    this.ocultarDiez=false;
  }



  Aceptar1()
  {

    if(this.tiempoMesaUno<this.tiempoMinimoUno)
    {
     this.ocultarUno=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarUno=true;

    var refUno = this.firebase.database().ref("mesas");
                        
                        refUno.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (1 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaUno;
                                refUno.child(key).update(data[key]);
                                
                                this.ponerTiempoMesaCocinaUnoIcono=false;
                                this.terminarPedidoMesaCocinaUnoIcono=true;

                                
                              }

                              
                            }

                            
                          });

    //this.tiempoMesaCuatro;

    /*var refUno = this.firebase.database().ref("mesas");
                        
                        refUno.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (1 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaUno;
                                refUno.child(key).update(data[key]);

                                
                              }

                              
                            }

                            
                          });*/

    


  }

  Aceptar2()
  {
    
   // while(this.tiempoMesaDos)
   //let z=this.tiempoMesaDos;

   if(this.tiempoMesaDos<this.tiempoMinimoDos)
   {
    this.ocultarDos=true;
    alert("Ponga un tiempo mayor o igual al indicado.")
     return;
   }

    this.ocultarDos=true;

    var refDos = this.firebase.database().ref("mesas");
                        
                        refDos.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (2 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaDos;
                                refDos.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaDosIcono=false;
                                this.terminarPedidoMesaCocinaDosIcono=true;

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar3()
  {

    if(this.tiempoMesaTres<this.tiempoMinimoTres)
    {
     this.ocultarTres=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarTres=true;

    var refTres = this.firebase.database().ref("mesas");
                        
                        refTres.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (3 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaTres;
                                refTres.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaTresIcono=false;
                                this.terminarPedidoMesaCocinaTresIcono=true;

                                
                              }

                              
                            }

                            
                          });


    
  }

  Aceptar4()
  {

    if(this.tiempoMesaCuatro<this.tiempoMinimoCuatro)
    {
     this.ocultarCuatro=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    //this.ocultar=true;
    //this.ocultarDos=true;
    this.ocultarCuatro=true;

    //this.tiempoMesaCuatro;

    var refCuatro = this.firebase.database().ref("mesas");
                        
                        refCuatro.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (4 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaCuatro;
                                refCuatro.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaCuatroIcono=false;
                                this.terminarPedidoMesaCocinaCuatroIcono=true;

                                
                              }

                              
                            }

                            
                          });
  }

  Aceptar5()
  {

    if(this.tiempoMesaCinco<this.tiempoMinimoCinco)
    {
     this.ocultarCinco=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }
    //this.ocultar=true;
    this.ocultarCinco=true;

    //this.tiempoMesaCuatro;

    var refCinco = this.firebase.database().ref("mesas");
                        
                        refCinco.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (5 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaCinco;
                                refCinco.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaCincoIcono=false;
                                this.terminarPedidoMesaCocinaCincoIcono=true;

                                
                              }

                              
                            }

                            
                          });
  }

  Aceptar6()
  {

    if(this.tiempoMesaSeis<this.tiempoMinimoSeis)
    {
     this.ocultarSeis=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    //this.ocultar=true;
    //this.ocultarTres=true;
    this.ocultarSeis=true;

    //this.tiempoMesaCuatro;

    var refSeis = this.firebase.database().ref("mesas");
                        
                        refSeis.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (6 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaSeis;
                                refSeis.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaSeisIcono=false;
                                this.terminarPedidoMesaCocinaSeisIcono=true;

                                
                              }

                              
                            }

                            
                          });
  }


  Aceptar7()
  {

    if(this.tiempoMesaSiete<this.tiempoMinimoSiete)
    {
     this.ocultarSiete=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarSiete=true;

    var refSiete = this.firebase.database().ref("mesas");
                        
                        refSiete.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (7 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaSiete;
                                refSiete.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaSieteIcono=false;
                                this.terminarPedidoMesaCocinaSieteIcono=true;

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar8()
  {

    if(this.tiempoMesaOcho<this.tiempoMinimoOcho)
    {
     this.ocultarOcho=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarOcho=true;

    var refOcho = this.firebase.database().ref("mesas");
                        
                        refOcho.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (8 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaOcho;
                                refOcho.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaOchoIcono=false;
                                this.terminarPedidoMesaCocinaOchoIcono=true;

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar9()
  {

    if(this.tiempoMesaNueve<this.tiempoMinimoNueve)
    {
     this.ocultarNueve=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarNueve=true;

    var refNueve = this.firebase.database().ref("mesas");
                        
                        refNueve.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (9 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaNueve;
                                refNueve.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaNueveIcono=false;
                                this.terminarPedidoMesaCocinaNueveIcono=true;

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar10()
  {

    if(this.tiempoMesaDiez<this.tiempoMinimoDiez)
    {
     this.ocultarDiez=true;
     alert("Ponga un tiempo mayor o igual al indicado.")
      return;
    }

    this.ocultarDiez=true;

    var refDiez = this.firebase.database().ref("mesas");
                        
                        refDiez.once('value', (snap) => 
                        {
                            var data = snap.val();
                            //this.estaLibre=true;
                          // ocup=true;
                            for(var key in data)
                            {

                              if (10 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaDiez;
                                refDiez.child(key).update(data[key]);

                                this.ponerTiempoMesaCocinaDiezIcono=false;
                                this.terminarPedidoMesaCocinaDiezIcono=true;

                                
                              }

                              
                            }

                            
                          });

    
  }

  terminarPedidoUnoCocinero()
  {
    var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
                        
                  refTerminarUnoCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 
                              if(k=="cocinero")
                                {
                                  for(let a in data[k])
                                  {  
                                   // if(a=="estado")
                                    //{
                                      //this.pedidosCocinaDos.push(data[k][a]);
                                    //}
                                    data[k].estado = "preparacion";
                                    
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                    
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                    refTerminarUnoCocinero.child(k).child(a).update(data[k][a]);

                                    }

                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                     
                                     
                                  }

                                }

                              }

                              

                          }).then(() => 
                          {
                           // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          });




  }

  TerminarPedidoUnoBartender()
  {

    var refTerminarUnoBartender = this.firebase.database().ref("pedidos/1/");
                        
    refTerminarUnoBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarUnoBartender.child(k).update(data[k]);
                      
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarUnoBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });




  }

  terminarPedidoDosCocinero()
  {

    var refTerminarDosCocinero = this.firebase.database().ref("pedidos/2/");
                        
                  refTerminarDosCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 
                              if(k=="cocinero")
                                {
                                  for(let a in data[k])
                                  {  
                                   // if(a=="estado")
                                    //{
                                      //this.pedidosCocinaDos.push(data[k][a]);
                                    //}
                                    data[k].estado = "preparacion";
                                    
                                    refTerminarDosCocinero.child(k).update(data[k]);
                      
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                      refTerminarDosCocinero.child(k).child(a).update(data[k][a]);

                                    }
                                     
                                     
                                  }

                                }

                              }

                          }).then(() => 
                          {
                            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          });





  }

  TerminarPedidoDosBartender()
  {

    var refTerminarDosBartender = this.firebase.database().ref("pedidos/2/");
                        
    refTerminarDosBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarDosBartender.child(k).update(data[k]);
                      
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                      refTerminarDosBartender.child(k).child(a).update(data[k][a]);

                                    }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoTresCocinero()
  {
    var refTerminarTresCocinero = this.firebase.database().ref("pedidos/3/");
                        
                  refTerminarTresCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 
                              if(k=="cocinero")
                                {
                                  for(let a in data[k])
                                  {  
                                   // if(a=="estado")
                                    //{
                                      //this.pedidosCocinaDos.push(data[k][a]);
                                    //}

                                    data[k].estado = "preparacion";
                                    
                                    refTerminarTresCocinero.child(k).update(data[k]);
                                    
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                    refTerminarTresCocinero.child(k).child(a).update(data[k][a]);

                                    }
                                    
                                    
                                     
                                     
                                  }
                                  

                                }

                              }

                            //this.estaLibre=true;
                          // ocup=true;
                          /*  for(var key in data)
                            {

                              if (3 == data[key].numeroMesa) 
                              {
                                data[key].tiempoMinimo = this.tiempoMesaSeis;
                                refTerminarTresCocinero.child(key).update(data[key]);

                                
                              }

                              
                            }*/
      
                          }).then(() => 
                          {
                           // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          });

  }

  terminarPedidoTresBartender()
  {
    var refTerminarTresBartender = this.firebase.database().ref("pedidos/3/");
                        
    refTerminarTresBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarTresBartender.child(k).update(data[k]);
                      
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                      refTerminarTresBartender.child(k).child(a).update(data[k][a]);

                                    }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });



  }

  terminarPedidoCuatroCocinero()
  {

    var refTerminarCuatroCocinero = this.firebase.database().ref("pedidos/4/");
                        
                  refTerminarCuatroCocinero.once('value', (snap) => 
                        {
                            var data = snap.val();

                            for(let k in data)
                            { 
                              if(k=="cocinero")
                                {
                                  for(let a in data[k])
                                  {  
                                   // if(a=="estado")
                                    //{
                                      //this.pedidosCocinaDos.push(data[k][a]);
                                    //}
                                    data[k].estado = "preparacion";
                                    
                                    refTerminarCuatroCocinero.child(k).update(data[k]);
                      
                                    if(a!="estado")
                                    {
                                      data[k][a].terminado="si";
                                      refTerminarCuatroCocinero.child(k).child(a).update(data[k][a]);

                                    }
                                     
                                     
                                  }

                                }

                              }

                          }).then(() => 
                          {
                         //   this.navCtrl.setRoot(this.navCtrl.getActive().component);
                          });

  }

  terminarPedidoCuatroBartender()
  {

    var refTerminarCuatroBartender = this.firebase.database().ref("pedidos/4/");
                        
    refTerminarCuatroBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarCuatroBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarCuatroBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });
    
  }

  terminarPedidoCincoCocinero()
  {

    var refTerminarCincoCocinero = this.firebase.database().ref("pedidos/5/");
                        
    refTerminarCincoCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarCincoCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarCincoCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                    }

                  }

                }

            }).then(() => 
            {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoCincoBartender()
  {

    var refTerminarCincoBartender = this.firebase.database().ref("pedidos/5/");
                        
    refTerminarCincoBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarCincoBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarCincoBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });


  }

  terminarPedidoSeisCocinero()
  {

    var refTerminarSeisCocinero = this.firebase.database().ref("pedidos/6/");
                        
    refTerminarSeisCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarSeisCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarSeisCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoSeisBartender()
  {

    var refTerminarSeisBartender = this.firebase.database().ref("pedidos/6/");
                        
    refTerminarSeisBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarSeisBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarSeisBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoSieteCocinero()
  {

    var refTerminarSieteCocinero = this.firebase.database().ref("pedidos/7/");
                        
    refTerminarSieteCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarSieteCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarSieteCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoSieteBartender()
  {

    var refTerminarSieteBartender = this.firebase.database().ref("pedidos/7/");
                        
    refTerminarSieteBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarSieteBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarSieteBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoOchoCocinero()
  {

    var refTerminarOchoCocinero = this.firebase.database().ref("pedidos/8/");
                        
    refTerminarOchoCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarOchoCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarOchoCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoOchoBartender()
  {

    var refTerminarOchoBartender = this.firebase.database().ref("pedidos/8/");
                        
    refTerminarOchoBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarOchoBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarOchoBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoNueveCocinero()
  {

    var refTerminarNueveCocinero = this.firebase.database().ref("pedidos/9/");
                        
    refTerminarNueveCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarNueveCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarNueveCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoNueveBartender()
  {

    var refTerminarNueveBartender = this.firebase.database().ref("pedidos/9/");
                        
    refTerminarNueveBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarNueveBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarNueveBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoDiezCocinero()
  {

    var refTerminarDiezCocinero = this.firebase.database().ref("pedidos/10/");
                        
    refTerminarDiezCocinero.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="cocinero")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarDiezCocinero.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarDiezCocinero.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            }).then(() => 
            {
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }

  terminarPedidoDiezBartender()
  {

    var refTerminarDiezBartender = this.firebase.database().ref("pedidos/10/");
                        
    refTerminarDiezBartender.once('value', (snap) => 
          {
              var data = snap.val();

              for(let k in data)
              { 
                if(k=="bartender")
                  {
                    for(let a in data[k])
                    {  
                     // if(a=="estado")
                      //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                      //}
                      data[k].estado = "preparacion";
                                    
                      refTerminarDiezBartender.child(k).update(data[k]);
        
                      if(a!="estado")
                      {
                        data[k][a].terminado="si";
                        refTerminarDiezBartender.child(k).child(a).update(data[k][a]);

                      }
                       
                       
                    }

                  }

                }

            

            }).then(() => 
            {
             // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

  }


  Logout() 
  
  {

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

              this.navCtrl.setRoot("");
            } else {
              localStorage.clear();
              this.navCtrl.setRoot("");
            }
          });

          break;
        }
      }
    });
  }

  volver()
  {
    this.navCtrl.pop();
  }



  terminarDeliveryCocinero(probando)
  {

    let deliveryCocinero = this.firebase.database().ref("pedidos/");

    deliveryCocinero.once("value", (snap)=> {

      let result=snap.val();

      for(let item in result)
      {
        if(item==probando)
        {

          for(let a in result[item])
          {  
            if(a=="cocinero")
            {
              for(let j in result[item][a])
              {
              
                  if(result[item][a][j]=="tomado")
                  {
                    console.log("llegue aca");
                   
                    console.log(result[item][a].estado);
                    result[item][a].estado="terminado";
                    deliveryCocinero.child(item).child(a).update(result[item][a]);
                    
                
                    break;
                  }
                       

              }
              
            }
                          
          }





        }


      }

    });




  }

  terminarDeliveryBartender(probando)
  {

    let deliveryBartender = this.firebase.database().ref("pedidos/");

    deliveryBartender.once("value", (snap)=> {

      let result=snap.val();

      for(let item in result)
      {
        if(item==probando)
        {

          for(let a in result[item])
          {  
            if(a=="bartender")
            {
              for(let j in result[item][a])
              {
              
                  if(result[item][a][j]=="tomado")
                  {
                    console.log("llegue aca");
                   
                    console.log(result[item][a].estado);
                    result[item][a].estado="terminado";
                    deliveryBartender.child(item).child(a).update(result[item][a]);
                    
                
                    break;
                  }
                       

              }
              
            }
                          
          }





        }


      }

    });


  }



}
