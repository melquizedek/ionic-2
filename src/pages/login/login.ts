import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import { UsernameValidator } from "../../validators/username";
import { RegisterPage } from '../register/register';
import { checkFirstCharacterValidator } from '../validators/customValidators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HomePage } from '../home/home';
import { PasswordresetPage } from '../passwordreset/passwordreset';
import 'rxjs/add/operator/map';
import { AccountService } from '../../providers/account_service';
import { CommonModule } from '@angular/common';

/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  today: any = Date.now();

  public type = "password";

  public showPass = false;
  @ViewChild('signupSlider') signupSlider: any;

  sliderOptions: any;
  loginForm: FormGroup;
  loader: Loading = null;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public http: Http,
    public accountService: AccountService) {


    this.sliderOptions = { pager: true };
    this.loginForm = formBuilder.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

    // this.whatTime = Observable.interval(1000).map(x => new Date()).share();

    console.log(this.today);

  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    }
    else {
      this.type = "password";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  verifyInput() {
    var valid = false;
    if (this.loginForm.controls['username'].hasError('required')
      || this.loginForm.controls['password'].hasError('required')) {
      this.showAlert('Please fill up the fields first.');
    } else {
      valid = true;
    }
    return valid;
  }

  goToLogin() {
    if (this.verifyInput()) {
      this.showLoader();
      var access = false;
      this.accountService.getUserData(this.loginForm.value.username).then(data => {
        var accountData: Array<any> = data;
        var index = 0;
        if (accountData[index].PASSWORD == this.loginForm.value.password &&
          accountData[index].USERNAME == this.loginForm.value.username) {
          this.removeLoader();
          let finalAccount = accountData[index];
          access = true;
          console.log("Account details " + JSON.stringify(finalAccount));
          this.navCtrl.setRoot(HomePage, {accountInfo: finalAccount});
        }

        if (!access) {
          this.showAlert("Invalid Username or Password. Please try again.");
        }
        this.removeLoader();
      });
    }
  }

  goToSignUp() { // on click sign up
    this.navCtrl.push(RegisterPage);
  }

  goToForgotPassword() { // on click forgot password
    this.navCtrl.push(PasswordresetPage);
  }

  showAlert(errorMessage) {
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  }

  removeLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  showLoader() {
    if (this.loader == null) {
      this.loader = this.loadingController.create({
        content: "Validating.."
      });
      this.loader.present();
    }
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'FORGOT PASSWORD',
      message: "Enter your registered email address and we will send you a link for a password reset.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email Address'
        },
      ],
      buttons: [
        {
          text: 'RESET PASSWORD',
          handler: data => {
            console.log('password reset');
          }
        }
      ]
    });
    prompt.present();
  }




}
