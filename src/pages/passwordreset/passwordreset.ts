import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from "@angular/forms";
import { UsernameValidator } from "../../validators/username";

/*
  Generated class for the Passwordreset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html'
})
export class PasswordresetPage {

  resetform: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

}
