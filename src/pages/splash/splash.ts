import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public splashScreen: SplashScreen,private nativeAudio: NativeAudio) 
  {
    
    this.nativeAudio.preloadSimple('z', 'assets/imgs/gamma/aud.mp3').catch(() => { }); 

  }

  ionViewDidEnter() {
 
    this.splashScreen.hide();
 
    setTimeout(() => {

      if(localStorage.getItem("sonidos") != "false") {
      this.nativeAudio.play('z').catch(() => { });
    }
    
      this.viewCtrl.dismiss();
    }, 4000);
 
  }

 

}
