import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from "firebase";
import "firebase/firestore";
import { AngularFireAuth } from "angularfire2/auth";
//import { Content } from 'ionic-angular';

/**
 * Generated class for the MapaDeRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa-de-ruta',
  templateUrl: 'mapa-de-ruta.html',
})
export class MapaDeRutaPage {
	//@ViewChild('content') content:any
	//@ViewChild(Content) content: Content;
  ref;
	name;
	newmessage;
  messagesList;
  nombre="lucas";
  
  public clientes:boolean;
  public chat:boolean;
  public mandar:boolean;

  public usuarios: Array<any>;
  public clientesConPedidos: Array<any>;
  public probando;

  public nombreCliente;
  public direccionCliente;
  public probanding;

  genteRef;

  public usuario;

  ListadoDeChats=["asd","probando","gg"];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alert: AlertController,private authInstance: AngularFireAuth) 
  {
	//this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");

	this.clientes=true;
	this.chat=false;

	this.probanding="yo";

	this.usuario = JSON.parse(localStorage.getItem("usuario"));


 /*	let genteRef = firebase.database().ref("usuarios");

    genteRef.on("value", (snap) => {

      this.usuarios=[];

      let data = snap.val();

      for (let item in data) {

        this.usuarios.push(data[item]);
      }

      this.clientesConPedidos = this.usuarios.filter(item => {

        
        return item.estado=="delivery";
      });

     

      console.log(this.usuarios);


	});*/
	
	let genteRef = firebase.database().ref("usuarios");

	genteRef.on("value", (snap) => {

		this.clientesConPedidos=[];

		let data = snap.val();

		for (let item in data)
		 {
			 //console.log(item);
			if(data[item].estado=="delivery")
			{
				//console.log(data[item]);
				//this.clientesConPedidos.push(data[item]);

				let probandoRef=firebase.database().ref("pedidos");
				probandoRef.once("value", (snap)=>{

					//this.clientesConPedidos=[];
					
					let dataDos = snap.val();

					for(let a in dataDos)
					{
						//console.log(a);
						let pruebita=data[item].correo;

						let patron ='@';
						let nuevo= '';
						let cadena=pruebita.replace(patron, nuevo);
						patron ='.';
						nuevo= '';
						cadena=cadena.replace(patron, nuevo);
						pruebita=cadena;

						//console.log(pruebita);
						if(a==pruebita)
						{
							let vale=0;
							let cocinero=false;
              				let bartender=false;


							for(let dios in dataDos[a])
							{
								//console.log(dios);
								
								  if(dios=="cocinero")
								  {
									cocinero=true;
									//console.log("asd");
								  }
								  if(dios=="bartender")
								  {
									bartender=true;
									//console.log("Asd");
								  }
				  
		
							}

							for(let dios in dataDos[a])
							{
									//console.log(dataDos[a]);
									if(dios!="tiempo")
									{

									/*	if(dataDos[a][dios].estado=="terminado")
										{
		
												if(bartender==true && cocinero==true)
												{
												
													this.clientesConPedidos.push(data[item]);
													console.log("los dos")
													break;
												
												}

												//this.clientesConPedidos.push(data[item]);
		
										}*/

										if(dataDos[a][dios].estado=="terminado")
										{
		
											vale++;

											if(bartender==true && cocinero==true)
											{
												if(vale==2)
												{
													this.clientesConPedidos.push(data[item]);
													console.log("los 2")
													break;
												}

											}

											if(bartender==true && cocinero==false)
											{
												if(vale==1)
												{
													this.clientesConPedidos.push(data[item]);
													console.log("barteneder")
													break;
												}

											}
											if(cocinero==true && bartender == false)
											{
												if(vale==1)
												{
													this.clientesConPedidos.push(data[item]);
													console.log("cocinero")
													break;
												}

											}



										}
										





										//console.log(dataDos[a][dios].estado);
									}
									//console.log(dataDos[a][dios].estado);
							/*	if(dataDos[a][dios].estado=="terminado")
								{

										if(bartender==true && cocinero==true)
										{
										
											this.clientesConPedidos.push(data[item]);
											console.log("los dos")
											break;
										
										}

								}*/

							}

							/*for(let dios in dataDos[a])
							{ 
								if (data[a][dios].estado=="terminado")
								{
								vale++;

								if(bartender==true && cocinero==true)
								{
									if(vale==2)
									{
										this.clientesConPedidos.push(data[item]);
										console.log("los 2")
										break;
									}

								}

								if(bartender==true && cocinero==false)
								{
									if(vale==1)
									{
										this.clientesConPedidos.push(data[item]);
									console.log("barteneder")
									break;
									}

								}
								if(cocinero==true && bartender == false)
								{
									if(vale==1)
									{
										this.clientesConPedidos.push(data[item]);
									console.log("cocinero")
									break;
									}

								}
								

								}

							//console.log("llegue papu");
						}*/





					}

				}


				});



			}


			//this.usuarios.push(data[item]);
		  }



	});

	

	/*this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
	
	this.ref.on('value',data => {
		let tmp = [];
		data.forEach( data => {
			tmp.push({
				key: data.key,
				name: data.val().name,
				message: data.val().message
			})
		});
		this.messagesList = tmp;

		
	});*/

	//setTimeout(() => {
	//	this.content.scrollToBottom(300);
	 //}, 1000);
   
	


  }

  

  ionViewDidLoad() 
  {
	//alert(this.usuario.tipo);
	//this.content.scrollToBottom(300);
    //console.log('ionViewDidLoad MapaDeRutaPage');

    	// Presenting popup
/*  	this.alert.create({
  		title:'Username',
  		inputs:[{
  			name:'username',
  			placeholder: 'username'
  		}],
  		buttons:[{
  			text: 'Continue',
  			handler: username =>{
          this.name = username
         
  			}
  		}]
    }).present();
    
     this.ref = firebase.database().ref('mensajes/' + this.nombre);

  	
  	this.ref.on('value',data => {
  		let tmp = [];
  		data.forEach( data => {
  			tmp.push({
  				key: data.key,
  				name: data.val().name,
  				message: data.val().message
  			})
  		});
  		this.messagesList = tmp;
  	});



		*/
  }


  send(){

	this.ref;

  	
  	/*this.ref.on('value',data => {
  		let tmp = [];
  		data.forEach( data => {
  			tmp.push({
  				key: data.key,
  				name: data.val().name,
  				message: data.val().message
  			})
  		});
  		this.messagesList = tmp;
  	});*/


  	// add new data to firebase
  	this.ref.push({
		  //name: this.name.username,
		    name: "yo",
			message: this.newmessage,
			tiempo: Date(),
			//tipo:"delivery"
	  });
	  

	  this.newmessage="";
  }

  chatear(item)
  {
	this.clientes=false;
	this.chat=true;
	this.mandar=true;
	this.probando=item.img;
	this.nombreCliente=item.nombre;
	this.direccionCliente=item.correo;

	this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
	
	this.ref.on('value',data => {
		let tmp = [];
		data.forEach( data => {
			tmp.push({
				key: data.key,
				name: data.val().name,
				//ame: ,
				message: data.val().message
			})
		});
		this.messagesList = tmp;

		
	});
  }

  volver()
  {
	this.navCtrl.pop();
  }



}
