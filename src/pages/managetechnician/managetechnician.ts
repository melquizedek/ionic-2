import { Component } from '@angular/core';
import { NavController, NavParams,ViewController, MenuController, Nav ,ModalController} from 'ionic-angular';
import { TechnicianService } from '../../providers/technician_service';
import { TechniciandetailsPage } from '../techniciandetails/techniciandetails';
import { TechnicianeditPage } from '../technicianedit/technicianedit';
import { ManagerService } from '../../providers/manager_service';
import {FiltersPagePage} from '../../pages/filters/filters';
/*
  Generated class for the Managetechnician page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-managetechnician',
  templateUrl: 'managetechnician.html'
})
export class ManagetechnicianPage {

  public myTechnician: Array<any> = [];
  public technician: Array<any> = [];
  status: string = "MyTechnicians";
  private user: any;
  public sortFilter:string;
  counter: number;
  
 
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public technicianService: TechnicianService
            , public managerService: ManagerService
            , public viewCtrl: ViewController
            , private menuCtrl: MenuController,
              public modalCtrl: ModalController) {

    this.loadMyTechnicianData();
    this.loadTechnicianData();

    this.sortFilter = "branch";
    this.sortTechnician('branch');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagetechnicianPage');
  }

  onChange(){
    switch(this.sortFilter) {
    case 'technician':
        this.sortTechnician('technician');
        break;
    case 'specialty':
        this.sortTechnician('specialty');
        break;
    default:
        this.sortTechnician('branch');
   }
}

sortTechnician(sortValue){
   var obj;
   if(this.status == "MyTechnicians"){
      obj = this.myTechnician;
   }else{
      obj = this.technician;
   }
   
    if(sortValue == "technician"){
      obj.sort(this.dynamicSort("REMARKS"));
    }else if(sortValue == "specialty"){
      obj.sort(obj.SPECIALTY_1 ? this.dynamicSort("SPECIALTY_1"): this.dynamicSort("SPECIALTY_2"));
    }else{
      obj.sort(this.dynamicSort("REMARKS"));
    }
    
    if(this.status == "MyTechnicians"){
      this.myTechnician = obj;
     }else{
        this.technician = obj;
     }
}

dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

  loadMyTechnicianData(){ 
    console.log("loadMyTechnicianData method call");
    this.technicianService.getTechnicianData().then(data => {
        this.user = this.managerService.getUserData();
        this.counter = 0;
        while(this.counter != data.length) {
          if(data[this.counter].STORE_NO == this.user.STORE_NO){
            this.myTechnician.push(data[this.counter]);
          } 
          this.counter++;
        }
        console.log(this.myTechnician);
    });
  }

  loadTechnicianData(){ 
    console.log("loadTechnicianData method call");
    this.technicianService.getTechnicianData().then(data => {
        this.technician = data;
        console.log(this.technician);
    });
  }

  technicianSelected(technicianList: any){
    this.navCtrl.parent.push(TechniciandetailsPage, {technician: technicianList});
  }

  viewAllTechnicians(){
    this.status = "Technicians";
  }
  
onFiltersPagePage()
{
  let modal=  this.modalCtrl.create(FiltersPagePage);
  modal.onDidDismiss(data => {
   });
  modal.present();
  }
}
