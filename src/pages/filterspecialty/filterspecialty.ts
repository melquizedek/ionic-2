import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the FilterspecialtyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filterspecialty',
  templateUrl: 'filterspecialty.html'
})
export class FilterspecialtyPagePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewctrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterspecialtyPagePage');
  }
dismiss(){
 let data = {'foo': 'bar'};
this.viewctrl.dismiss(data);
}
}
