import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TechnicianService } from '../../providers/technician_service';
import { TabtechnicianPage } from '../tabtechnician/tabtechnician';
import { ManagetechnicianPage } from '../managetechnician/managetechnician';
import { ManagerService } from '../../providers/manager_service';


/*
  Generated class for the Techniciandetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-techniciandetails',
  templateUrl: 'techniciandetails.html'
})
export class TechniciandetailsPage {

  technician: any;
  listIndex: number;
  listType: any;
  addMyTran: boolean;
  deleteMyTran: boolean;
  counter: number;
  showDeleteTech: boolean;
  private user: any;

  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public technicianservice: TechnicianService
            , public loadingController: LoadingController
            , public alertCtrl : AlertController
            , public managerService: ManagerService) {
    
    this.technician = navParams.get("technician");
    this.identifyTechnician(this.technician);


    // app.directive('detectOutsideClick', function($document){
    // return {
    //     restrict: 'A',
    //     link: function(scope, elem, attr, ctrl) {
    //       elem.bind('click', function(e) {
    //         // this part keeps it from firing the click on the document.
    //         e.stopPropagation();
    //       });
    //       $document.bind('click', function() {
    //         // magic here.
    //           scope[attr.perform]();
    //         scope.$apply(attr.detectOutsideClick);
    //       })
    //     }
    //   }
    // });

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TechniciandetailsPage');    
  } 

  identifyTechnician(technician) {
    console.log("identifyTechnician method call");
    this.user = this.managerService.getUserData();
    if(technician.STORE_NO == this.user.STORE_NO){
         this.addMyTran = true;
         this.deleteMyTran = false;
    }else{
        this.addMyTran = false;
        this.deleteMyTran = true;
    }
  }

  deleteToMyTechnician(){
    let loading = this.loadingController.create({
        content:"Deleting.."
      });
      loading.present(); 
      setTimeout(()=>{ 
        console.log(this.technician);
        this.technicianservice.removeMyTechnician(this.listIndex);   
        this.navCtrl.setRoot(ManagetechnicianPage);
        loading.dismiss();
        this.showAlert("Technician Removed from MyTechnician.");
      }, 2000);            
      
  }

  addToMyTechnician(){    
      let loading = this.loadingController.create({
        content:"Saving.."
      });
      loading.present(); 
      setTimeout(()=>{ 
        console.log(this.technician);
        this.technicianservice.addMyTechnician({EMP_ID_NO: this.technician.EMP_ID_NO,
                                                EMP_INITIALS: this.technician.EMP_INITIALS,
                                                EMP_LAST_NAME:  this.technician.EMP_LAST_NAME,
                                                INITIALS: this.technician.INITIALS,
                                                CUST_ADDR_1: this.technician.CUST_ADDR_1,
                                                CUST_ADDR_2: this.technician.CUST_ADDR_2,
                                                CUST_ADDR_3: this.technician.CUST_ADDR_3,
                                                CUST_CITY_STATE: this.technician.CUST_CITY_STATE,
                                                ZIP_CODE_9: this.technician.ZIP_CODE_9,
                                                PHONE_NO: this.technician.PHONE_NO,
                                                SHIFT_CODE: this.technician.SHIFT_CODE,
                                                STORE_NO: this.technician.STORE_NO,
                                                COST_CTR_CODE: this.technician.COST_CTR_CODE,
                                                ORM_HOURS_BEGIN: this.technician.ORM_HOURS_BEGIN,
                                                ORM_HOURS_END: this.technician.ORM_HOURS_END,
                                                MP_PRICING_STORE: this.technician.MP_PRICING_STORE,
                                                MP_PRICING_COST_CTR: this.technician.MP_PRICING_COST_CTR,
                                                SPECIALTY_1: this.technician.SPECIALTY_1,
                                                SPECIALTY_2: this.technician.SPECIALTY_2,
                                                REMARKS: this.technician.REMARKS
                                            });    
        this.navCtrl.setRoot(ManagetechnicianPage);
        loading.dismiss();
        this.showAlert("Technician Added to MyTechnician.");
      }, 2000);      
  }
  
  showAlert(errorMessage){
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  } 

  ionViewWillEnter() {
    // this.deleteMyTran = true;
    this.showDeleteTech = false;
  }
  modifyTechnician() {
    this.showDeleteTech = true;
    // this.deleteMyTran = false;
  }
  hideDeleteTech() {
    console.log("HIDE!!!!!!");
    this.showDeleteTech = false;
  }
  deleteTech() {

  }
}
