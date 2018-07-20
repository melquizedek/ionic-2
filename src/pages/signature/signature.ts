import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TaskReportService } from "../../providers/task_report";
import { TaskService } from "../../providers/task_service";
import { ManageTaskPage } from "../managetask/managetask";
import * as firebase from 'firebase/app';


/*
  Generated class for the SignaturePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html'
})
export class SignaturePage {
  shownGroup: any;
  loader: any;
  qTask: any;
  cnt: number;
  signaturelook;
  isShown: number;
  task;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  
  private signaturePadOptions: Object = { 
    'minWidth': 0.5,
    'masWidth': 1.0,
    'canvasWidth': 700,
    'canvasHeight': 500
  };

  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4();
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public taskReportService: TaskReportService,
              public taskService: TaskService,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
            ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePagePage');
  }

  ngAfterViewInit() {
      // this.signaturePad is now available
       this.signaturePad.set('minWidth', 0.1); // set szimek/signature_pad options at runtime
       this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
      // this.signaturePad.toDataURL("image/jpeg");
  }

  drawComplete() {
    this.showLoader();
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL(""));
    // var signaturePad = new SignaturePad(canvas);
    // let uKey = this.generateUUID;
    // let fileName = uKey.toString() + `_` + `signature`;
    // let signphoto = this.signaturePad.toDataURL("image/jpeg");


    let signphoto = this.signaturePad.toDataURL("");

    // const data = this.signaturePad.toData();
    // console.log(signphoto);
    // firebase.storage().ref(`/signature/`).put(this.signaturePad.toDataURL(""));

    firebase.database().ref(`/signature/`).push(signphoto);
    this.navCtrl.pop();
    // this.navCtrl.popToRoot();
    // this.navCtrl.setRoot(ManageTaskPage, {taskSelected: this.task});
    this.removeLoader()
  }
  drawEnd(){
    console.log('end drawing');
    console.log(this.signaturePad.toDataURL(""));
    var data = this.signaturePad.toDataURL('image/jpeg');
    // window.open(data);
    this.signaturelook = this.signaturePad.toDataURL('');
  }

  drawStart(){
    console.log('begin drawing');
  }

  drawClear() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
    this.signaturePad.clear();

  }


  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
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
      this.loader = this.loadingCtrl.create({
        content: "Saving..."
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





  // completeTask(reportID, wNumber){
  //   console.log(reportID);
  //   console.log(wNumber);
  //   // this.taskReportService.reportList.update(reportID.toString(), {
  //   //         COMPLETED: 'Yes'
  //   //       });
  //   this.taskService.getTaskData().then(data => {
  //       this.cnt = 0;
  //       while(this.cnt < data.length) {
  //         console.log(data[this.cnt].WORK_ORDER_NUMBER);
  //         if(data[this.cnt].WORK_ORDER_NUMBER == wNumber){
  //           this.qTask = data[this.cnt];
  //           this.taskService.taskList.update(this.qTask,{
  //               COMPLETED_IND: "Y",
  //               COMPLETED_SIGNATURE: this.canttatsdis,
  //           });
  //         }
  //         this.cnt ++;
  //       }
  //   });
  //   this.navCtrl.pop();
  // }

  // askToVerify() {
  //   return this.isShown == 1;
  // }

  // updateStatus(id){
  //   console.log(id);
  //   this.taskService.taskList.update(id, {
  //           COMPLETED_IND: 'Y',
  //           COMPLETED_SIGNATURE: this.canttatsdis
  //         });
  //   this.togglePrompt("complete");
  //   this.navCtrl.pop();
  // }

  // togglePrompt(source) {
  //   if (source == "checkmark") {
  //       this.isShown = 1; 
  //   } else {
  //       this.isShown = 0;
  //   }
  // }


}
