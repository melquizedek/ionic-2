import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Technicianedit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-technicianedit',
  templateUrl: 'technicianedit.html'
})
export class TechnicianeditPage {

  constructor(public navCtrl: NavController
            , public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicianeditPage');
  }
  
}
