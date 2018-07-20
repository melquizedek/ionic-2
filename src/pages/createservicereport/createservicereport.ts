import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ViewController, Loading, MenuController, Nav ,ModalController} from 'ionic-angular';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
import { FileattachmentsPagePage } from '../fileattachments/fileattachments';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {CsrlaborPagePage}from '../csrlabor/csrlabor';
import{CsrlaborlistPagePage} from '../csrlaborlist/csrlaborlist';
import { MyServiceReportPage } from "../myservicereport/myservicereport";
import * as moment from 'moment';
/*
  Generated class for the CreateservicereportPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-createservicereport',
  templateUrl: 'createservicereport.html'
})  
export class CreateservicereportPagePage {
  speechList: Array<string> = [];
  rootPage: any;
  public userData: Array<any> = [];
  shownGroup = null;
  category: any;
  taskreport: any;
  mainTask: any;
  serviceReport: any = {TITLE: "", WORK_ORDER_NUMBER: ""};
  thisReport: any = {};
  nextKey: number;
  selectedTask: any;
  myDate: String = new Date().toString();
  myDateTime: String = this.myDate.substr(4,20);

  WORK_ORDER_NUMBER: any;
  EMP_ID_NO: any;
  DEALER_CODE: any;
  SERVICE_DATE: any;
  CUSTOMER_NAME: any;
  EQPMNF_SERIAL_NUM: any;

  loader:Loading = null;
  taskType: any;
  title: any;
  reportFrom: FormGroup;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public taskReportService: TaskReportService,
    public taskService: TaskService,
    public loadingController: LoadingController,
    private menuCtrl: MenuController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder) {
    
    if (this.navParams.get("task")) {
      let selectedTask = this.serviceReport = this.navParams.get("task");
      this.serviceReport.TITLE = selectedTask.TASK_DESCRIPTION;
      this.serviceReport.WORK_ORDER_NUMBER = selectedTask.WORK_ORDER_NUMBER;
    }

    if (this.navParams.get('reportItem')) {
      this.serviceReport = this.navParams.get('reportItem'); // task
    }

    this.reportFrom = formBuilder.group({
      'WORK_ORDER_NUMBER': [this.serviceReport.WORK_ORDER_NUMBER],
      'DEALER_CODE': [this.serviceReport.DEALER_CODE],
      'CUST_EQUIP_MANUFACTURER': [this.serviceReport.CUST_EQUIP_MANUFACTURER],
      'EMP_ID_NO': [this.serviceReport.EMP_ID_NO],
      'PROMISE_START_DATE': [moment(this.serviceReport.PROMISE_START_DATE).format('YYYY-MM-DD')],
      'CUST_EQUIP_MODEL': [this.serviceReport.CUST_EQUIP_MODEL],
      'CUSTOMER_NAME': [this.serviceReport.CUSTOMER_NAME],
      'CUST_EQUIP_NUMBER': [this.serviceReport.CUST_EQUIP_NUMBER],
      'EQPMNF_SERIAL_NUM': [this.serviceReport.EQPMNF_SERIAL_NUM],
      'CUST_EQUIP_LOCATION' : [this.serviceReport.CUST_EQUIP_LOCATION],
      'INSTRUCTIONS_RHI': [this.serviceReport.INSTRUCTIONS_RHI],
      'DATE_PROMISED': [moment(this.serviceReport.DATE_PROMISED).format('YYYY-MM-DD')],
      'CUST_EQUIP_SERIALNUMBER': [null],
      'JOB_CODE':[null],
      'COMP_CODE':[null],
      'INSTRUCTIONS':[null],
      'PART_NUM':[null],
      'PART_NAME':[null],
      'QUANTITY':[null],
      'SMCS':[null],
      'PRIMARY':[null],
      'SECONDARY':[null],
      'GROUP_NUM':[null],
      'GROUP_NAME':[null],
      'DURABILITY_IND':[null],
      'PROD_INOP':[null],
      'CAT':[null],
      'COMM':[null],
      'DATE':[null],
      'CHARGE_CODE':[null],
      'QTY':[null],
      'DESCRIPTION':[null],
      'COST':[null],
      'COMMENTS':[null],
      'COMPLETED':[null],
      'PARTS_RETURNED':[null],
      'PARTS_RESTOCKED':[null],
      'TOOLS_RETURNED':[null],
      'REMAN_RETURNED':[null],
      'INFO_IN_SIMS':[null],
      'ADDITIONAL_SERVICE':[null],
      'SERVICE_QUOTE':[null],
      'PSSR_REQ':[null],
      'COMMENT':[null],
      'COMPLAINTS':[null],
      'CORRECTION':[null],
      'COMPLICATIONS':[null],
      'PROCESS_COMMENTS':[null],
      'LABOR_DATE': [null],
      'START_TIME': [null],
      'END_TIME': [null],
      'OVERTIME': [null],
      'HOURS': [null]
    });

    //this.taskreport = this.taskReportService.getSpecificTaskReport(0);

    console.log("CreateservicereportPagePage");

    /*this.taskReportService.getServiceReports().then(data => {
      // this.counter = 0;
      this.thisReport = data[0];
      this.nextKey = data.length;
      for (var property in this.thisReport) {
        if (this.thisReport.hasOwnProperty(property)) {
          this.thisReport[property] = "";
          console.log(property + ": " + this.thisReport[property])
          //ready for use
        }
      }
      console.log(this.thisReport)
      // this.mapDataToReport();
      delete this.thisReport.$key;
      delete this.thisReport.$exists;

      this.thisReport.ID = this.serviceReport.ID;


      if (this.thisReport.ID) {

        this.thisReport.TITLE = this.serviceReport.TITLE;
        this.thisReport.WORK_ORDER_NUMBER = this.serviceReport.WORK_ORDER_NUMBER;
        this.thisReport.EMP_ID_NO = this.serviceReport.EMP_ID_NO;
        this.thisReport.CUSTOMER_NAME = this.serviceReport.CUSTOMER_NAME;
        this.thisReport.EQPMNF_SERIAL_NUM = this.serviceReport.EQPMNF_SERIAL_NUM;
        this.thisReport.DEALER_CODE = this.serviceReport.DEALER_CODE;
        this.thisReport.SERVICE_DATE = this.serviceReport.SERVICE_DATE;

        this.thisReport.CUST_EQUIP_NUMBER = this.serviceReport.CUST_EQUIP_NUMBER;
        this.thisReport.CUST_EQUIP_MANUFACTURER = this.serviceReport.CUST_EQUIP_MANUFACTURER;
        this.thisReport.CUST_EQUIP_MODEL = this.serviceReport.CUST_EQUIP_MODEL;
        this.thisReport.CUST_EQUIP_SERIALNUMBER = this.serviceReport.CUST_EQUIP_SERIALNUMBER;
        this.thisReport.CUST_EQUIP_LOCATION = this.serviceReport.CUST_EQUIP_LOCATION;

        this.thisReport.IN_DATE = this.serviceReport.IN_DATE;
        this.thisReport.OUT_DATE = this.serviceReport.OUT_DATE;
        this.thisReport.PROMISE_DATE = this.serviceReport.PROMISE_DATE;
        this.thisReport.INSTRUCTIONS = this.serviceReport.INSTRUCTIONS;

        this.thisReport.COMPLAINT = this.serviceReport.COMPLAINT;
        this.thisReport.CAUSE = this.serviceReport.CAUSE;
        this.thisReport.DAMAGE = this.serviceReport.DAMAGE;
        this.thisReport.PROCESS = this.serviceReport.PROCESS;

        this.thisReport.LABOR_DATE = this.serviceReport.LABOR_DATE;
        this.thisReport.START_TIME = this.serviceReport.START_TIME;
        this.thisReport.END_TIME = this.serviceReport.END_TIME;
        this.thisReport.OVERTIME = this.serviceReport.OVERTIME;
        this.thisReport.HOURS = this.serviceReport.HOURS;

        this.thisReport.DATE = this.serviceReport.DATE;
        this.thisReport.CHARGE_CODE = this.serviceReport.CHARGE_CODE;
        this.thisReport.QTY = this.serviceReport.QTY;
        this.thisReport.DESCRIPTION = this.serviceReport.DESCRIPTION;
        this.thisReport.COST = this.serviceReport.COST;
        this.thisReport.COMMENTS = this.serviceReport.COMMENTS;

        this.thisReport.COMPLETED = this.serviceReport.COMPLETED;
        this.thisReport.PARTS_RETURNED = this.serviceReport.PARTS_RETURNED;
        this.thisReport.PARTS_RESTOCKED = this.serviceReport.PARTS_RESTOCKED;
        this.thisReport.TOOLS_RETURNED = this.serviceReport.TOOLS_RETURNED;
        this.thisReport.REMAN_RETURNED = this.serviceReport.REMAN_RETURNED;
        this.thisReport.INFO_IN_SIMS = this.serviceReport.INFO_IN_SIMS;

        this.thisReport.ADDITIONAL_SERVICE = this.serviceReport.ADDITIONAL_SERVICE;
        this.thisReport.SERVICE_QUOTE = this.serviceReport.SERVICE_QUOTE;
        this.thisReport.PSSR_REQ = this.serviceReport.PSSR_REQ;
        this.thisReport.COMMENT = this.serviceReport.COMMENT;
  //new inserts      
        this.thisReport.JOB_CODE = this.serviceReport.JOB_CODE;
        this.thisReport.COMP_CODE= this.serviceReport.COMP_CODE;
        this.thisReport.INSTRUCTIONS_RHI= this.serviceReport.INSTRUCTIONS_RHI;
      
        this.thisReport.PART_NUM= this.serviceReport.PART_NUM;
        this.thisReport.PART_NAME= this.serviceReport.PART_NAME;
        this.thisReport.QUANTITY= this.serviceReport.QUANTITY;
        this.thisReport.SMCS= this.serviceReport.SMCS;
        this.thisReport.PRIMARY= this.serviceReport.PRIMARY;
        this.thisReport.SECONDARY=  this.serviceReport.SECONDARY;
        this.thisReport.GROUP_NUM= this.serviceReport.GROUP_NUM;
        this.thisReport.GROUP_NAME= this.serviceReport.GROUP_NAME;
        this.thisReport.DURABILITY_IND= this.serviceReport.DURABILITY_IND;
        this.thisReport.PROD_INOP= this.serviceReport.PROD_INOP;
        this.thisReport.CAT= this.serviceReport.CAT;
        this.thisReport.COMM= this.serviceReport.COMM;
        this.thisReport.SMU_num= this.serviceReport.SMU_num;
        this.thisReport.SMU_val= this.serviceReport.SMU_val;
//new 
        this.thisReport.COMPLAINTS = this.serviceReport.COMPLAINTS;
        this.thisReport.CORRECTION = this.serviceReport.CORRECTION;
        this.thisReport.COMPLICATIONS = this.serviceReport.COMPLICATIONS;
        this.thisReport.PROCESS_COMMENTS = this.serviceReport.PROCESS_COMMENTS;
        this.thisReport.LABOR_ENTRY_KEYS = this.serviceReport.LABOR_ENTRY_KEYS;
        console.log(this.thisReport);

      } else {
        this.thisReport.TITLE = this.serviceReport.TASK_DESCRIPTION;
        this.thisReport.WORK_ORDER_NUMBER = this.serviceReport.WORK_ORDER_NUMBER;
        this.thisReport.EMP_ID_NO = this.serviceReport.EMP_ID_NO;
        this.thisReport.CUSTOMER_NAME = this.serviceReport.CUSTOMER_NAME;
        this.thisReport.EQPMNF_SERIAL_NUM = this.serviceReport.EQPMNF_SERIAL_NUM;
        this.thisReport.CUST_EQUIP_NUMBER = this.serviceReport.CUST_EQUIP_NUMBER;
        this.thisReport.CUST_EQUIP_MANUFACTURER = this.serviceReport.EQUIP_MANFCTUR_CD;
        this.thisReport.CUST_EQUIP_MODEL = this.serviceReport.EQUIP_MNFCTR_MODEL;
        this.thisReport.CUST_EQUIP_SERIALNUMBER = this.serviceReport.EQPMNF_SERIAL_NUM;
        this.thisReport.CUST_EQUIP_LOCATION = this.serviceReport.TASK_LOCATION;
        this.thisReport.PROMISE_DATE = this.serviceReport.PROMISE_START_DATE;


        console.log(this.thisReport);
      }





      this.category = [{
        categoryname: "Report Header Information",
        subcategory: [{ id: "WORK_ORDER_NUMBER", item: "Work Order", value: this.thisReport.WORK_ORDER_NUMBER }
          , { id: "DEALER_CODE", item: "Dealer Code", value: this.thisReport.DEALER_CODE }
          , { id: "CUST_EQUIP_MANUFACTURER", item: "Manufacturer", value: this.serviceReport.CUST_EQUIP_MANUFACTURER }
          , { id: "EMP_ID_NO", item: "Employee ID", value: this.thisReport.EMP_ID_NO }
          , { id: "SERVICE_DATE", item: "Service Date", value: this.thisReport.SERVICE_DATE }
          , { id: "CUST_EQUIP_MODEL", item: "Model", value: this.serviceReport.CUST_EQUIP_MODEL }
          , { id: "CUSTOMER_NAME", item: "Customer", value: this.thisReport.CUSTOMER_NAME }
          , { id: "CUST_EQUIP_NUMBER", item: "Customer Equipment Number", value: this.serviceReport.CUST_EQUIP_NUMBER }
          , { id: "EQPMNF_SERIAL_NUM", item: "Serial Number", value: this.thisReport.EQPMNF_SERIAL_NUM }
          , { id: "SMU_num", item: "SMU (1st field)", value: this.thisReport.SMU_num}
          , { id: "SMU_val", item: "SMU (2nd field)", value: this.thisReport.SMU_val}
          , { id: "CUST_EQUIP_LOCATION", item: "Equipment Location", value: this.serviceReport.CUST_EQUIP_LOCATION }
          , { id: "PROMISE_DATE", item: "Promise Date", value: this.serviceReport.PROMISE_DATE }
          , {id: "INSTRUCTIONS_RHI", item: "INSTRUCTIONS_RHI", value: this.serviceReport.INSTRUCTIONS_RHI}]

      },
      {
        categoryname: "Truck Information",
        subcategory: [{ id: "CUST_EQUIP_NUMBER", item: "Equipment Number", value: this.serviceReport.CUST_EQUIP_NUMBER }
          , { id: "CUST_EQUIP_MANUFACTURER", item: "Manufacturer", value: this.serviceReport.CUST_EQUIP_MANUFACTURER }
          , { id: "CUST_EQUIP_MODEL", item: "Model", value: this.serviceReport.CUST_EQUIP_MODEL }
          , { id: "CUST_EQUIP_SERIALNUMBER", item: "Serial Number", value: this.serviceReport.CUST_EQUIP_SERIALNUMBER }
          , { id: "CUST_EQUIP_LOCATION", item: "Location", value: this.serviceReport.CUST_EQUIP_LOCATION}]
      },
      {
        categoryname: "Segment Info",
        subcategory: [{ id: "JOB_CODE", item: "Job Code", value: this.serviceReport.JOB_CODE}
          , { id: "COMP_CODE", item: "Component Code", value: this.serviceReport.COMP_CODE}
          // , { id: "PROMISE_DATE", item: "Promise Date", value: this.serviceReport.PROMISE_DATE }
          , { id: "INSTRUCTIONS", item: "Instructions", value: this.serviceReport.INSTRUCTIONS }]
      },
      {
        categoryname: "SIMS / Part Causing Failure",
        subcategory: [{ id: "PART_NUM ", item: "Part Number", value: this.serviceReport.PART_NUM }
          , { id: "PART_NAME", item: "Part Name", value: this.serviceReport.PART_NAME}
          , { id: "QUANTITY", item: "Quantity", value: this.serviceReport.QUANTITY}
          , { id: "SMCS", item: "SMCS", value: this.serviceReport.SMCS }
          , { id: "PRIMARY", item: "PRIMARY", value:  this.serviceReport.PRIMARY}
          , { id: "SECONDARY", item: "SECONDARY", value: this.serviceReport.SECONDARY}
          , { id: "GROUP_NUM", item: "Group Number", value: this.serviceReport.GROUP_NUM}
          , { id: "GROUP_NAME", item: "GROUP_NAME", value: this.serviceReport.GROUP_NAME}
          , { id: "DURABILITY_IND", item: "Durability Indicator", value: this.serviceReport.DURABILITY_IND}
          , { id: "PROD_INOP", item:  "Product Inoperable", value: this.serviceReport.PROD_INOP}
          , { id: "CAT", item: "CAT item", value:  this.serviceReport.CAT}
          , { id: "COMM", item: "Comments", value: this.serviceReport.COMM}]
      },
      {
        categoryname: "Labor",
        subcategory: [{ id: "LABOR_DATE", item: "Date", value: this.serviceReport.LABOR_DATE }
          , { id: "START_TIME", item: "Start time", value: this.serviceReport.START_TIME }
          , { id: "END_TIME", item: "End time", value: this.serviceReport.END_TIME }
          , { id: "OVERTIME", item: "Overtime", value: this.serviceReport.OVERTIME }
          , { id: "HOURS", item: "Hours", value: this.serviceReport.HOURS }]
      },
      {
        categoryname: "Miscellaneous Cost",
        subcategory: [{ id: "EMP_ID_NO", item: "Employee ID", value: this.serviceReport.EMP_ID_NO }
          , { id: "DATE", item: "Date", value: this.serviceReport.DATE }
          , { id: "CHARGE_CODE", item: "Charge Code", value: this.serviceReport.CHARGE_CODE }
          , { id: "QTY", item: "QTY", value: this.serviceReport.QTY }
          , { id: "DESCRIPTION", item: "Description", value: this.serviceReport.DESCRIPTION }
          , { id: "COST", item: "Cost", value: this.serviceReport.COST }
          , { id: "COMMENTS", item: "Comment", value: this.serviceReport.COMMENTS }]
      },
      {
        categoryname: "Workorder Closing",
        subcategory: [{ id: "COMPLETED", item: "Completed", value: this.serviceReport.COMPLETED }
          , { id: "PARTS_RETURNED", item: "Parts Returned", value: this.serviceReport.PARTS_RETURNED }
          , { id: "PARTS_RESTOCKED", item: "Parts Restocked", value: this.serviceReport.PARTS_RESTOCKED }
          , { id: "TOOLS_RETURNED", item: "Tools Returned", value: this.serviceReport.TOOLS_RETURNED }
          , { id: "REMAN_RETURNED", item: "Reman Returned", value: this.serviceReport.REMAN_RETURNED }
          , { id: "INFO_IN_SIMS", item: "Information in SIMS", value: this.serviceReport.INFO_IN_SIMS }]
      },
      {
        categoryname: "Additional Opportunities",
        subcategory: [{ id: "ADDITIONAL_SERVICE", item: "Additional Service", value: this.serviceReport.ADDITIONAL_SERVICE }
          , { id: "SERVICE_QUOTE", item: "Additional Service Quote", value: this.serviceReport.SERVICE_QUOTE }
          , { id: "PSSR_REQ", item: "Request PSSR to contact", value: this.serviceReport.PSSR_REQ }
          , { id: "COMMENT", item: "Comment", value: this.serviceReport.COMMENT }]
      },
      {
        categoryname: "Repair Background",
        subcategory: [{ id: "COMPLAINTS", item: "Complaint", value: this.serviceReport.COMPLAINTS }
          , { id: "CORRECTION", item: "Correction", value: this.serviceReport.CORRECTION }
          , { id: "COMPLICATIONS", item: "Complications", value: this.serviceReport.COMPLICATIONS }
          , { id: "PROCESS_COMMENTS", item: "Comments", value: this.serviceReport.PROCESS_COMMENTS }]
      },
      {
        categoryname: "File Attachments",
      },

      ]



    });*/
      
  }

  

  mapDataToReport(){
    //service report <-- task details
    this.thisReport.WORK_ORDER_NUMBER = this.serviceReport.WORK_ORDER_NUMBER;
    this.thisReport.EMP_ID_NO = this.serviceReport.EMP_ID_NO;
    this.thisReport.CUSTOMER_NAME = this.serviceReport.CUSTOMER_NAME;
    this.thisReport.EQPMNF_SERIAL_NUM = this.serviceReport.EQPMNF_SERIAL_NUM;
    this.thisReport.SERVICE_DATE = this.serviceReport.SERVICE_DATE;

    this.thisReport.CUST_EQUIP_NUMBER = this.serviceReport.CUST_EQUIP_NUMBER;
    this.thisReport.CUST_EQUIP_MANUFACTURER = this.serviceReport.CUST_EQUIP_MANUFACTURER;
    this.thisReport.CUST_EQUIP_MODEL = this.serviceReport.CUST_EQUIP_MODEL;
    this.thisReport.CUST_EQUIP_SERIALNUMBER = this.serviceReport.CUST_EQUIP_SERIALNUMBER;
    this.thisReport.CUST_EQUIP_LOCATION = this.serviceReport.CUST_EQUIP_LOCATION;

    this.thisReport.IN_DATE = this.serviceReport.IN_DATE;
    this.thisReport.OUT_DATE = this.serviceReport.OUT_DATE;
    this.thisReport.PROMISE_DATE = this.serviceReport.PROMISE_DATE;
    this.thisReport.INSTRUCTIONS = this.serviceReport.INSTRUCTIONS;

    this.thisReport.COMPLAINT = this.serviceReport.COMPLAINT;
    this.thisReport.CAUSE = this.serviceReport.CAUSE;
    this.thisReport.DAMAGE = this.serviceReport.DAMAGE;
    this.thisReport.PROCESS = this.serviceReport.PROCESS;    

    this.thisReport.LABOR_DATE = this.serviceReport.LABOR_DATE;
    this.thisReport.START_TIME = this.serviceReport.START_TIME;
    this.thisReport.END_TIME = this.serviceReport.END_TIME;
    this.thisReport.OVERTIME = this.serviceReport.OVERTIME;
    this.thisReport.HOURS= this.serviceReport.HOURS;

    this.thisReport.DATE = this.serviceReport.DATE;
    this.thisReport.CHARGE_CODE = this.serviceReport.CHARGE_CODE;
    this.thisReport.QTY = this.serviceReport.QTY;
    this.thisReport.DESCRIPTION = this.serviceReport.DESCRIPTION;
    this.thisReport.COST = this.serviceReport.COST;
    this.thisReport.COMMENTS = this.serviceReport.COMMENTS;

    this.thisReport.COMPLETED = this.serviceReport.COMPLETED;
    this.thisReport.PARTS_RETURNED = this.serviceReport.PARTS_RETURNED;
    this.thisReport.PARTS_RESTOCKED = this.serviceReport.PARTS_RESTOCKED;
    this.thisReport.TOOLS_RETURNED = this.serviceReport.TOOLS_RETURNED;
    this.thisReport.REMAN_RETURNED = this.serviceReport.REMAN_RETURNED;
    this.thisReport.INFO_IN_SIMS = this.serviceReport.INFO_IN_SIMS;

    this.thisReport.ADDITIONAL_SERVICE = this.serviceReport.ADDITIONAL_SERVICE;
    this.thisReport.SERVICE_QUOTE = this.serviceReport.SERVICE_QUOTE;
    this.thisReport.PSSR_REQ = this.serviceReport.PSSR_REQ;
    this.thisReport.COMMENT = this.serviceReport.COMMENT;
    this.thisReport.LABOR_ENTRY_KEYS = this.serviceReport.LABOR_ENTRY_KEYS;

    this.thisReport.COMPLAINTS = this.serviceReport.COMPLAINTS;
    this.thisReport.CORRECTION = this.serviceReport.CORRECTION;
    this.thisReport.COMPLICATIONS = this.serviceReport.COMPLICATIONS;
    this.thisReport.PROCESS_COMMENTS = this.serviceReport.PROCESS_COMMENTS;
 }

 saveData(){
    console.log(this.thisReport.WORK_ORDER_NUMBER);
    console.log(this.thisReport.DEALER_CODE);
    console.log(this.thisReport.CUSTOMER_NAME);
 }

 createServiceReport() : void {
    console.log(this.reportFrom.value);
 }

 reportForm(){
   this.showLoader();

   this.thisReport.REPORT_STATUS = "review";
   this.thisReport.TIMESTAMP = this.myDateTime;
   
  if(this.thisReport.ID){
     console.log("EDIT");
     console.log(this.thisReport);
     this.taskReportService.updateReportInFb(this.thisReport, this.thisReport.ID);
     console.log(this.thisReport);
     this.navCtrl.pop();
  }else{
     console.log("ADD");
     this.thisReport.ID = this.nextKey.toString();
     this.thisReport.TITLE = this.serviceReport.TASK_DESCRIPTION;
     this.taskReportService.addReportToFb(this.thisReport, this.thisReport.ID);
  }
   this.navCtrl.pop();
   this.navCtrl.setRoot(MyServiceReportPage);
   this.removeLoader();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailsPage');
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
			this.loader = this.loadingController.create({
					content:"Saving.."
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
dismiss(){
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
}
onFileattachmentsPagePage()
{
  let modal=  this.modalCtrl.create(FileattachmentsPagePage, {reportItem: this.serviceReport, ID: this.thisReport.ID, TITLE: this.thisReport.TITLE});
  modal.present();
}
onCsrlaborPagePage()
{
let modal= this.modalCtrl.create(CsrlaborPagePage);
  modal.present();
}
  // onFileattachmentsPagePage () {
  //   console.log("onFileattachmentsPagePage clicked");
  //   this.menuCtrl.close();
  //   //Skipping page switch if the user is on the same page
  //   if (this.navCtrl.getActive().component === FileattachmentsPagePage ) {
  //     console.log("Skipping since not needed");
  //     return;
  //   }
  //   this.navCtrl.push(FileattachmentsPagePage );
  // }
	//onCsrlaborPagePage(){
    // console.log("onFileattachmentsPagePage clicked");
    // this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    // if (this.navCtrl.getActive().component === CsrlaborPagePage) {
      // console.log("Skipping since not needed");
      // return;
    // }
    //this.navCtrl.push(CsrlaborPagePage );
  //}
  
//   CsrlaborlistPagePage(){
//     let modal= this.modalCtrl.create(CsrlaborlistPagePage);
//   modal.present();
// }

  labors: Array<Object> = [];
  PushData(){
    let ModalMoTo = this.modalCtrl.create(CsrlaborPagePage, {taskReport: this.reportFrom.value, labors: this.labors});
    ModalMoTo.onDidDismiss(data => {
      this.labors = data;
      console.log('emit labor data to createServiceReportPage => ', data);
    });
    ModalMoTo.present();
  }


  // listenToSpeech() {
  //   this.speechRecognition.startListening(this.androidOptions).subscribe(data => {
  //     this.speechList = data
  //     console.log(data)
  //   }, error => { 
  //     console.log(error) });
  // }
}

