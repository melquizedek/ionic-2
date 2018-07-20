import { Component } from '@angular/core';
import { NavController, NavParams, Loading, ModalController, LoadingController, MenuController} from 'ionic-angular';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
import { FileattachmentsPagePage } from '../fileattachments/fileattachments';
import { CreateservicereportPagePage} from '../createservicereport/createservicereport';

/*
  Generated class for the Reportdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reportdetails',
  templateUrl: 'reportdetails.html'
})
export class ReportdetailsPage {
  
  //old
  // shownGroup = null;
  // category: any;
  // taskreport: any;
  // mainTask: any;

  //new
  shownGroup = null;
  category: any;
  taskreport: any;
  mainTask: any;
  serviceReport: any;
  thisReport; any;
  nextKey: number;
  task: any;

   WORK_ORDER_NUMBER: any;
   EMP_ID_NO: any;
   DEALER_CODE: any;
   SERVICE_DATE: any;
   CUSTOMER_NAME: any;
   EQPMNF_SERIAL_NUM: any;

  loader:Loading = null;
  
// constructor(public navCtrl: NavController
//            , public navParams: NavParams
          
//            , public taskReportService: TaskReportService) {
    

    // try to display the value that will be passed
    //old data 
    // this.mainTask = this.navParams.get("reportItem");
    // this.taskreport = this.taskReportService.getSpecificTaskReport(0);
    
    // console.log(this.mainTask);

    // this.category = [{
    //                   categoryname: "Report Header Information",
    //                   subcategory:   [{item:"Work Order",value: this.mainTask.WORK_ORDER_NUMBER}
    //                                   ,{item:"Employee ID",value:"00023"}
    //                                   ,{item:"Dealer Code",value:"No02"}
    //                                   ,{item:"Service Date",value:"03032017"}
    //                                   ,{item:"Customer",value:"Dio"}
    //                                   ,{item:"Customer Equip No",value:"03032017"}
    //                                   ,{item:"Manufacturer",value:"03032017"}]
    //                 },
    //                 {
    //                   categoryname: "Truck Information",
    //                   subcategory:   [{item:"Work Order",value: this.mainTask.WORK_ORDER_NUMBER}
    //                                   ,{item:"Employee ID",value:"00023"}
    //                                   ,{item:"Dealer Code",value:"No02"}
    //                                   ,{item:"Service Date",value:"03032017"}
    //                                   ,{item:"Customer",value:"Dio"}
    //                                   ,{item:"Customer Equip No",value:"03032017"}
    //                                   ,{item:"Manufacturer",value:"03032017"}]
    //                 },
    //                 {
    //                   categoryname: "Segment Info",
    //                   subcategory:   [{item:"Work Order",value: this.mainTask.WORK_ORDER_NUMBER}
    //                                   ,{item:"Employee ID",value:"00023"}
    //                                   ,{item:"Dealer Code",value:"No02"}
    //                                   ,{item:"Service Date",value:"03032017"}
    //                                   ,{item:"Customer",value:"Dio"}
    //                                   ,{item:"Customer Equip No",value:"03032017"}
    //                                   ,{item:"Manufacturer",value:"03032017"}]
    //                 },
    //                 {
    //                   categoryname: "SIMS / Part Causing Failure",
    //                   subcategory:   [{item:"Work Order",value: this.mainTask.WORK_ORDER_NUMBER}                                      
    //                                   ,{item:"Part No",value:"03032017"}
    //                                   ,{item:"Manufacturer",value:"03032017"}]
    //                 },
    //                 {
    //                   categoryname: "Labor",
    //                   subcategory:   [{item:"Miscellaneous Cost",value:"AAA01"}
    //                                   ,{item:"Mileage",value:"00023"}
    //                                   ,{item:"Repair Background",value:"No02"}]
    //                 },
    //                 {
    //                   categoryname: "Workorder Closing",
    //                   subcategory:   [{item:"Work Order",value: this.mainTask.WORK_ORDER_NUMBER}]                
    //                 },
    //                 {
    //                   categoryname: "Additional Opportunities",
    //                   subcategory:   [{item:"Parts",value:"AAA01"}
    //                                   ,{item:"Application Data",value:"00023"}
    //                                   ,{item:"File Attachements  ",value:"No02"}]
    //                 }]

        constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public taskReportService: TaskReportService
            , public taskService: TaskService
            , public loadingController: LoadingController
            ,public modalCtrl: ModalController
            ,private menuCtrl: MenuController ) {

              this.task = this.navParams.get("task");

            this.serviceReport = this.navParams.get('reportItem');
            this.taskreport = this.taskReportService.getSpecificTaskReport(0);

            console.log(this.serviceReport);
            this.taskReportService.getServiceReports().then(data => {
              // this.counter = 0;
              this.thisReport = data[0];
              this.nextKey = data.length;
              console.log(this.thisReport);
              for (var property in this.thisReport) {
                if (this.thisReport.hasOwnProperty(property)) {  
                  this.thisReport[property] = "";
                  console.log(property + ": " + this.thisReport[property])
                  //ready for use
                }
              }
              // this.mapDataToReport();
              delete this.thisReport.$key;
              delete this.thisReport.$exists;
              console.log(this.serviceReport);
              this.thisReport.WORK_ORDER_NUMBER = this.serviceReport.WORK_ORDER_NUMBER;
              this.thisReport.EMP_ID_NO = this.serviceReport.EMP_ID_NO;
              this.thisReport.CUSTOMER_NAME = this.serviceReport.CUSTOMER_NAME;
              this.thisReport.EQPMNF_SERIAL_NUM = this.serviceReport.EQPMNF_SERIAL_NUM;
              this.thisReport.DEALER_CODE = this.serviceReport.DEALER_CODE;
              this.thisReport.SERVICE_DATE = this.serviceReport.SERVICE_DATE;
              this.thisReport.Model= this.serviceReport.Model;

              console.log(this.serviceReport);
              console.log(this.serviceReport.LABOR_ENTRY_KEYS);
              // var key = Object.keys(this.serviceReport.LABOR_ENTRY_KEYS);
              // var sampleArr = [];
              // console.log(key);
              // for (let a = 0; a < key.length; a++) {
              //   // sampleArr.push(this.serviceReport.LABOR_ENTRY_KEYS[key[a]]);
              //   console.log(a);
              //   sampleArr.push(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].EMP_ID);
          
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].EMP_ID);
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].END_TIME);
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].LABOR_CODE);
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].LABOR_DATE);
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].OVERTIME); 
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].SHIFT); 
              //   console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].START_TIME); 
              

              // console.log(sampleArr);

              console.log(this.thisReport);


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
                                , {id: "INSTRUCTIONS_RHI", item: "Instructions", value: this.serviceReport.INSTRUCTIONS_RHI}]

                   },
                    {
                      categoryname: "Truck Information",
                      subcategory:   [{id:"CUST_EQUIP_NUMBER",item:"Equipment Number",value: this.serviceReport.CUST_EQUIP_NUMBER}
                                      ,{id:"CUST_EQUIP_MANUFACTURER",item:"Manufacturer",value: this.serviceReport.CUST_EQUIP_MANUFACTURER}
                                      ,{id:"CUST_EQUIP_MODEL",item:"Model",value: this.serviceReport.CUST_EQUIP_MODEL}
                                      ,{id:"CUST_EQUIP_SERIALNUMBER",item:"Serial Number",value: this.serviceReport.CUST_EQUIP_SERIALNUMBER}
                                      ,{id:"CUST_EQUIP_LOCATION",item:"Location",value: this.serviceReport.CUST_EQUIP_LOCATION}]
                    },
                    {
                      categoryname: "Segment Info",
                      subcategory:   [{id:"J_CODE",item:"Job Code",value: this.serviceReport.J_CODE}
                                      ,{id:"OUT_DATE",item:"Out Date",value: this.serviceReport.OUT_DATE}
                                      ,{id:"PROMISE_DATE",item:"Promise Date",value: this.serviceReport.PROMISE_DATE}
                                      ,{id:"INSTRUCTIONS",item:"Instructions",value: this.serviceReport.INSTRUCTIONS}]
                    },
                    {
                       categoryname: "SIMS / Part Causing Failure",
                       subcategory: [{ id: "PART_NUM ", item: "Part Number", value: this.serviceReport.PART_NUM }
                                  , { id: "PART_NAME", item: "Part Name", value: this.serviceReport.PART_NAME}
                                  , { id: "QUANTITY", item: "Quantity", value: this.serviceReport.QUANTITY}
                                  , { id: "SMCS", item: "SMCS", value: this.serviceReport.SMCS }
                                  , { id: "PRIMARY", item: "Primary", value:  this.serviceReport.PRIMARY}
                                  , { id: "SECONDARY", item: "Secondary", value: this.serviceReport.SECONDARY}
                                  , { id: "GROUP_NUM", item: "Group Number", value: this.serviceReport.GROUP_NUM}
                                  , { id: "GROUP_NAME", item: "Group Name", value: this.serviceReport.GROUP_NAME}
                                  , { id: "DURABILITY_IND", item: "Durability Indicator", value: this.serviceReport.DURABILITY_IND}
                                  , { id: "PROD_INOP", item:  "Product Inoperable", value: this.serviceReport.PROD_INOP}
                                  , { id: "CAT", item: "CAT item", value:  this.serviceReport.CAT}
                                  , { id: "COMM", item: "Comments", value: this.serviceReport.COMM}]
                    },
                    {
                      categoryname: "Labor",
                      subcategory:   [{id:"LABOR_DATE",item:"Date",value: this.serviceReport.LABOR_DATE}
                                      ,{id:"START_TIME",item:"Start time",value: this.serviceReport.START_TIME}
                                      ,{id:"END_TIME",item:"End time",value: this.serviceReport.END_TIME}
                                      ,{id:"OVERTIME",item:"Overtime",value: this.serviceReport.OVERTIME}
                                      ,{id:"HOURS",item:"Hours",value: this.serviceReport.HOURS}]
                      // categoryname: "Labor",
                      // subcategory:   [{id:"LABOR_DATE",item:"Date",value: this.serviceReport.LABOR_ENTRY_KEYS[key[a]].LABOR_DATE}
                      //                 ,{id:"START_TIME",item:"Start time",value: this.serviceReport.LABOR_ENTRY_KEYS[key[a]].START_TIME}
                      //                 ,{id:"END_TIME",item:"End time",value: this.serviceReport.LABOR_ENTRY_KEYS[key[a]].END_TIME}
                      //                 ,{id:"OVERTIME",item:"Overtime",value: this.serviceReport.LABOR_ENTRY_KEYS[key[a]].OVERTIME}
                      //                 ,{id:"HOURS",item:"Hours",value: this.serviceReport.LABOR_ENTRY_KEYS[key[a]].MAN_HOUR}]
                    },
                    {
                      categoryname: "Miscellaneous Cost",
                      subcategory:   [{id:"EMP_ID_NO",item:"Employee ID",value: this.serviceReport.EMP_ID_NO}
                                      ,{id:"DATE",item:"Date",value: this.serviceReport.DATE}
                                      ,{id:"CHARGE_CODE",item:"Charge Code",value: this.serviceReport.CHARGE_CODE}
                                      ,{id:"QTY",item:"QTY",value: this.serviceReport.QTY}
                                      ,{id:"DESCRIPTION",item:"Description",value: this.serviceReport.DESCRIPTION}
                                      ,{id:"COST",item:"Cost",value: this.serviceReport.COST}
                                      ,{id:"COMMENTS",item:"Comment",value: this.serviceReport.COMMENTS}]   
                    },
                    {
                      categoryname: "Workorder Closing",
                      subcategory:   [{id:"COMPLETED",item:"Completed",value: this.serviceReport.COMPLETED}
                                      ,{id:"PARTS_RETURNED",item:"Parts Returned",value: this.serviceReport.PARTS_RETURNED}
                                      ,{id:"PARTS_RESTOCKED",item:"Parts Restocked",value: this.serviceReport.PARTS_RESTOCKED}
                                      ,{id:"TOOLS_RETURNED",item:"Tools Returned",value: this.serviceReport.TOOLS_RETURNED}
                                      ,{id:"REMAN_RETURNED",item:"Reman Returned",value: this.serviceReport.REMAN_RETURNED}
                                      ,{id:"INFO_IN_SIMS",item:"Information in SIMS",value: this.serviceReport.INFO_IN_SIMS}]   
                    },
                    {
                      categoryname: "Additional Opportunities",
                      subcategory:   [{id:"ADDITIONAL_SERVICE",item:"Additional Service",value: this.serviceReport.ADDITIONAL_SERVICE}
                                      ,{id:"SERVICE_QUOTE",item:"Additional Service Quote",value: this.serviceReport.SERVICE_QUOTE}
                                      ,{id:"PSSR_REQ",item:"Request PSSR to contact",value: this.serviceReport.PSSR_REQ}
                                      ,{id:"COMMENT",item:"Comment",value: this.serviceReport.COMMENT}]
                    },
                    {
                      categoryname: "Repair Background",
                      subcategory:   [{id:"COMPLAINTS",item:"Customer Complaint",value: this.serviceReport.COMPLAINTS}
                                      ,{id:"CORRECTION",item:"Cause of Failure",value: this.serviceReport.CORRECTION}
                                      ,{id:"COMPLICATIONS",item:"Resultant of Damage",value: this.serviceReport.COMPLICATIONS}
                                      ,{id:"PROCESS_COMMENTS",item:"Repair Process Comments",value: this.serviceReport.PROCESS_COMMENTS}]
                    }]



            }
          // }
          );

          

  }

  mapDataToReport(){
    //service report <-- report details
    this.thisReport.WORK_ORDER_NUMBER = this.serviceReport.WORK_ORDER_NUMBER;
    this.thisReport.EMP_ID_NO = this.serviceReport.EMP_ID_NO;
    this.thisReport.CUSTOMER_NAME = this.serviceReport.CUSTOMER_NAME;
    this.thisReport.EQPMNF_SERIAL_NUM = this.serviceReport.EQPMNF_SERIAL_NUM;
    this.thisReport.Model= this.serviceReport.Model;
 }

 saveData(){
    console.log(this.thisReport.WORK_ORDER_NUMBER);
    console.log(this.thisReport.DEALER_CODE);
    console.log(this.thisReport.CUSTOMER_NAME);
 }

 reportForm(){
   this.showLoader();
   this.thisReport.ID = this.nextKey;
   this.thisReport.DATE = this.serviceReport.SERVICE_DATE;
   this.thisReport.TITLE = this.serviceReport.TASK_DESCRIPTION;
   this.thisReport.REPORT_STATUS = "review";
   this.taskReportService.addReportToFb(this.thisReport, this.nextKey);
   this.navCtrl.pop();
   this.removeLoader();
   console.log(this.thisReport);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportdetailsPage');
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
 editReport(){
  
  let modal=  this.modalCtrl.create(CreateservicereportPagePage, {reportItem: this.serviceReport});
  modal.present();
// }
//      //console.log("display ba?");
//      console.log(this.serviceReport);
//      //this.navCtrl.push(CreateservicereportPagePage, {serviceReport: this.serviceReport});
//      this.navCtrl.push(CreateservicereportPagePage, {reportItem: this.serviceReport});
 }
 
  onFileattachmentsPagePage () {
    let modal=  this.modalCtrl.create(FileattachmentsPagePage, {reportItem: this.serviceReport});
  modal.present();
  }
	


}
