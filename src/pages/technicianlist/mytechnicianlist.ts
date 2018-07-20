import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TechnicianService } from '../../providers/technician_service';
import { TechniciandetailsPage } from '../techniciandetails/techniciandetails';
import { TechnicianeditPage } from '../technicianedit/technicianedit';

/*
  Generated class for the Technicianlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mytechnicianlist',
  templateUrl: 'mytechnicianlist.html'
})
export class MyTechnicianlistPage {
  
  technicians: any;
  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public technicianservice: TechnicianService) {
   
    this.technicians = technicianservice.getMyTechnicianItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTechnicianlistPage');
  }

  technicianSelected(index: number){
    	this.navCtrl.setRoot(TechniciandetailsPage, {listIndex: index, listType: "MY"});
  }
  
}
