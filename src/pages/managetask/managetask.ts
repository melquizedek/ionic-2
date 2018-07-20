import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskService } from '../../providers/task_service';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TaskeditPage } from '../taskedit/taskedit';
import { ManagerService } from '../../providers/manager_service';
import { TechnicianService } from '../../providers/technician_service';
import { AccountService } from '../../providers/account_service';
import { CalendarPage } from '../calendar/calendar';
import { TaskReportService } from '../../providers/task_report';
import { HomePage } from '../home/home';
import { ManagerreportPage } from '../managerreport/managerreport';
import * as moment from 'moment';

/*
  Generated class for the ManageTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-managetask',
  templateUrl: 'managetask.html'
})
export class ManageTaskPage {
  cssbadge: any;
  daysremaining2: any;
  startdate: any;
  promdate: any;
  currentday: string;
  AssignedTaskCount: number;
  OpenTaskCount: number;
  dayscount: any;

  public openTask: Array<any> = [];
  public assignedTask: Array<any> = [];
  public completedTask: Array<any> = [];
  public allTask: Array<any> = [];
  status: string = "Open";
  counter: number;
  private user: any;
  public calendarTask: Array<any> = [];
  public sortFilter: string;
  displaymode: string = "list";
  public reviewReport: Array<any> = [];
  reportN: number;
  public notifExist: boolean;
  daysremaining;
  today: any = Date.now();


  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public taskService: TaskService
    , public managerService: ManagerService
    , public accountService: AccountService
    , public taskReport: TaskReportService) {

      if (this.navParams.get("taskType"))
        this.status = this.navParams.get("taskType");
  }

  ngOnInit() {
    console.log('manage task ngOnInit method call');
    let self = this;
    //this.user = this.managerService.getUserData();

    //call task service for Open, Assigned and Closed 
    self.loadAllTask();
    self.loadOpenTaskData();
    self.loadAssignedTaskData();
    self.loadCompletedTaskData();

    this.sortFilter = "duedate";


    console.log(this.openTask);
    console.log(this.assignedTask);
    console.log(this.calendarTask);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageTaskPage');
    this.loadPendingReports();
  }


  ionViewWillEnter() {
    this.displaymode = "list";
    console.log(this.displaymode);
  }

  loadPendingReports() {
    this.notifExist = false;
    console.log("load pending method call");
    this.reviewReport = [];
    this.taskReport.getServiceReports().then(data => {
      this.reportN = 0;
      while (this.reportN != data.length) {
        if (data[this.reportN].REPORT_STATUS == "review") {
          this.reviewReport.push(data[this.reportN]);
          this.notifExist = true;
        }
        this.reportN++;
      }
    });
  }


  calendarView() {
    this.navCtrl.setRoot(CalendarPage, { source: this.calendarTask, isManager: true });
  }

  listView() {
  }

  taskSelected(selectedtask: any, taskType: any) {
    console.log('taskSelected => ', selectedtask);
    this.navCtrl.push(TaskdetailsPage, {task: selectedtask, taskType: taskType});
  }

  loadAllTask() {
    console.log("loadAllTask method call");
    this.taskService.getTaskData().then(data => {
      //retrieved again the data from the service request.
      this.user = this.managerService.getUserData();

      this.managerService.setStoreNo(this.user.STORE_NO); // set store number
      this.managerService.setInitial(this.user.MGR_INITIALS); // set mngr initials
      this.managerService.setCostCtrCode(this.user.COST_CTR_CODE); // set cost ctr code

      this.counter = 0;
      while (this.counter != data.length) {
        if (data[this.counter].STORE_NUMBER == this.user.STORE_NO) {
          this.allTask.push(data[this.counter]);
        }
        this.counter++;
      }
    });
  }

  //Dummy method call for task list (Open, Assigned, Completed)
  loadOpenTaskData() {
    console.log("loadOpenTaskData method call");
    //this.openTask = this.taskService.getTaskItems("OPEN");
    this.taskService.getTaskData().then(data => {
      console.log(data, ':loadOpenTaskData');
      //retrieved again the data from the service request.
      this.user = this.managerService.getUserData();
      this.counter = 0;
      while (this.counter != data.length) {
        if (data[this.counter].STORE_NUMBER == this.user.STORE_NO &&
          data[this.counter].EMP_ID_NO == "") {
          
          var dateprom = moment(data[this.counter].DATE_PROMISED).format("DD/MM/YYYY");
          var promstartdate = moment(data[this.counter].PROMISE_START_DATE).format("DD/MM/YYYY");
          var transtamp = moment(data[this.counter].TRANS_TIMESTAMP).format("DD/MM/YYYY");

          console.log(dateprom , promstartdate);

          this.today;
          this.promdate = data[this.counter].DATE_PROMISED;
          this.startdate = data[this.counter].PROMISE_START_DATE;

          var numtime = (1000 * 60 * 60 * 24);

          this.daysremaining = Math.floor((this.promdate - this.today) / numtime);
          this.daysremaining2 = Math.floor(( this.promdate - this.startdate) / numtime);
          console.log("DAYS REMAINING: " + this.daysremaining);
          let date = new Date(this.today).toDateString();
          let date2 = new Date(this.promdate).toDateString();
          let date3 = new Date(this.startdate).toDateString();

          // console.log(date, date2, date3);
          // console.log("promise date: " + date2);
          // console.log("start date: " + date3);
          // console.log(this.daysremaining)   

          var temp = '';
          var statusBadge = '';

          if (date2 == date) {
            temp = "TODAY";
            this.cssbadge = "task-list-status-today";
            statusBadge = "DUE TODAY";
          }
          else if (0 > this.daysremaining) {
            temp = "OVERDUE";
            this.cssbadge = "task-list-status-overdue";
            statusBadge = "OVERDUE";
          }

          else if (date2 != date) {
            if (this.daysremaining == 1){
              temp = this.daysremaining + " DAY";
              this.cssbadge = "task-list-status";
              statusBadge = "DUE TOMMOROW";
            }
            else {
            temp = this.daysremaining + " DAYS";
            this.cssbadge = "task-list-status";
            statusBadge = "DUE IN " + this.daysremaining + " DAYS";
            }
          }

          else if (date3 == date3) {
            temp = "IN-PROGRESS";
            this.cssbadge = "task-list-status-completed";
            statusBadge = "IN-PROGRESS";
          }

          var ojb = {
            // DATE_PROMISED: data[this.counter].DATE_PROMISED,
            taskID: data[this.counter].key,
            DATE_PROMISED: dateprom,
            DATE_PROMISED_NUM: data[this.counter].DATE_PROMISED,
            TASK_DESCRIPTION: data[this.counter].TASK_DESCRIPTION,
            TASK_COMMENTS: data[this.counter].TASK_COMMENTS,
            ACTIVITY_INDICATOR: data[this.counter].ACTIVITY_INDICATOR,
            COMPLETED_IND: data[this.counter].COMPLETED_IND,
            COST_CENTER_CODE: data[this.counter].COST_CENTER_CODE,
            CREATED_BY: data[this.counter].CREATED_BY,
            CUSTOMER_NAME: data[this.counter].CUSTOMER_NAME,
            CUSTOMER_NUMBER: data[this.counter].CUSTOMER_NUMBER,
            CUST_EQUIP_NUMBER: data[this.counter].CUST_EQUIP_NUMBER,
            DURATION: data[this.counter].DURATION,
            EMPLOYEE_INITIALS: data[this.counter].EMPLOYEE_INITIALS,
            EMPLOYEE_LAST_NAME: data[this.counter].EMPLOYEE_LAST_NAME,
            EMP_ID_NO: data[this.counter].EMP_ID_NO,
            EQPMNF_SERIAL_NUM: data[this.counter].EQPMNF_SERIAL_NUM,
            EQUIP_MANFCTUR_CD: data[this.counter].EQUIP_MANFCTUR_CD,
            EQUIP_MNFCTR_MODEL: data[this.counter].EQUIP_MNFCTR_MODEL,
            PRE_WRK_ORD_NUM: data[this.counter].PRE_WRK_ORD_NUM,
            // PROMISE_START_DATE: data[this.counter].PROMISE_START_DATE,
            PROMISE_START_DATE: promstartdate,
            PROMISE_START_DATE_NUM: data[this.counter].PROMISE_START_DATE,
            STORE_NUMBER: data[this.counter].STORE_NUMBER,
            TASK_LOCATION: data[this.counter].TASK_LOCATION,
            TASK_SOURCE: data[this.counter].TASK_SOURCE,
            TRANSACTION_ID: data[this.counter].TRANSACTION_ID,
            TRANSACTION_TYPE: data[this.counter].TRANSACTION_TYPE,
            TRANS_TIMESTAMP: data[this.counter].TRANS_TIMESTAMP,
            // TRANS_TIMESTAMP: transtamp,
            URGENCY_CODE: data[this.counter].URGENCY_CODE,
            WORK_ORDER_NUMBER: data[this.counter].WORK_ORDER_NUMBER,
            WORK_ORD_OPER_NUM: data[this.counter].WORK_ORD_OPER_NUM,
            WORK_ORD_SEG_NUM: data[this.counter].WORK_ORD_SEG_NUM,
            Badge : temp,
            CSSBadges: this.cssbadge,
            StatusBadges: statusBadge
          }

          this.openTask.push(ojb);

          if (!isNaN(data[this.counter].DATE_PROMISED)) {

            var startDate = new Date(data[this.counter].PROMISE_START_DATE);
            var endDate = new Date(data[this.counter].DATE_PROMISED);
            this.calendarTask.push({
              title: data[this.counter].TASK_DESCRIPTION,
              // startTime: d,
              // endTime: d,
              startTime: startDate,
              endTime: endDate,
              taskData: data[this.counter],
              // startTime: new Date(data[this.counter].PROMISE_START_DATE),
              // endTime: new Date(data[this.counter].PROMISE_START_DATE),
              allDay: true
            });
          }
        }
        this.counter++;
      }
      //---------Badge count of open task----------//
      this.OpenTaskCount = this.openTask.length;
    });
  }

  private formatDate(date: string, format: string = 'MM/DD/YYYY') : string {
    return moment(date).format(format);
  }

  private taskStatusDate(startDate:string, endDate:string, returnType:string) : string {

    var today = Math.floor(moment.duration(this.today, 'milliseconds').asDays());
    var dueStart = Math.floor(moment.duration(startDate, 'milliseconds').asDays());
    var dueEnd = Math.floor(moment.duration(endDate, 'milliseconds').asDays());
    
    let badgeStatus = {badge: "", status: "", style: ""};
    let daysRemaining = (dueEnd - today);

    if (today == dueStart) {
      badgeStatus = {badge: "IN-PROGRESS", status: "IN-PROGRESS", style: "task-list-status-completed"};
    } else if (daysRemaining === 1) {
        badgeStatus = {badge: daysRemaining + " DAY", status: "DUE TOMMOROW", style: "task-list-status"};
    } else if (daysRemaining === 0) {
        badgeStatus = {badge: "TODAY", status: "DUE TODAY", style: "task-list-status-today"};
    } else if (daysRemaining < 0) {
      badgeStatus = {badge: "OVERDUE", status: "OVERDUE", style: "task-list-status-overdue"};
    } else if (dueEnd > today) {
      let remainingDays = (dueEnd - today);
      badgeStatus = {badge: remainingDays + " DAYS", status: "DUE IN " + remainingDays + " DAYS", style: "task-list-status"};
    }

    if (returnType === "status") return badgeStatus.status;
    if (returnType === "style") return badgeStatus.style;
    if (returnType === "badge") return badgeStatus.badge;

    return "";
  }

  loadAssignedTaskData() {
    console.log("loadAssignedTaskData method call");
    //this.assignedTask = this.taskService.getTaskItems("ASSIGNED");
    this.taskService.getTaskData().then(data => {
      //retrieved again the data from the service request.
      this.user = this.managerService.getUserData();
      console.log("CurrentUser =>", this.user);
      this.counter = 0;
      while (this.counter != data.length) {
        if (data[this.counter].STORE_NUMBER == this.user.STORE_NO &&
          data[this.counter].EMP_ID_NO != "") {

            let badge = this.taskStatusDate(data[this.counter].PROMISE_START_DATE, data[this.counter].DATE_PROMISED, 'badge');
            let cssbadge = this.taskStatusDate(data[this.counter].PROMISE_START_DATE, data[this.counter].DATE_PROMISED, 'style');
            let statusBadge = this.taskStatusDate(data[this.counter].PROMISE_START_DATE, data[this.counter].DATE_PROMISED, 'status');

            var obj2 = {
              taskID: data[this.counter].key,
              DATE_PROMISED_NUM: data[this.counter].DATE_PROMISED,
              DATE_PROMISED: moment(data[this.counter].DATE_PROMISED).format("DD/MM/YYYY"),
              // DATE_PROMISED: dateprom,
              TASK_DESCRIPTION: data[this.counter].TASK_DESCRIPTION,
              TASK_COMMENTS: data[this.counter].TASK_COMMENTS,
              ACTIVITY_INDICATOR: data[this.counter].ACTIVITY_INDICATOR,
              COMPLETED_IND: data[this.counter].COMPLETED_IND,
              COST_CENTER_CODE: data[this.counter].COST_CENTER_CODE,
              CREATED_BY: data[this.counter].CREATED_BY,
              CUSTOMER_NAME: data[this.counter].CUSTOMER_NAME,
              CUSTOMER_NUMBER: data[this.counter].CUSTOMER_NUMBER,
              CUST_EQUIP_NUMBER: data[this.counter].CUST_EQUIP_NUMBER,
              DURATION: data[this.counter].DURATION,
              EMPLOYEE_INITIALS: data[this.counter].EMPLOYEE_INITIALS,
              EMPLOYEE_LAST_NAME: data[this.counter].EMPLOYEE_LAST_NAME,
              EMP_ID_NO: data[this.counter].EMP_ID_NO,
              EQPMNF_SERIAL_NUM: data[this.counter].EQPMNF_SERIAL_NUM,
              EQUIP_MANFCTUR_CD: data[this.counter].EQUIP_MANFCTUR_CD,
              EQUIP_MNFCTR_MODEL: data[this.counter].EQUIP_MNFCTR_MODEL,
              PRE_WRK_ORD_NUM: data[this.counter].PRE_WRK_ORD_NUM,
              PROMISE_START_DATE_NUM: data[this.counter].PROMISE_START_DATE,
              PROMISE_START_DATE: moment(data[this.counter].PROMISE_START_DATE).format("DD/MM/YYYY"),
              // PROMISE_START_DATE: promstartdate,
              STORE_NUMBER: data[this.counter].STORE_NUMBER,
              TASK_LOCATION: data[this.counter].TASK_LOCATION,
              TASK_SOURCE: data[this.counter].TASK_SOURCE,
              TRANSACTION_ID: data[this.counter].TRANSACTION_ID,
              TRANSACTION_TYPE: data[this.counter].TRANSACTION_TYPE,
              TRANS_TIMESTAMP: data[this.counter].TRANS_TIMESTAMP,
              // TRANS_TIMESTAMP: transtamp,
              URGENCY_CODE: data[this.counter].URGENCY_CODE,
              WORK_ORDER_NUMBER: data[this.counter].WORK_ORDER_NUMBER,
              WORK_ORD_OPER_NUM: data[this.counter].WORK_ORD_OPER_NUM,
              WORK_ORD_SEG_NUM: data[this.counter].WORK_ORD_SEG_NUM,
              Badge : badge,
              CSSBadges: cssbadge,
              StatusBadges: statusBadge
            }
            this.assignedTask.push(obj2);
          // this.assignedTask.push(data[this.counter]);
          // console.log(this.assignedTask.length);
          if (!isNaN(data[this.counter].DATE_PROMISED)) {
            var date = new Date(data[this.counter].DATE_PROMISED);
            this.calendarTask.push({
              title: data[this.counter].TASK_DESCRIPTION,
              startTime: date,
              endTime: date,
              taskData: data[this.counter],
              // startTime: new Date(data[this.counter].PROMISE_START_DATE),
              // endTime: new Date(data[this.counter].PROMISE_START_DATE),
              allDay: true
            });
          }
        }
        this.counter++;
      }

      this.AssignedTaskCount = this.assignedTask.length;
    });
  }

  loadCompletedTaskData() {
    console.log("loadCompletedTaskData method call");
    //this.completedTask = this.taskService.getTaskItems("COMPLETED");
    this.taskService.getTaskData().then(data => {
      //retrieved again the data from the service request.
      this.user = this.managerService.getUserData();
      this.counter = 0;
      while (this.counter != data.length) {
        if (data[this.counter].STORE_NUMBER == this.user.STORE_NO &&
          data[this.counter].COMPLETED_IND == "Y") {
            data[this.counter].taskID = data[this.counter].key;
            this.completedTask.push(data[this.counter]);
        }
        this.counter++;
      }
    });
  }

  addNewTask(taskType: string) {
    console.log('addNewTask method call', 'taskType => ', taskType);
    this.navCtrl.push(TaskeditPage, { listIndex: null, taskType: taskType });
  }

  viewOpenTasks() {
    this.status = "Open";
  }

  viewAssignedTasks() {
    this.status = "Assigned";
  }

  onChange() {
    switch(this.sortFilter) {
    case 'newestcreated':
        this.sortTask('newestcreated');
        break;
    case 'oldestcreated':
        this.sortTask('oldestcreated');
        break;
    default:
        this.sortTask('duedate');
    }
  }

  sortTask(sortValue){
   var obj;
   if(this.status == "Open"){
      obj = this.openTask;
   }else if(this.status == "Assigned"){
      obj = this.assignedTask;
   }else{
      obj = this.completedTask;
   }
   
    if(sortValue == "newestcreated"){
      obj.sort(this.dynamicSort("TRANS_TIMESTAMP"));
    }else if(sortValue == "oldestcreated"){
      obj.sort(this.dynamicSort("-TRANS_TIMESTAMP"));
    }else{
      obj.sort(this.dynamicSort("DATE_PROMISED"));
    }
    
    if(this.status == "Open"){
      this.openTask = obj;
    }else if(this.status == "Assigned"){
      this.assignedTask = obj;
    }else{
      this.completedTask = obj;
    }
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  notificationsExist() {
    return this.notifExist;
  }

  closeNotifPanel() {
    this.notifExist = false;
  }

  viewServiceReports() {
    // this.homepage.onReports();

    this.navCtrl.push(ManagerreportPage, {});
  }

}
