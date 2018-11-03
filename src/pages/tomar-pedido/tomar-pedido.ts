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

    this.cocina = [];
    this.bartender = [];
    this.pedidos = [];

    let pedidosRef = this.firebase.database().ref("probandopedidos");

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
 

}
