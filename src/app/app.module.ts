import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
import { FormPage } from '../pages/form/form';
import { StappintroPage } from '../pages/stappintro/stappintro';
import { ManageTaskPage } from '../pages/managetask/managetask';
import { ManagetechnicianPage } from '../pages/managetechnician/managetechnician';
import { MyTaskPage } from '../pages/mytask/mytask';
import { MyServiceReportPage } from '../pages/myservicereport/myservicereport';
import { TabsPage } from '../pages/tabs/tabs';
import { TabtechnicianPage } from '../pages/tabtechnician/tabtechnician';
import { TaskPage } from '../pages/task/task';
import { TaskeditPage } from '../pages/taskedit/taskedit';
import { AssignedtabPage } from '../pages/assignedtab/assignedtab';
import { OpentabPage } from '../pages/opentab/opentab';
import { CompletedtabPage } from '../pages/completedtab/completedtab';
import { TaskdetailsPage } from '../pages/taskdetails/taskdetails';
import { TechnicianlistPage } from '../pages/technicianlist/technicianlist';
import { TechniciandetailsPage } from '../pages/techniciandetails/techniciandetails';
import { TechnicianeditPage } from '../pages/technicianedit/technicianedit';
import { MyTechnicianlistPage } from '../pages/technicianlist/mytechnicianlist';
import { ManagerreportPage } from '../pages/managerreport/managerreport';
import { ManagerreportdetailsPage } from '../pages/managerreportdetails/managerreportdetails';
import { MytechnicianPage } from '../pages/mytechnician/mytechnician';
import { HttpModule } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';

import { AccountService } from '../providers/account_service';
import { TaskService } from '../providers/task_service';
import { ManagerService } from '../providers/manager_service';
import { TechnicianService } from '../providers/technician_service';
import { LoadingHelper } from "../utils/loadingDialog";
import { ReportdetailsPage } from '../pages/reportdetails/reportdetails';
import { TaskReportService } from "../providers/task_report";

import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPage } from '../pages/calendar/calendar';
import { HelpPage } from '../pages/help/help-page';
import { ExpandableListModule } from 'angular2-expandable-list';
import { CreateTaskReport } from '../pages/createTaskReport/createTaskReport';
import { CreateservicereportPagePage } from '../pages/createservicereport/createservicereport';
import { CsrreportheaderinfoPagePage } from '../pages/csrreportheaderinfo/csrreportheaderinfo';
import { FileattachmentsPagePage } from '../pages/fileattachments/fileattachments';
import { FiltersPagePage } from '../pages/filters/filters';
import { CsrlaborPagePage } from '../pages/csrlabor/csrlabor';
import { FilterfieldsPagePage } from '../pages/filterfields/filterfields';
import { CsrlaborlistPagePage } from '../pages/csrlaborlist/csrlaborlist';
import { FilterbranchPagePage } from '../pages/filterbranch/filterbranch';
import { FilterspecialtyPagePage } from '../pages/filterspecialty/filterspecialty';
import { SignaturePage } from '../pages/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';
// import { CsrrepairbackgroundPagePage } from '../pages/csrrepairbackground/csrrepairbackground';
// import { CsrworkorderPagePage} from '../pages/csrworkorder/csrworkorder';
// import { CsraddoppPagePage} from '../pages/csraddopp/csraddopp';
import { HelperService } from '../providers/helper_service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyCKY8fxH-gErmcYyA8DgqG7ehV3eZUsjos",
  authDomain: "service-technician.firebaseapp.com",
  databaseURL: "https://service-technician.firebaseio.com",
  projectId: "service-technician",
  storageBucket: "service-technician.appspot.com",
  messagingSenderId: "398524620398"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PasswordresetPage,
    StappintroPage,
    ManageTaskPage,
    ManagetechnicianPage,
    TabsPage,
    TabtechnicianPage,
    TaskPage,
    TaskeditPage,
    AssignedtabPage,
    OpentabPage,
    CompletedtabPage,
    TaskdetailsPage,
    TechnicianlistPage,
    TechniciandetailsPage,
    TechnicianeditPage,
    MyTechnicianlistPage,
    MyTaskPage,
    MyServiceReportPage,
    ReportdetailsPage,
    CalendarPage,
    HelpPage,
    ManagerreportPage,
    ManagerreportdetailsPage,
    CreateTaskReport,
    CreateservicereportPagePage,
    CsrreportheaderinfoPagePage,
    FileattachmentsPagePage,
    CsrlaborPagePage,
    MytechnicianPage,
    FiltersPagePage,
    FilterfieldsPagePage,
    CsrlaborlistPagePage,
    FilterbranchPagePage,
    FilterspecialtyPagePage,
    SignaturePage
    // CsrrepairbackgroundPagePage,
    // CsrworkorderPagePage,
    // CsraddoppPagePage
  ],
  imports: [
    NgCalendarModule,
    ExpandableListModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      platforms: {
        android: {
          tabsPlacement: 'top'
        },
        ios: {
          tabsPlacement: 'top'
        }
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PasswordresetPage,
    StappintroPage,
    ManageTaskPage,
    ManagetechnicianPage,
    TabsPage,
    TabtechnicianPage,
    TaskPage,
    TaskeditPage,
    AssignedtabPage,
    OpentabPage,
    CompletedtabPage,
    TaskdetailsPage,
    TechnicianlistPage,
    TechniciandetailsPage,
    TechnicianeditPage,
    MyTechnicianlistPage,
    MyTaskPage,
    MyServiceReportPage,
    ReportdetailsPage,
    CalendarPage,
    HelpPage,
    ManagerreportPage,
    ManagerreportdetailsPage,
    CreateTaskReport,
    CreateservicereportPagePage,
    CsrreportheaderinfoPagePage,
    FileattachmentsPagePage,
    CsrlaborPagePage,
    MytechnicianPage,
    FiltersPagePage,
    FilterfieldsPagePage,
    CsrlaborlistPagePage,
    FilterbranchPagePage,
    FilterspecialtyPagePage,
    SignaturePage,
    // CsrrepairbackgroundPagePage,
    // CsrworkorderPagePage,
    // CsraddoppPagePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    AccountService,
    TaskService,
    TechnicianService,
    ManagerService,
    TaskReportService,
    HelperService,
    AngularFireDatabaseModule]
})

export class AppModule { }

