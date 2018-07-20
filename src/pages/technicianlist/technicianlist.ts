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
  selector: 'page-technicianlist',
  templateUrl: 'technicianlist.html'
})
export class TechnicianlistPage {
  
  private technicians: any;
  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public technicianservice: TechnicianService) {
    
    if(technicianservice.getTechnicianItem() == null){
      this.technicians = [];
    } else {
      this.technicians = technicianservice.getTechnicianItem();
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicianlistPage');
  }

  technicianSelected(index: number){
    	this.navCtrl.setRoot(TechniciandetailsPage, {listIndex: index, listType: "ALL"});
  }
  
  // addNewTechnician(){
  //   this.navCtrl.push({
  //                         "EMP_ID_NO": "00003",
  //                         "EMP_INITIALS": "TECH1",
  //                         "EMP_LAST_NAME": "TECH1",
  //                         "INITIALS": "T1",
  //                         "CUST_ADDR_1": "ADDR_1",
  //                         "CUST_ADDR_2": "ADDR_1",
  //                         "CUST_ADDR_3": "ADDR_1",
  //                         "CUST_CITY_STATE": "",
  //                         "ZIP_CODE_9": "1908",
  //                         "PHONE_NO": "+63 987 987 9898",
  //                         "SHIFT_CODE": "NYTSHFT",
  //                         "STORE_NO": "STORE_1",
  //                         "COST_CTR_CODE": "COST_1",
  //                         "ORM_HOURS_BEGIN": "10pm",
  //                         "ORM_HOURS_END": "6am",
  //                         "MP_PRICING_STORE": "",
  //                         "MP_PRICING_COST_CTR": "",
  //                         "SPECIALTY_1": "DIGGING",
  //                         "SPECIALTY_2": "PREVENTIVE MAINTENANCE",
  //                         "REMARKS": "Junior Technician"
  //                     });
  // }
}
