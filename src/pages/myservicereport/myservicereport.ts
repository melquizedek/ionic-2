import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TaskService } from '../../providers/task_service';
import { ReportdetailsPage } from '../reportdetails/reportdetails';
import { CreateTaskReport } from '../createTaskReport/createTaskReport';
import { ManagerService } from '../../providers/manager_service';
import { TechnicianService } from '../../providers/technician_service';
import { AccountService } from '../../providers/account_service';

import { TaskReportService } from '../../providers/task_report';
//import { CreateservicereportPagePage } from '../createservicereport/createservicereport';

/*
  Generated class for the MyServiceReport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myservicereport',
  templateUrl: 'myservicereport.html'
})

export class MyServiceReportPage {

  public pendingReport: Array<any> = [];
  public approvedReport: Array<any> = [];
  status: string = "Pending";
  counter: number;
  private user: any;
  public sortFilter:string;
  displaymode: string = "list";

  public serviceReport: Array<any> = [];
  public reviewReport: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams
            , public taskService: TaskService
            , public technicianService: TechnicianService
            ,public taskReport: TaskReportService) {

  this.user = this.navParams.get("accountInfo");          
    }
    ngOnInit(){
  
    let self = this; 
    //call report service for Pending and Approved reports
    self.loadAllReports();
    self.loadPendingTaskReport(); 
    self.loadApprovedTaskReport(); 

    this.sortFilter = "reportdate";

    console.log(this.pendingReport);
    console.log(this.approvedReport);
    
  }
//add to check if will goto service report of technician
  loadAllReports(){
    console.log("loadAllReports method call technician");
    this.serviceReport = [];
    this.pendingReport = [];
    this.approvedReport = [];
    this.taskReport.getServiceReports().then(data => {
        this.counter = 0;
        while(this.counter != data.length) {
          console.log(data[this.counter].CUSTOMER_NAME)
          this.serviceReport.push(data[this.counter]);
          
          if(data[this.counter].REPORT_STATUS == "review" || data[this.counter].REPORT_STATUS == "rejected"){
            this.pendingReport.push(data[this.counter]);
          }
          if(data[this.counter].REPORT_STATUS == "approved"){
            this.approvedReport.push(data[this.counter]);
          }
          this.counter++;
        }
    });
  }

  ionViewWillEnter() {
    this.loadAllReports();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageTaskPage');
  }

  calendarView(){
    console.log("calendarView");
  }

  listView(){
    console.log("listView");
  }


  //Dummy method call for report list (Pending and Approved)
  loadPendingTaskReport(){
    console.log("loadPendingTaskReport method call");
    this.pendingReport = [];
    //       { title: 'Wheel alignment of tracktor', 
    //         promiseDate: 'Mar 28, 2017'},
    //       { title: 'Wheel replacement', 
    //         promiseDate: 'Mar 26, 2017'},
    //       { title: 'Create a floor plan', 
    //         promiseDate: 'Mar 26, 2017'}
    // ];
    //this.pendingReport = this.taskService.getTaskItemsByEmployee("ASSIGNED", "2222");
    this.taskService.getTaskData().then(data => {
        //retrieved again the data from the service request.
        this.user = this.technicianService.getUserData();

        this.counter = 0;
        while(this.counter != data.length) {
          if(data[this.counter].EMP_ID_NO == this.user.EMP_ID_NO &&
             data[this.counter].ACTIVITY_INDICATOR == "OPEN"){
            this.pendingReport.push(data[this.counter]);
          } 
          this.counter++;
        }
    });
  }
  loadApprovedTaskReport(){
    console.log("loadApprovedTaskReport method call");
    this.approvedReport = [];
    //       { title: 'Wheel alignment of tracktor', 
    //         promiseDate: 'Mar 22, 2017'},
    //        { title: 'Change oil', 
    //          promiseDate: 'Mar 23, 2017'}
    // ];
    //this.approvedReport = this.taskService.getTaskItemsByEmployee("COMPLETED", "2222");
    this.taskService.getTaskData().then(data => {
        //retrieved again the data from the service request.
        this.user = this.technicianService.getUserData();

        this.counter = 0;
        while(this.counter != data.length) {
          if(data[this.counter].EMP_ID_NO == this.user.EMP_ID_NO &&
             data[this.counter].ACTIVITY_INDICATOR == "CLOSE"){
            this.approvedReport.push(data[this.counter]);
          } 
          this.counter++;
        }
    });
  }

  //old
  taskSelected(reports: any){
    this.navCtrl.parent.push(ReportdetailsPage, {reportItem: reports});
  }

// try to connect it in CreateservicereportPage
  //  taskSelected(reports: any){
  //   this.navCtrl.push(CreateservicereportPagePage, {reportItem: reports});
  // }

   addNewTask() {
    this.navCtrl.push(CreateTaskReport);
  }
 onChange(){
}
}
