import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TaskService } from '../../providers/task_service';
import { CalendarPage } from '../calendar/calendar';
import { ManagerService } from '../../providers/manager_service';
import { TechnicianService } from '../../providers/technician_service';
import { AccountService } from '../../providers/account_service';
import { CreateservicereportPagePage } from '../crecreateservicereport/createservicereport';
import { TaskReportService } from '../../providers/task_report';
import { MyServiceReportPage } from '../myservicereport/myservicereport';
import { HelperService } from '../../providers/helper_service';
/*
  Generated class for the MyTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mytask',
  templateUrl: 'mytask.html'
})
export class MyTaskPage {
  cnt: any;
  user: any;

  myAssignedTask: Array<any> = [];
  myCompletedTask: Array<any> = [];
  myAllTask: Array<any> = [];
  calendarTask: Array<any> = [];
  notifExist: boolean;
  rejectedReportExist: boolean;
  newTask: Array<any> = [];
  rejectedReport: Array<any> = [];
  notifN: number = 0;

  status: string = "Assigned";
  sortFilter: string;
  displaymode: string = "list";

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public taskService: TaskService
    , public technicianService: TechnicianService
    , public taskReport: TaskReportService
  , private helperService: HelperService) {

    this.user = this.navParams.get("accountInfo"); 
    this.sortFilter = "duedate";
  }


  ionViewDidLoad() {

    this.sortFilter = "duedate";

    //this.loadAllTask();
    this.loadMyAssignedTaskData();
    this.loadMyCompletedTaskData();
    //this.getNewAssignedTask();
    // this.loadRejectedReports();

  }

  calendarView() {
    console.log("calendarView");
    this.navCtrl.setRoot(CalendarPage, { source: this.calendarTask, isManager: false });
  }

  listView() {
    console.log("listView");
  }

  taskSelected(selectedtask: any) {
    console.log('taskSelected method call');
    this.navCtrl.push(TaskdetailsPage, { task: selectedtask });
  }

  loadAllTask() {
    console.log("loadAllTask method call");
    //retrieved again the data from the service request.
    if (!this.user || !this.user.EMP_ID_NO) this.user = this.technicianService.getUserData();

    this.taskService.getAssignedTechnicianTaskData(this.user.EMP_ID_NO).then(data => {

      var counter = 0;
      while (counter < data.length) {
        this.myAllTask.push(data[counter]);
        counter++;
      }
    });
  }

  loadMyAssignedTaskData() {
    console.log("loadMyAssignedTaskData method call");
    this.myAssignedTask = [];

    //retrieved again the data from the service request.
    if (!this.user || !this.user.EMP_ID_NO) this.user = this.technicianService.getUserData();

    this.taskService.getAssignedTechnicianTaskData(this.user.EMP_ID_NO).then(data => {

      console.log('getAssignedTechnicianTaskData => ', data);

      var counter = 0;
      console.log("Data length " + data.length);
      while (counter < data.length) {

        if (data[counter].COMPLETED_IND != "Y") {

          data[counter].Badge = this.helperService.taskStatusDate(data[counter].PROMISE_START_DATE, data[counter].DATE_PROMISED, 'badge');
          data[counter].CSSBadges = this.helperService.taskStatusDate(data[counter].PROMISE_START_DATE, data[counter].DATE_PROMISED, 'style');
          data[counter].StatusBadges = this.helperService.taskStatusDate(data[counter].PROMISE_START_DATE, data[counter].DATE_PROMISED, 'status');
          data[counter].PROMISE_START_DATE_NUM = data[counter].PROMISE_START_DATE;
          data[counter].DATE_PROMISED_NUM = data[counter].DATE_PROMISED;

          this.myAssignedTask.push(data[counter]);

          var d = new Date(data[counter].DATE_PROMISED);
          if (data[counter].DATE_PROMISED != "") {
            this.calendarTask.push({
              title: data[counter].TASK_DESCRIPTION,
              startTime: d,
              endTime: d,
              taskData: data[counter],
              allDay: true
            });
          }
        }
        counter++;
      }
      this.notifN = this.myAssignedTask.length;
      this.getNewAssignedTask();


      console.log("!!!!!!");
      console.log(this.notifN);

    });
  }

  loadMyCompletedTaskData() {
    console.log("loadMyCompletedTaskData method call");
    this.myCompletedTask = [];
    //retrieved again the data from the service request.
    if (!this.user || !this.user.EMP_ID_NO) this.user = this.technicianService.getUserData();

    this.taskService.getAssignedTechnicianTaskData(this.user.EMP_ID_NO).then(data => {

      var counter = 0;
      while (counter < data.length) {
        if (data[counter].COMPLETED_IND == "Y") {
          this.myCompletedTask.push(data[counter]);
        }
        counter++;
      }
    });
  }


  getNewAssignedTask() {
    console.log("getNewAssignedTask");
    this.notifExist = false;
    this.newTask = [];
    //todo -- query new task
    //dummy -- all assigned task for now. -- have to check timestamp for tasks
    this.newTask = this.myAssignedTask;
    console.log("New task " + JSON.stringify(this.newTask));
    if (this.newTask.length > 0) {
      this.notifExist = true;
    }
  }

  loadRejectedReports() {
    console.log("getRejectedReport");
    this.rejectedReportExist = false;
    this.rejectedReport = [];
    this.taskReport.getServiceReports().then(data => {

      var counter = 0;
      while (counter != data.length) {
        if (data[counter].REPORT_STATUS == "rejected") {
          this.rejectedReport.push(data[counter]);
        }
        counter++;
      }
      console.log(this.rejectedReport);
      // this.rejectedReport.length = 2; //testing
      if (this.rejectedReport.length > 0) {
        //     this.notifN = this.notifN + 1;
        this.notifExist = true;

        console.log("!!!!!!");
        console.log(this.notifN);
      }
    });
  }


  getRejectedReport() {
    // this.loadRejectedReports();

  }

  closeNotifPanel() {
    this.notifExist = false;
  }

  viewServiceReports() {
    this.navCtrl.push(MyServiceReportPage, {});
  }



}
