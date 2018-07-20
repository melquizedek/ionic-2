import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TechnicianlistPage } from '../technicianlist/technicianlist';
import { MyTechnicianlistPage } from '../technicianlist/mytechnicianlist';

/*
  Generated class for the Tabtechnician page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({ 
  selector: 'page-tabtechnician',
  templateUrl: 'tabtechnician.html'
})
export class TabtechnicianPage {
  
  tab1Root: any = MyTechnicianlistPage;
  tab2Root: any = TechnicianlistPage;
  mySelectedIndex: number;

  constructor(public navCtrl: NavController
            , public navParams: NavParams) {
    //this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.mySelectedIndex = 0;
  }
    
  calendarView(){
    console.log("calendarView");
  }

  listView(){
    console.log("listView");
  }
  
}
