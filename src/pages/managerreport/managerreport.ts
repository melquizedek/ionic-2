import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskReportService } from '../../providers/task_report';
import { ManagerreportdetailsPage } from '../managerreportdetails/managerreportdetails';

/*
  Generated class for the Managerreport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-managerreport',
  templateUrl: 'managerreport.html'
})
export class ManagerreportPage {

    public serviceReport: Array<any> = [];
    public reviewReport: Array<any> = [];
    public approvedReport: Array<any> = [];
    counter: number;


    constructor(public navCtrl: NavController, public navParams: NavParams, public taskReport: TaskReportService ) {

    }

  ngOnInit(){
    let self = this; 
    
    //self.loadAllReports();
    // self.loadOpenTaskData();
    // self.loadAssignedTaskData();
    // self.loadCompletedTaskData();
  }

  loadAllReports(){
    console.log("loadAllReports method call");
    this.serviceReport = [];
    this.reviewReport = [];
    this.approvedReport = [];
    this.taskReport.getServiceReports().then(data => {
        this.counter = 0;
        while(this.counter != data.length) {
          console.log(data[this.counter].CUSTOMER_NAME)
          this.serviceReport.push(data[this.counter]);
          
          if(data[this.counter].REPORT_STATUS == "review"){
            this.reviewReport.push(data[this.counter]);
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


    //ge20170523 : created var for all service reports
    // public serviceReports: Array<any> = [
    //       { title: 'Wheel alignment of tractor', 
    //         personName: 'John Smith',
    //         workOrderNumber: 'AA02541',
    //         status: 'review',
    //         datetime: 'Mar 10,2017 03:22PM',
    //         completed: true
    //       },
    //       { title: 'Change Oil Tractor', 
    //         personName: 'Steve Johns',
    //         workOrderNumber: 'AA02542',
    //         status: 'review',
    //         datetime: 'May 11,2017 03:22PM',
    //         completed: true
    //       },
    //       { title: 'Wheel Replacement', 
    //         personName: 'Bill Jones',
    //         workOrderNumber: 'AA02543',
    //         status: 'review',
    //         datetime: 'Mar 12,2017 03:22PM',
    //         completed: false
    //       },
    //       { title: 'Wheel alignment of tractor', 
    //         personName: 'Johny Smiths',
    //         workOrderNumber: 'AA02544',
    //         status: 'approved',
    //         datetime: 'Jan 11,2017 03:22PM',
    //         completed: true
    //       },
    //       { title: 'Change Oil Tractor', 
    //         personName: 'Steven John',
    //         workOrderNumber: 'AA02545',
    //         status: 'approved',
    //         datetime: 'Jan 10,2017 03:22PM',
    //         completed: true
    //       }
    // ];
    
    status: string = "Review";


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerreportPage');
  }
  calendarView(){
    console.log("calendarView");
  }

  listView(){
    console.log("listView");
  }

// loadReviewReport(){
//   console.log("loadReviewReport method call");

//   //ge20170523 : this will filter serviceReports to get items for review
//   this.reviewReport = this.serviceReports.filter(function (s) {
//         return s.REPORT_STATUS == 'review'
//   });
// }

// loadApprovedTaskReport(){
//  console.log("loadApprovedTaskReport method call");

//   //ge20170523 : this will filter serviceReports to get approved items
//   this.approvedReport = this.serviceReports.filter(function (s) {
//         return s.REPORT_STATUS == 'approved'
//   });
// }

taskSelected(reports: any){
    console.log(reports);
    this.navCtrl.parent.push(ManagerreportdetailsPage, {reportItem: reports});
  }

  viewPendingReports(){
    this.status = "Review";
  }
}
