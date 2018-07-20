import { Component, Inject} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TechnicianService } from '../../providers/technician_service';
import { ManagerService } from '../../providers/manager_service';

/*
  Generated class for the MytechnicianPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mytechnician',
  templateUrl: 'mytechnician.html'
})
export class MytechnicianPage {
  techdata: any;

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public techservice: TechnicianService) {

            this.getTechnicians();

  }

  getTechnicians(){
    this.techservice.getTechnicianData().then(data => {
      this.techdata = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MytechnicianPage');
  }

}
