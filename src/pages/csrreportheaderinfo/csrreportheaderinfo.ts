import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateservicereportPagePage} from '../createservicereport/createservicereport';
import { CsrlaborPagePage} from '../csrlabor/csrlabor';
import { TaskReportService } from '../../providers/task_report';
import { TaskService } from '../../providers/task_service';
import { TaskeditPage } from '../taskedit/taskedit';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


/*
  Generated class for the CsrreportheaderinfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-csrreportheaderinfo',
  templateUrl: 'csrreportheaderinfo.html'
})
export class CsrreportheaderinfoPagePage {
  category: any;
  taskreport: any;
  serviceReport: any;
  shownGroup = null;
 task: any;

 taskUpdateForm: FormGroup; 



details = {
    WORK_ORDER_NUMBER: [],
    EMP_ID_NO: [],
    DEALER_CODE:[],
    SERVICE_DATE:[],
    CUSTOMER_NAME:[],
    CUST_EQUIP_NUMBER:[],
    EQUIP_MANFCTUR_CD:[],
    EQUIP_MNFCTR_MODEL:[],
    EQPMNF_SERIAL_NUM:[],
    SMU:[],
    EQPMNF_LOCATION:[],
    IN_DATE:[],
    OUT_DATE:[],
    PROMISE_DATE:[],
    INSTRUCTION:[],
  }; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
       public taskReportService: TaskReportService, public viewCtrl:ViewController,
       public formBuilder: FormBuilder) {

          this.serviceReport = this.navParams.get('aDetails');
this.task = this.navParams.get("taskSelected");    
        console.log(this.serviceReport);
        
       this.category = [{
                      categoryname: "Report Header Information",
                      subcategory:   [{item:"Work Order",value: "AA02541"}
                                      ,{item:"Employee ID",value:"0002"}
                                      ,{item:"Dealer Code",value:"N020"}
                                      ,{item:"Service Date",value:"03032017"}
                                      ,{item:"Customer",value:"Dior"}
                                      ,{item:"Customer Equip No",value:"3455231432"}
                                      ,{item:"Manufacturer",value:"Caterpillar Inc."}
                                      ,{item:"Serial No",value:"1x1"}
                                      ,{item:"SMU",value:"100"}
                                      ,{item:"IN Date",value:"4/7/2017"}
                                      ,{item:"OUT Date",value:"4/7/2017"}]
                    }]

      this.taskUpdateForm = formBuilder.group({
      'TASK_DESCRIPTION' : [this.task.TASK_DESCRIPTION, Validators.compose([Validators.required])],
      'EMPLOYEE_INITIALS' : [this.task.EMPLOYEE_INITIALS, Validators.compose([Validators.required])],
      'CUSTOMER_NAME' : [this.task.CUSTOMER_NAME, Validators.compose([Validators.required])],
      'URGENCY_CODE' : [this.task.URGENCY_CODE, Validators.compose([Validators.required])],
      'DATE_PROMISED' : [this.task.DATE_PROMISED, Validators.compose([Validators.required])],
      'PROMISE_START_DATE' : [this.task.PROMISE_START_DATE, Validators.compose([Validators.required])],
      'TASK_LOCATION' : [this.task.TASK_LOCATION, Validators.compose([Validators.required])],
      'TASK_COMMENTS' : [this.task.TASK_COMMENTS, Validators.compose([Validators.required])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CsrreportheaderinfoPagePage');
  }

  callUpdate(){

  }
  gotoCreateServiceReportPage1(task:any){
  this.navCtrl.push(CreateservicereportPagePage, {taskDetails: task});
}

  gotoLaborPage(task:any){
  this.navCtrl.push(CsrlaborPagePage, {taskDetails: task});
  }
toggleGroup(group) {
  console.log(group)
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };

  goToUpdate(){
   console.log(this.details);
    this.viewCtrl.dismiss();
    //this.navCtrl.push(TaskeditPage, {taskDetails: task});
  }

   dismiss(){
     this.viewCtrl.dismiss();
   }
}
