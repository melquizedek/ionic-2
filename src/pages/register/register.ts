import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from "@angular/forms";
import { checkFirstCharacterValidator } from '../validators/customValidators';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { UserService } from '../../providers/user_service';
import { Router } from '@angular/router';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  
  registerForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  model: any = {};

  constructor( public navCtrl: NavController
            , public navParams: NavParams            
            , public formBuilder : FormBuilder) {

    this.registerForm = formBuilder.group({
      'empinitials' : [null, Validators.compose([Validators.required])],
      'emplastname' : [null, Validators.compose([Validators.required])],
      'custaddr1' : [null, Validators.compose([Validators.required])],
      'custaddr2' : [null, Validators.compose([Validators.required])],
      'custaddr3' : [null, Validators.compose([Validators.required])],
      'zipcode' : [null, Validators.compose([Validators.required])],
      'phoneno' : [null, Validators.compose([Validators.required])],
      'username' : [null, Validators.compose([Validators.required])],
      'password' : [null, Validators.compose([Validators.required])],
      'verifypassword' : [null, Validators.compose([Validators.required])]
		}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToDashboard(){
    this.navCtrl.setRoot(HomePage);    

  }

  /*register() {
      //this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  //this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  //this.alertService.error(error);
                  //this.loading = false;
              });
    }*/

}
