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

  public usuario;

  ListadoDeChats=["asd","probando","gg"];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alert: AlertController,private authInstance: AngularFireAuth) 
  {
	this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");

	this.usuario = JSON.parse(localStorage.getItem("usuario"));

	

	this.ref=firebase.database().ref('mensajes/' + this.nombre);
	
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

	//setTimeout(() => {
	//	this.content.scrollToBottom(300);
	 //}, 1000);
   
	


  }

  

  ionViewDidLoad() 
  {
	alert(this.usuario.tipo);
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
		  name: "lucas",
			message: this.newmessage,
			tipo:"delivery"
	  });
	  

	  this.newmessage="";
  }



}
