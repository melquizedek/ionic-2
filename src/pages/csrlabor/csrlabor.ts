import { Component, Inject } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController, NavParams, ModalController, ViewController, MenuController } from 'ionic-angular';
import { CreateservicereportPagePage } from '../createservicereport/createservicereport';
import { ReportdetailsPage } from '../reportdetails/reportdetails';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
import { MyServiceReportPage } from "../myservicereport/myservicereport";
import { TechnicianService } from '../../providers/technician_service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as firebase from 'firebase/app';


/*
  Generated class for the CsrlaborPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-csrlabor',
  templateUrl: 'csrlabor.html'
})
export class CsrlaborPagePage {
  
  isCreateLabor: boolean = true;
  labors: Array<Object> = [];

  user: any = {};
  today: any = Date.now();
  category;
  nextKey: any;
  taskreport: any[];
  tablename: string = "LaborEntry/";
  task: any;
  thisReport;
  serviceReport;
  LaborKey;
  private tableName1: string = "report/";
  private tableName2: string = "/LABOR_ENTRY_KEYS";
  myDate: String = new Date().toString();
  myDateTime: String = this.myDate.substr(4, 20);
  CSRLABOR = {
    EMP_ID: [],
    LABOR_DATE: [],
    OVERTIME: [],
    LABOR_CODE: [],
    START_TIME: [],
    END_TIME: [],
    SHIFT: [],
    MAN_HOUR: []
  }
  shownGroup = null;
  loader: Loading = null;
  taskType: any;
  title: any;
  pushdata: Array<any> = [];
  laborEntryForm: FormGroup;

  taskReport : Object = {};

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public taskReportService: TaskReportService
    , public taskService: TaskService
    , public loadingCtrl: LoadingController
    , public viewCtrl: ViewController
    , private menuCtrl: MenuController
    , public modalCtrl: ModalController
    , public alertCtrl: AlertController
    , private formBuilder: FormBuilder
    , private techicianService: TechnicianService) {

    if (this.navParams.get("taskReport")) {
        this.taskReport = this.navParams.get("taskReport");
        console.log('this.taskReport => ', this.taskReport);
    }

    if (this.navParams.get("labors")) {
      this.labors = this.navParams.get("labors");
    }

    if (!this.user || !this.user.EMP_ID_NO) this.user = this.techicianService.getUserData();

    this.laborFormBuilder();
    // this.task = this.navParams.get("task");

    // //this.serviceReport = this.navParams.get('reportItem'); // task
    // //this.taskreport = this.taskReportService.getSpecificTaskReport(0);


    // // console.log(this.serviceReport);
    // // this.taskReportService.getServiceReports().then(data => {
    //   // this.counter = 0;
    //   this.thisReport = data[0];
    //   this.nextKey = data.length;
    //   for (var property in this.thisReport) {
    //     if (this.thisReport.hasOwnProperty(property)) {
    //       this.thisReport[property] = "";
    //       // console.log(property + ": " + this.thisReport[property])
    //       //ready for use
    //     }
    //   }

    //   // console.log(this.thisReport)
    //   // this.mapDataToReport();
    //   delete this.thisReport.$key;
    //   delete this.thisReport.$exists;

    // //   this.thisReport.ID = this.serviceReport.ID;
    // });
  }

  laborFormBuilder(): void {
    this.laborEntryForm = this.formBuilder.group({
      'EMP_ID': [this.user.EMP_ID_NO],
      'LABOR_DATE': [null],
      'OVERTIME': [null],
      'LABOR_CODE': [null],
      'START_TIME': [null],
      'END_TIME': [null],
      'SHIFT': [null],
      'MAN_HOUR': [null]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailsPage');
  }


  dismiss() {
     this.viewCtrl.dismiss(this.labors);
   }

  createLabor() : void {
    //console.log(this.laborEntryForm.value);
    this.labors.push(this.laborEntryForm.value);
    console.log(this.labors);
    this.isCreateLabor = false;
    //this.viewCtrl.dismiss(data);
  }

  addNewEntry() : void {
    this.laborFormBuilder();
    this.isCreateLabor = true;
  }

  PushLabor() {

    this.showLoader();

    if (this.thisReport.ID) {
      let LaborData =
          {
            "EMP_ID" : this.CSRLABOR.EMP_ID,
            "LABOR_DATE": this.CSRLABOR.LABOR_DATE,
            "OVERTIME": this.CSRLABOR.OVERTIME,
            "LABOR_CODE": this.CSRLABOR.LABOR_CODE,
            "START_TIME": this.CSRLABOR.START_TIME,
            "END_TIME": this.CSRLABOR.END_TIME,
            "SHIFT": this.CSRLABOR.SHIFT,
            "MAN_HOUR": this.CSRLABOR.MAN_HOUR
          };
      console.log(LaborData);
      let LED = "/LaborEntryData";
      // let fer = firebase.database().ref(LED).push(LaborData);
      this.LaborKey = LaborData;
      console.log("key to ok: ", this.LaborKey);

      // new Promise(resolve => {
      // var newPostKey = firebase.database().ref().child(this.tableName1 + this.thisReport.ID + this.tableName2).push();
      // var id = newPostKey;        
      // resolve(firebase.database().ref((this.tableName1 + this.thisReport.ID + this.tableName2 + id).set(this.LaborEntryData));
      firebase.database().ref('report/' + this.thisReport.ID + '/LABOR_ENTRY_KEYS').push(LaborData);
    // });
    this.navCtrl.pop();
    this.removeLoader();
  }
}


  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };


  isGroupShown(group) {
    return this.shownGroup === group;
  };


  showLoader() {
    if (this.loader == null) {
      this.loader = this.loadingCtrl.create({
        content: "Saving.."
      });
      this.loader.present();
    }
  }

  removeLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  // PushData(){
  // let datacon = {
  //   ADDITIONAL_SERVICE:this.thisReport.ADDITIONAL_SERVICE,
  //   CATEGORY:this.thisReport.CATEGORY,
  //   CAUSE:this.thisReport.CAUSE,
  //   CHARGE_CODE:this.thisReport.CHARGE_CODE,
  //   COMMENT:this.thisReport.COMMENT,
  //   COMMENTS:this.thisReport.COMMENTS,
  //   COMPLAINT:this.thisReport.COMPLAINT,
  //   COMPLAINTS:this.thisReport.COMPLAINTS,
  //   COMPLETED:this.thisReport.COMPLETED,
  //   COMPLICATIONS:this.thisReport.COMPLICATIONS,
  //   CORRECTION:this.thisReport.CORRECTION,
  //   COST:this.thisReport.COST,
  //   CUSTOMER_NAME:this.thisReport.CUSTOMER_NAME,
  //   CUSTOMER_NUMBER:this.thisReport.CUST_EQUIP_NUMBER,
  //   CUST_EQUIP_LOCATION:this.thisReport.CUST_EQUIP_LOCATION,
  //   CUST_EQUIP_MANUFACTURER :this.thisReport.CUST_EQUIP_MANUFACTURER,
  //   CUST_EQUIP_MODEL:this.thisReport.CUST_EQUIP_MODEL,
  //   CUST_EQUIP_NUMBER:this.thisReport.CUST_EQUIP_NUMBER,
  //   CUST_EQUIP_SERIALNUMBER:this.thisReport.CUST_EQUIP_SERIALNUMBER,
  //   CUST_EQUIP_SMU:this.thisReport.CUST_EQUIP_SMU,
  //   DAMAGE:this.thisReport.DAMAGE,
  //   DATE:this.thisReport.DATA,
  //   DEALER_CODE:this.thisReport.DEALER_CODE,
  //   DESCRIPTION:this.thisReport.DESCRIPTION,
  //   EMP_ID_NO:this.thisReport.EMP_ID_NO,
  //   END_TIME:this.thisReport.END_TIME,
  //   EQPMNF_SERIAL_NUM:this.thisReport.EQPMNF_SERIAL_NUM,
  //   HOURS:this.thisReport.HOURS,
  //   ID:this.thisReport.ID,
  //   INFO_IN_SIMS:this.thisReport.INFO_IN_SIMS,
  //   INSTRUCTIONS:this.thisReport.INSTRUCTIONS,
  //   IN_DATE:this.thisReport.IN_DATE,
  //   LABOR_DATE:this.thisReport.LABOR_DATE,
  //   LABOR_ENTRY_KEYS: fer.key,
  //   OUT_DATE:this.thisReport.OUT_DATE,
  //   OVERTIME:this.thisReport.OVERTIME,
  //   PARTS_RESTOCKED:this.thisReport.PARTS_RESTOCKED,
  //   PARTS_RETURNED:this.thisReport.PARTS_RETURNED,
  //   PERSON_NAME:this.thisReport.PERSON_NAME,
  //   PROCESS:this.thisReport.PROCESS,
  //   PROCESS_COMMENTS:this.thisReport.PROCESS_COMMENTS,
  //   PROMISE_DATE: this.thisReport.PROMISE_DATE,
  //   PSSR_REQ:this.thisReport.PSSR_REQ,
  //   QTY:this.thisReport.QTY,
  //   REJECTNOTES:this.thisReport.REJECTNOTES,
  //   REMAN_RETURNED:this.thisReport.REMAN_RETURNED,
  //   REPORT_STATUS:this.thisReport.REPORT_STATUS,
  //   SERVICE_DATE:this.thisReport.SERVICE_DATE,
  //   SERVICE_QUOTE:this.thisReport.SERVICE_QUOTE,
  //   START_TIME:this.thisReport.START_TIME,
  //   TIMESTAMP:this.thisReport.TIMESTAMP,
  //   TITLE:this.thisReport.TITLE,
  //   TOOLS_RETURNED:this.thisReport.TOOLS_RETURNED,
  //   WORK_ORDER_NUMBER:this.thisReport.WORK_ORDER_NUMBER,
  // }
  // }

}