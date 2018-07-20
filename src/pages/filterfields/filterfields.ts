import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the FilterfieldsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filterfields',
  templateUrl: 'filterfields.html'
})
export class FilterfieldsPagePage {
  max: any;
  min: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterfieldsPagePage');
  }

SetBadge(value){
  console.log(value);
  this.min= value.lower;
  this.max= value.upper;


}
 dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}

