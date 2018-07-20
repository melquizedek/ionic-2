import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, MenuController, Nav ,ModalController} from 'ionic-angular';
import { ManagerreportPage } from '../managerreport/managerreport';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
import { FileattachmentsPagePage } from '../fileattachments/fileattachments';

/*
  Generated class for the Managerreportdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-managerreportdetails',
  templateUrl: 'managerreportdetails.html'
})
export class ManagerreportdetailsPage {

        someReports: any;
        serviceReport: any;
        qTask: any;
        reportDetails: any;
        category: any;
        shownGroup: null;
        public reportList: Array<any> = [];
        counter: number;
        cnt: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public taskReportService: TaskReportService, 
              public taskService: TaskService,
              private menuCtrl: MenuController,
              public modalCtrl: ModalController,) {

        this.serviceReport = this.navParams.get('reportItem');

        console.log(this.serviceReport);
        

        this.category = [{
                      categoryname: "Report Header Information",
                      subcategory: [{ id: "WORK_ORDER_NUMBER", item: "Work Order", value: this.serviceReport.WORK_ORDER_NUMBER }
                                , { id: "DEALER_CODE", item: "Dealer Code", value: this.serviceReport.DEALER_CODE }
                                , { id: "CUST_EQUIP_MANUFACTURER", item: "Manufacturer", value: this.serviceReport.CUST_EQUIP_MANUFACTURER }
                                , { id: "EMP_ID_NO", item: "Employee ID", value: this.serviceReport.EMP_ID_NO }
                                , { id: "SERVICE_DATE", item: "Service Date", value: this.serviceReport.SERVICE_DATE }
                                , { id: "CUST_EQUIP_MODEL", item: "Model", value: this.serviceReport.CUST_EQUIP_MODEL }
                                , { id: "CUSTOMER_NAME", item: "Customer", value: this.serviceReport.CUSTOMER_NAME }
                                , { id: "CUST_EQUIP_NUMBER", item: "Customer Equipment Number", value: this.serviceReport.CUST_EQUIP_NUMBER }
                                , { id: "EQPMNF_SERIAL_NUM", item: "Serial Number", value: this.serviceReport.EQPMNF_SERIAL_NUM }
                                , { id: "SMU_num", item: "SMU (1st field)", value: this.serviceReport.SMU_num}
                                , { id: "SMU_val", item: "SMU (2nd field)", value: this.serviceReport.SMU_val}
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


  ionViewDidLoad(){
    console.log('ionViewDidLoad ManagerreportPage');
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

  rejectReport(reportID){
    console.log(this.serviceReport.REJECTNOTES);
    console.log(reportID);
    this.taskReportService.geTaskListsRef().update(reportID.toString(), {
            REPORT_STATUS: 'rejected',
            REJECTNOTES: this.serviceReport.REJECTNOTES
          });
    this.navCtrl.pop();
  }


  approveReport(reportID){
    this.taskReportService.geTaskListsRef().update(reportID.toString(), {
            REPORT_STATUS: 'approved'
          });
    this.navCtrl.pop();
  }

  completeTask(reportID, wNumber){
    console.log(reportID);
    console.log(wNumber);
    this.taskReportService.geTaskListsRef().update(reportID.toString(), {
            COMPLETED: 'Yes'
          });
    this.taskService.getTaskData().then(data => {
        this.cnt = 0;
        while(this.cnt < data.length) {
          console.log(data[this.cnt].WORK_ORDER_NUMBER);
          if(data[this.cnt].WORK_ORDER_NUMBER == wNumber){
            this.qTask = data[this.cnt];
            this.taskService.getTasksListRef().update(this.qTask,{
                COMPLETED_IND: "Y"
            });
          }
          this.cnt ++;
        }
    });
    this.navCtrl.pop();
  }
  
onFileattachmentsPagePage()
{
  let modal=  this.modalCtrl.create(FileattachmentsPagePage);
  modal.present();
}
}
