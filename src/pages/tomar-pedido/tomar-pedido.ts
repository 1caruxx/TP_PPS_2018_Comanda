import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,private authInstance: AngularFireAuth) 
  {

    let localData = http.get('assets/imgs/gamma/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })



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


    //PEDIDOS MESA 1


    let pedidosMesaUno = this.firebase.database().ref("pedidos/1/");


    pedidosMesaUno.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaUno.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderUno.push(result[k][a]);
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


    pedidosMesaDos.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaDos.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderDos.push(result[k][a]);
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


     pedidosMesaTres.once("value", (snap) => {
 
       let result = snap.val();
 
       for(let k in result)
       { 
         if(k=="cocinero")
           {
             for(let a in result[k])
             {  
               if(a!="estado")
               {
                 this.pedidosCocinaTres.push(result[k][a]);
               }
                
                
             }
        
           }
 
           if(k=="bartender")
           {
             for(let a in result[k])
             {  
               if(a!="estado")
               {
                 this.pedidosBartenderTres.push(result[k][a]);
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


    pedidosMesaCuatro.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaCuatro.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderCuatro.push(result[k][a]);
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


    pedidosMesaCinco.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaCinco.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderCinco.push(result[k][a]);
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


    pedidosMesaSeis.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaSeis.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderSeis.push(result[k][a]);
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


     pedidosMesaSiete.once("value", (snap) => {
 
       let result = snap.val();
 
       for(let k in result)
       { 
         if(k=="cocinero")
           {
             for(let a in result[k])
             {  
               if(a!="estado")
               {
                 this.pedidosCocinaSiete.push(result[k][a]);
               }
                
                
             }
        
           }
 
           if(k=="bartender")
           {
             for(let a in result[k])
             {  
               if(a!="estado")
               {
                 this.pedidosBartenderSiete.push(result[k][a]);
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


    pedidosMesaOcho.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaOcho.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderOcho.push(result[k][a]);
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


    pedidosMesaNueve.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaNueve.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderNueve.push(result[k][a]);
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


    pedidosMesaDiez.once("value", (snap) => {

      let result = snap.val();

      for(let k in result)
      { 
        if(k=="cocinero")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosCocinaDiez.push(result[k][a]);
              }
               
               
            }
       
          }

          if(k=="bartender")
          {
            for(let a in result[k])
            {  
              if(a!="estado")
              {
                this.pedidosBartenderDiez.push(result[k][a]);
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
    this.ocultarUno=false;
    
    
  
  }

  pregunta2()
  {
    this.ocultarDos=false;
    
    
  
  }

  pregunta3()
  {
    this.ocultarTres=false;
    
    
  
  }

  pregunta4()
  {
    this.ocultarCuatro=false;
  }

  pregunta5()
  {
    this.ocultarCinco=false;
  }

  pregunta6()
  {
    this.ocultarSeis=false;
  }

  pregunta7()
  {
    this.ocultarSiete=false;
  }

  pregunta8()
  {
    this.ocultarOcho=false;
  }

  pregunta9()
  {
    this.ocultarNueve=false;
  }

  pregunta10()
  {
    this.ocultarDiez=false;
  }



  Aceptar1()
  {

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

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar3()
  {

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

                                
                              }

                              
                            }

                            
                          });


    
  }

  Aceptar4()
  {
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

                                
                              }

                              
                            }

                            
                          });
  }

  Aceptar5()
  {
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

                                
                              }

                              
                            }

                            
                          });
  }

  Aceptar6()
  {
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

                                
                              }

                              
                            }

                            
                          });
  }


  Aceptar7()
  {

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

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar8()
  {

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

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar9()
  {

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

                                
                              }

                              
                            }

                            
                          });

    
  }

  Aceptar10()
  {

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
                                    data[k].estado = "terminado";
                                    refTerminarUnoCocinero.child(k).update(data[k]);
                                     
                                     
                                  }

                                }

                              }

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
                      data[k].estado = "terminado";
                      refTerminarUnoBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                                    data[k].estado = "terminado";
                                    refTerminarDosCocinero.child(k).update(data[k]);
                                     
                                     
                                  }

                                }

                              }

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
                      data[k].estado = "terminado";
                      refTerminarDosBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                                    data[k].estado = "terminado";
                                    refTerminarTresCocinero.child(k).update(data[k]);
                                     
                                     
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
                      data[k].estado = "terminado";
                      refTerminarTresBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                                    data[k].estado = "terminado";
                                    refTerminarCuatroCocinero.child(k).update(data[k]);
                                     
                                     
                                  }

                                }

                              }

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
                      data[k].estado = "terminado";
                      refTerminarCuatroBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarCincoCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarCincoBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarSeisCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarSeisBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarSieteCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarSieteBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarOchoCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarOchoBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarNueveCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarNueveBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

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
                      data[k].estado = "terminado";
                      refTerminarDiezCocinero.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

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
                      data[k].estado = "terminado";
                      refTerminarDiezBartender.child(k).update(data[k]);
                       
                       
                    }

                  }

                }

            

            });

  }



}
