import { Component, ViewChild, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController, Nav, Events } from 'ionic-angular';
import { TaskModel } from '../../model/tasks';
import { ManageTaskPage } from '../managetask/managetask';
import { ManagetechnicianPage } from '../managetechnician/managetechnician';
import { MyTaskPage } from '../mytask/mytask';
import { MyServiceReportPage } from '../myservicereport/myservicereport';
import { TabsPage } from '../tabs/tabs';
import { TabtechnicianPage } from '../tabtechnician/tabtechnician';
import { LoginPage } from '../login/login';
import { AccountService } from '../../providers/account_service';
import { HelpPage } from '../help/help-page';
import { ManagerService } from '../../providers/manager_service';
import { TechnicianService } from '../../providers/technician_service';
import { TaskService } from '../../providers/task_service';
import { ManagerreportPage } from '../managerreport/managerreport';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  TaskListBadge: any;
  techlist: any;
  techlistNum;
  taskListNum = 0;
  counter;
  techdata;

  rootPage: any;
  user: any;
  userData: any;

  @ViewChild(Nav) nav: Nav;
  tasks: any;

  tasklist;
  tasklist2;

  tasksData: any;
  isManager: boolean;

  taskSample = "sample";

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private managerService: ManagerService,
    private technicianService: TechnicianService,
    private taskService: TaskService,
    private accountService: AccountService,
    private events: Events) {

    this.technicianService.getTechnicianData().then(data => {
      this.techlist = data;
      this.techlistNum = (this.techlist.length) + (" Members");
    })  

    this.getTotalTaskNum();
    this.events.subscribe('updateTaskNumBadge', (isDeleted) => {
      console.log(isDeleted, ' <= isDeleted');
      this.getTotalTaskNum();
    });

  }


  ngOnInit() {
    this.user = this.navParams.get("accountInfo");
    let self = this;
    this.loadUserData().then(data => {
      if (this.isManager) {
        self.rootPage = ManageTaskPage;
      } else {
        self.rootPage = MyTaskPage;
      }
    });
    console.log('homepage with nav');
  }

  getTotalTaskNum() : void {
    this.taskService.getTaskData().then(data => {
      /*this.tasklist = data;
      for (let i = 0; i < this.tasklist.length; i++) {
        if (this.tasklist[i].ACTIVITY_INDICATOR == 'OPEN') {
          this.taskListNum++    
        }
      }*
      this.TaskListBadge = this.taskListNum + (" Tasks");*/
      this.taskListNum = data.length;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.onDashboard();
  }

  ionViewDidEnter() {
    this.menuCtrl.close();
    this.menuCtrl.enable(true);
  }

  onDashboard() {
    console.log("dashboard pressed");
    this.menuCtrl.close();
  }

  onManageTask() {
    console.log("onManageTask menu clicked");
    this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    if (this.nav.getActive().component === ManageTaskPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(ManageTaskPage);
  }

  onManageTechnicians() {
    console.log("onManageTechnicians menu clicked");
    this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    if (this.nav.getActive().component === ManagetechnicianPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(ManagetechnicianPage);
  }

  onReports() {
    console.log("onReports menu clicked");
    this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    if (this.nav.getActive().component === ManagerreportPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(ManagerreportPage);
  }

  onMyTask() {
    console.log("onMyTask clicked");
    this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    if (this.nav.getActive().component === MyTaskPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(MyTaskPage);
  }

  onMyServiceReport() {
    console.log("onMyServiceReport clicked");
    this.menuCtrl.close();
    //Skipping page switch if the user is on the same page
    if (this.nav.getActive().component === MyServiceReportPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(MyServiceReportPage);
  }

  onHelp() {
    console.log("onHelp clicked");
    this.menuCtrl.close();
    if (this.nav.getActive().component === HelpPage) {
      console.log("Skipping since not needed");
      return;
    }
    this.nav.setRoot(HelpPage);
  }

  showAlert(errorMessage) {
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  }

  loadUserData(): Promise<any> {
    return new Promise(resolve => {
      console.log("loadUserData method call");

      this.accountService.setAccountType(this.user.ACCOUNT_TYPE);
      if (this.user.ACCOUNT_TYPE == 1) {
        this.managerService.getManagerUserData(this.user.EMP_ID_NO).then(data => {
          if (data[0].EMP_ID_NO == this.user.EMP_ID_NO) {
            this.isManager = true;
            this.userData = data[0];
            this.managerService.setUserData(this.userData);
            resolve(this.userData);
          }
        });

      } else if (this.user.ACCOUNT_TYPE == 2) {
        this.technicianService.getTechnicianUserData(this.user.EMP_ID_NO).then(data => {
          if (data[0].EMP_ID_NO == this.user.EMP_ID_NO) {
            this.isManager = false;
            this.userData = data[0];
            console.log("User data " + JSON.stringify(this.userData));
            this.technicianService.setUserData(this.userData);
            resolve(this.userData);
          }
        });
      }
    });
  }

  onLogout() {
    console.log("onLogout method call");
    this.navCtrl.setRoot(LoginPage);
  }
}
