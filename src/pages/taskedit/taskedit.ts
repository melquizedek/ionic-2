import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TaskService } from '../../providers/task_service';
import { TechnicianService } from '../../providers/technician_service';
import { ManagerService } from '../../providers/manager_service';
import { MytechnicianPage } from '../mytechnician/mytechnician';
import { ManageTaskPage } from '../managetask/managetask';
import { HelperService } from '../../providers/helper_service';
import * as moment from 'moment'

/*
  Generated class for the Taskedit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-taskedit',
  templateUrl: 'taskedit.html'
})
export class TaskeditPage {
  today: any = Date.now();
  taskEditForm: FormGroup;      
  task: any;
  technicians_names: any;
  taskType: any;
  title: any;
  timestamp;
  timestamp2;
  techniciandata;
  promisedate;
  startdate;
  private tableName: string = "task/"
  private taskID: any = "";

  @Input() taskInput: any;
  @Output() addTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public formBuilder: FormBuilder
            , public alertCtrl: AlertController
            , public taskService: TaskService
            , public technicianService: TechnicianService
            , public managerService: ManagerService
            , public loadingController: LoadingController
            , public modalCtrl: ModalController
            , private helperService : HelperService) {
    

    this.taskType = this.navParams.get("taskType");
    
    if (this.navParams.get("taskSelected")) {
      this.title = "Modify Task"
      this.task = this.navParams.get("taskSelected");
      this.taskID = this.task.taskID;
    } else {
      this.title = "Create Task";
      this.task = [];
    }
    
    console.log('TaskeditPage: taskType => ', this.taskType, 'taskSelected => ', this.task);

    this.technicians_names = this.technicianService.getTechnicianItem();

    this.taskEditForm = formBuilder.group({
      'TASK_DESCRIPTION' : [this.task.TASK_DESCRIPTION, Validators.compose([Validators.required])],
      'EMP_ID_NO' : [this.task.EMP_ID_NO],
      'CUSTOMER_NAME' : [this.task.CUSTOMER_NAME, Validators.compose([Validators.required])],
      'URGENCY_CODE' : [this.task.URGENCY_CODE, Validators.compose([Validators.required])],
      'DATE_PROMISED' : [this.task.DATE_PROMISED],
      'PROMISE_START_DATE' : [this.task.PROMISE_START_DATE],
      'TASK_LOCATION' : [this.task.TASK_LOCATION, Validators.compose([Validators.required])],
      'TASK_COMMENTS' : [this.task.TASK_COMMENTS, Validators.compose([Validators.required])]
    });
    
    this.timestamp = new Date(this.task.DATE_PROMISED).getTime();
    this.timestamp2 = new Date(this.task.DATE_PROMISED).getTime();

    console.log(this.timestamp);
    console.log(this.timestamp2);

    this.technicianService.getTechnicianData().then(data => {
      this.techniciandata = data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskeditPage');
  }
  
  samplebtn(){
    console.log(this.startdate);
    console.log(this.promisedate);

    let ans = this.today * 1000;
    console.log(ans);
    let toDate = this.promisedate;
    let fromDate = this.startdate;
    
    let time = new Date(this.startdate).getTime();
    let time2 = new Date(this.promisedate).getTime();

    var magicNumber = (1000 * 60 * 60 * 24);
    var remday = Math.floor((time2 - time) / magicNumber);

    console.log(remday);
    console.log(time);
    console.log(time2);
  }


  saveValue() : boolean{ // insert value to firebase
    let DATE_PROMISED = new Date(this.taskEditForm.value.DATE_PROMISED).getTime();
    let PROMISE_START_DATE = new Date(this.taskEditForm.value.PROMISE_START_DATE).getTime();

    if (this.taskEditForm.invalid) {
      this.showAlert("Please check all the required fields!");
      return false;
    }

    // if(moment(this.taskEditForm.value.DATE_PROMISED, "YYYY-DD-MM", true).isValid()){

    //if(this.verifyInput()){   
      var selectedTechs: Array<string> = [];
      var techInitials: Array<string> = [];
      if (this.taskEditForm.value.EMP_ID_NO) {
        selectedTechs = this.taskEditForm.value.EMP_ID_NO;
        for (let tech of this.techniciandata) {
            //console.log(tech.EMP_ID_NO, selectedTechs, selectedTechs.indexOf(tech.EMP_ID_NO));
            if (selectedTechs.indexOf(tech.EMP_ID_NO) > -1) {
              techInitials.push(tech.EMP_FIRST_NAME + ' ' + tech.EMP_LAST_NAME);
            }
        }
      }

      let loading = this.loadingController.create({
        content:"Processing.."
      });
      loading.present();

      let task = {ACTIVITY_INDICATOR: "OPEN"
      ,COMPLETED_IND: "N"
      ,COST_CENTER_CODE: this.managerService.cost_ctr_code
      ,CREATED_BY: this.managerService.initial
      ,CUSTOMER_NAME: this.taskEditForm.value.CUSTOMER_NAME 
      ,CUSTOMER_NUMBER: ""
      ,CUST_EQUIP_NUMBER: ""
      ,DATE_PROMISED: DATE_PROMISED
      ,DURATION: ""
      ,EMPLOYEE_INITIALS: (techInitials.length) ? techInitials : ""
      ,EMPLOYEE_LAST_NAME: ""
      ,EMP_ID_NO: (selectedTechs.length) ? selectedTechs : ""
      ,EQPMNF_SERIAL_NUM: ""
      ,EQUIP_MANFCTUR_CD: ""
      ,EQUIP_MNFCTR_MODEL: ""
      ,PRE_WRK_ORD_NUM: ""
      ,PROMISE_START_DATE: PROMISE_START_DATE
      ,SIGNATURE_OF_COMPLETION: ""
      ,STORE_NUMBER: this.managerService.store_no
      ,SVC_WRK_ORD_CNTPH: ""
      ,TASK_COMMENTS: this.taskEditForm.value.TASK_COMMENTS
      ,TASK_DESCRIPTION: this.taskEditForm.value.TASK_DESCRIPTION
      ,TASK_LOCATION: this.taskEditForm.value.TASK_LOCATION
      ,TASK_SOURCE: ""
      ,TRANSACTION_ID: ""
      ,TRANSACTION_TYPE: ""
      // ,TRANS_TIMESTAMP: new Date()
      ,TRANS_TIMESTAMP: this.today
      ,URGENCY_CODE: this.taskEditForm.value.URGENCY_CODE
      ,WORK_ORDER_NUMBER: this.helperService.makeid()
      ,WORK_ORD_OPER_NUM: ""
      ,WORK_ORD_SEG_NUM: ""}

      if (this.taskID !== "") {
        console.log("update task =>", task);
        this.taskService.updateTaskToFb(this.taskID, task).then(isError => {
          let msg = (isError) ? "Server error. Please try again later." : "Data has been updated!";
          this.showAlert(msg);
          this.navCtrl.setRoot(ManageTaskPage, {taskType: this.taskType});
          loading.dismiss();
        });
      } else {
          this.taskService.addTaskToFb(task).then(data => {
              this.showAlert("Data saved!");
              this.navCtrl.setRoot(ManageTaskPage, {taskType: this.taskType});
              loading.dismiss();
            });
      }
    // }
      
    // else{
        // this.showAlert("Due / PROMISE DATE: Please input valid date in format YYYY-MM-DD.");
    // } 
    return true;
  }

  setValue(){        
    this.taskEditForm.value.taskName = "sample";
  }

  showAlert(errorMessage){
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  } 
  
  verifyInput(){
    var valid = false;    
    if(this.taskEditForm.controls['TASK_DESCRIPTION'].hasError('required') 
      || this.taskEditForm.controls['EMPLOYEE_INITIALS'].hasError('required')){
      this.showAlert('Please fill up the fields first.');
    } else {
      valid = true;
    }
    return valid;     
  }

  selectTechnician() {
    this.navCtrl.push(MytechnicianPage);
  }

  compareFn(option1: any, option2: any) {
    console.log(option1);
    return option1.value === option2.value;
  }

}
