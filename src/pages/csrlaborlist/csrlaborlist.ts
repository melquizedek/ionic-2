import { Component } from '@angular/core';
import { NavController, NavParams, ModalController , ViewController} from 'ionic-angular';
import { CsrlaborPagePage } from '../csrlabor/csrlabor';
import { ReportdetailsPage } from '../reportdetails/reportdetails';
import { CreateservicereportPagePage } from '../createservicereport/createservicereport';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
/*
  Generated class for the CsrlaborlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-csrlaborlist',
  templateUrl: 'csrlaborlist.html'
})
export class CsrlaborlistPagePage {
  category; 
  taskreport: any[];
  task: any;
  serviceReport: any;
  nextKey: number;
  thisReport: any;
  LaborEntry123: Array<any>;
  labors: Array<Object> = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public taskReportService: TaskReportService,
              public taskService: TaskService,
              public viewCtrl: ViewController) {


              this.labors.push(this.navParams.get("labor"));
              console.log('this.labors => ', this.labors);
              // this.task = this.navParams.get("task");
                
              // this.serviceReport = this.navParams.get('reportItem'); // task
              // this.taskreport = this.taskReportService.getSpecificTaskReport(0);
                
                
              //               // console.log(this.serviceReport);
              //               this.taskReportService.getServiceReports().then(data => {
              //                 // this.counter = 0;
              //                 this.thisReport = data[0];
              //                 this.nextKey = data.length;
              //                 for (var property in this.thisReport) {
              //                   if (this.thisReport.hasOwnProperty(property)) {  
              //                     this.thisReport[property] = "";
              //                     // console.log(property + ": " + this.thisReport[property])
              //                     //ready for use
              //                   }
              //                 }
              //                 // console.log(this.thisReport);
              //                 // this.mapDataToReport();
              //                 delete this.thisReport.$key;
              //                 delete this.thisReport.$exists;
                            
              //                 this.thisReport.ID = this.serviceReport.ID;
              //                 // console.log(this.thisReport);       
              //             });
              }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CsrlaborlistPagePage');
  //   //////////////////Loop for Labor Entry Data/////////////////////////
  //   console.log(this.serviceReport);
  //   console.log(this.serviceReport.LABOR_ENTRY_KEYS);
  //   var key = Object.keys(this.serviceReport.LABOR_ENTRY_KEYS);
  //   var sampleArr = [];
  //   console.log(key);
  //   for (let a = 0; a < key.length; a++) {
  //     // sampleArr.push(this.serviceReport.LABOR_ENTRY_KEYS[key[a]]);
  //     console.log(a);
  //     sampleArr.push(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].EMP_ID);

  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].EMP_ID);
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].END_TIME);
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].LABOR_CODE);
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].LABOR_DATE);
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].OVERTIME); 
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].SHIFT); 
  //     console.log(this.serviceReport.LABOR_ENTRY_KEYS[key[a]].START_TIME); 
      
  //   }
  //   this.LaborEntry123 = sampleArr;
  //   console.log(sampleArr);
  // }

// csrlaborModal(){
//   this.thisReport.ID = this.nextKey.toString();
//   let pushModal = this.modalCtrl.create(CsrlaborPagePage, {reportItem: this.serviceReport, ID: this.thisReport.ID});
//   pushModal.present();
// }

csrlaborModal(){
  let laborId = null;
  this.navCtrl.push(CsrlaborPagePage, {laborId: laborId});
}

 dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
