import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

/*
  Generated class for the FilterbranchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filterbranch',
  templateUrl: 'filterbranch.html'
})
export class FilterbranchPagePage {
    shownGroup = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterbranchPagePage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };
}
