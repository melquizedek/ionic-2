import { Component, ViewChild } from '@angular/core';
import { ViewController, Slides, Platform, MenuController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-help',
  templateUrl: 'help-page.html'
})

export class HelpPage {

  @ViewChild('helpSlider') slider: Slides;

  buttonText: string = 'Next';

  constructor(private platform: Platform, private menuCtrl: MenuController) {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.changeSlider(-1);
      });
    });

  }

  ionViewDidLoad() {
    console.log('Hello Help Page');
    if (document.getElementById('phone_number_contact')) {
      //document.getElementById('phone_number_contact').textContent = EnvConfig.HELP_CONTACT_NUMBER;
    }

    if (document.getElementById('email_add_contact')) {
      //document.getElementById('email_add_contact').textContent = EnvConfig.HELP_EMAIL_ADD;
    }
  }

  ionViewDidEnter() {
    
  }

  dismissHelp() {
    console.log("Help page dismiss the modal");
    //this.viewCtrl.dismiss();
    this.menuCtrl.close();
  }

  listView(){
    console.log("listView");
  }

  swipeSlider() {
    this.changeSlider(1);
  }

  changeSlider(increment: number) {
    let currentIndex = this.slider.getActiveIndex() + increment;
    switch (currentIndex) {
      case 0:
      case 1:
      case 2:
        this.slider.slideTo(currentIndex);
        this.buttonText = currentIndex == 2 ? 'Done' : 'Next';
        break;
      default:
        this.dismissHelp();
        break;
    }
  }

  slideChanged() {
    this.buttonText = this.slider.getActiveIndex() >= 2 ? 'Done' : 'Next';
  }

  clickPhoneNumber() {
    window.location = '';
    //window.location = ('tel:' + EnvConfig.HELP_CONTACT_NUMBER);
  }

  clickEmail() {
    window.location = '';
    //window.location = ('mailto:' + EnvConfig.HELP_EMAIL_ADD + '?subject=' + value);
  }
}
