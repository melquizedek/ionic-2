import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/*
  Generated class for the Stappintro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stappintro',
  templateUrl: 'stappintro.html'
})
export class StappintroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StappintroPage');
  }

  goToSignIn() { // on click sign in
      console.log('goToSignIn function call');
      this.navCtrl.setRoot(LoginPage);
      
  }

  goToRegister() { // on click register
      console.log('goToRegister function call');
      //this.navCtrl.setRoot(HomePage);
      this.navCtrl.push(RegisterPage);      
  }

}
