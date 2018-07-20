import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the Managetechnician page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'create-task-report',
  templateUrl: 'createTaskReport.html'
})
export class CreateTaskReport {

   constructor(public navCtrl: NavController, public navParams: NavParams,) {}
  

ionViewDidLoad(){
    console.log('ionViewDidLoad CreateTaskReport');
  }
}
