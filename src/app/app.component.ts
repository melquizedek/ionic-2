import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register'
import { LoginPage } from '../pages/login/login';
import { ManageTaskPage } from '../pages/managetask/managetask';
import { StappintroPage } from '../pages/stappintro/stappintro';
import { TaskPage } from '../pages/task/task';
import { TaskeditPage } from '../pages/taskedit/taskedit';
import { TaskdetailsPage } from '../pages/taskdetails/taskdetails';
import { TechniciandetailsPage } from '../pages/techniciandetails/techniciandetails';
import { TechnicianlistPage } from '../pages/technicianlist/technicianlist';
import { MyTechnicianlistPage } from '../pages/technicianlist/mytechnicianlist';
import { TabtechnicianPage } from '../pages/tabtechnician/tabtechnician';
import { ReportdetailsPage } from '../pages/reportdetails/reportdetails';
import { ManagerreportPage } from '../pages/managerreport/managerreport';
import { ManagerreportdetailsPage } from '../pages/managerreportdetails/managerreportdetails';

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {

  rootPage = LoginPage;

  constructor(platform: Platform, private statusbar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusbar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
