import { Component, Inject } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AccountService } from '../../providers/account_service';
import { CreateservicereportPagePage } from '../createservicereport/createservicereport';
import { TaskReportService } from '../../providers/task_report';

//import { CreateTaskReport } from '../createTaskReport/createTaskReport';

/*
  Generated class for the FileattachmentsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fileattachments',
  templateUrl: 'fileattachments.html'
})
export class FileattachmentsPagePage {
  FileData: Array<any>;
  private tablename: string = "uploadFiles/";
  today: any = Date.now();
  i;
  loader: any;
  n: number;
  accountData;
  data;
  DataItems;
  counter: number;
  filedatanum;
  task: any;
  serviceReport;
  thisReport;
  taskreport;
  nextKey;
  shownGroup = null;



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
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public accountService: AccountService,
              public viewCtrl: ViewController,
              public taskReportService : TaskReportService) {


    this.task = this.navParams.get("task");
    
        this.serviceReport = this.navParams.get('reportItem'); // task
        this.taskreport = this.taskReportService.getSpecificTaskReport(0);
    
        this.taskReportService.getServiceReports().then(data => {
          // this.counter = 0;
          this.thisReport = data[0];
          this.nextKey = data.length;
          for (var property in this.thisReport) {
            if (this.thisReport.hasOwnProperty(property)) {
              this.thisReport[property] = "";
              //ready for use
            }
          }

          delete this.thisReport.$key;
          delete this.thisReport.$exists;
    
          this.thisReport.ID = this.serviceReport.ID;
        });
  }



  ImageUpload(data: any, resolve: any) {
    this.showLoader();

    let self = this;
    let UIIDgen = this.generateUUID();
    let promise = new Promise((res, rej) => {
      let fileName = UIIDgen + `_` + `${data.name}`;
      let uploadTask = firebase.storage().ref(`/posts/` + fileName).put(data);
      uploadTask.on('state_changed', function (snapshot) {
        console.log(uploadTask.snapshot.bytesTransferred);
      },

        function (error) {
          rej(error);
        }, function () {

          this.total = Math.round((uploadTask.snapshot.totalBytes) * 0.001) + ` kb`;
          this.percentage = ((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
          console.log("bytesTransferred: ", uploadTask.snapshot.bytesTransferred);
          console.log("TotalBytes: ", uploadTask.snapshot.totalBytes);

          if (this.percentage == 100) {

            var downloadURL = uploadTask.snapshot.downloadURL;
            // res(downloadURL);
            console.log('funtion res:' + downloadURL);
            let DataItems = {
              FILE_DATE: self.today,
              FILE_NAME: fileName,
              FILE_SIZE: this.total,
              FILE_URLs: uploadTask.snapshot.downloadURL,
            };

            res(firebase.database().ref('report/' + self.thisReport.ID + '/FILE_ATTACHMENT').push(DataItems));

            self.navCtrl.pop();
            self.removeLoader()
          }

        });
    });
 
    return promise;
    
  }


  // uploadImage(data: any, resolve: any) {
  //   let self = this;
  //   let UIIDgen = this.generateUUID();
  //   let promise = new Promise((res, rej) => {
  //     let fileName = UIIDgen + `_` + `${data.name}`;
  //     let uploadTask = firebase.storage().ref(`/posts/` + fileName).put(data);
  //     uploadTask.on('state_changed', function (snapshot) {
  //       console.log("snapshot:" + snapshot);
  //       console.log(snapshot.bytesTransferred);
  //       console.log(this.total);
  //       this.total = ((snapshot.totalBytes) * 0.001) + `kb`;
  //       this.percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //       let downloadURL = uploadTask.snapshot.downloadURL;
  //       let DataItems = {
  //         FILE_DATE: self.today,
  //         FILE_NAME: fileName,
  //         FILE_SIZE: this.total,
  //         FILE_URLs: uploadTask.snapshot.downloadURL,
  //       };
  //       console.log('condition line:' + downloadURL);
  //       if (this.percentage == 0) {
  //         self.showLoader();
  //       }
  //       if (this.percentage == 100) {
  //         self.showAlert();
  //         firebase.database().ref(self.tablename).push(DataItems).key;
  //       }
  //     },
  //       function (error) {
  //         rej(error);
  //       }, function () {
  //         var downloadURL = uploadTask.snapshot.downloadURL;
  //         res(downloadURL);
  //         console.log('funtion res:' + downloadURL);
  //       });
  //   });
  //   return promise;
  // }


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
        content: "Uploading..."
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad FileattachmentsPagePage');

    console.log(this.serviceReport);
    console.log(this.serviceReport.FILE_ATTACHMENT);
    var key = Object.keys(this.serviceReport.FILE_ATTACHMENT);
    var sampleArr1 = [];
    // var sampleArr2 = [
    //   "FILE_NAME": this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_NAME
    // ];
    var sampleArr3 = [];
    var sampleArr4 = [];
    var samplearr5 = [];
    var obj = {};
    console.log(key);
    for (let a = 0; a < key.length; a++) {

      obj = {
        filename : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_NAME,
        filedate : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_DATE,
        filesize : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_SIZE,
        fileurls : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_URLs
      }

      samplearr5.push(obj);
      this.filedatanum = key.length;
      // sampleArr.push(this.serviceReport.LABOR_ENTRY_KEYS[key[a]]);
      // console.log(a);
      // var sampleArr2 = [{
      //   FILE_NAMES : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_NAME,
      //   FILE_DATA : this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_DATE
      // }];
      // sampleArr1.push(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_NAME +
      //   this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_DATE +
      //   this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_SIZE +
      //   this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_URLs);

      // sampleArr2.push(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_DATE);
      // sampleArr3.push(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_SIZE);
      // sampleArr4.push(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_URLs);
      //   console.log(sampleArr1);
      // console.log(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_NAME);
      // console.log(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_DATE);
      // console.log(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_SIZE);
      // console.log(this.serviceReport.FILE_ATTACHMENT[key[a]].FILE_URLs);
    }
    console.log("test arr obj");
    console.log(samplearr5);
    this.FileData = samplearr5;

  }


  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(CreateservicereportPagePage);
  }
}

