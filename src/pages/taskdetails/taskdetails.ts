import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Events} from 'ionic-angular';
import { TaskeditPage } from '../taskedit/taskedit';
import { TaskService } from '../../providers/task_service';
import { FormBuilder , FormGroup } from "@angular/forms";
import { AccountService } from '../../providers/account_service';
import { TechnicianService } from '../../providers/technician_service';
import { CreateservicereportPagePage } from '../createservicereport/createservicereport';
import { ReportdetailsPage } from '../reportdetails/reportdetails';
import { MytechnicianPage } from '../mytechnician/mytechnician';
import { SignaturePage } from '../signature/signature';
import { ManageTaskPage } from '../managetask/managetask';
/* 
  Generated class for the Taskdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-taskdetails',
  templateUrl: 'taskdetails.html'
})

export class TaskdetailsPage {
  task: any;
  taskAssigment: any;
  taskType: any;
  index: any;
  status: any;
  accountType: any;
  isShown: number;

  taskDetailsForm: FormGroup;
  keysArray: Array<string>;
  technicians: any;

  accountData: any;
  i: number;
  actType: any;
  typemo: any;

  constructor(public navCtrl: NavController
          , public navParams: NavParams
          , public taskService: TaskService
          , public formBuilder: FormBuilder
          , public alertCtrl: AlertController
          , public accountService: AccountService
          , public technicianService: TechnicianService
          , public modalCtrl: ModalController
          , public events: Events
        ) {
    
    this.accountType = this.accountService.getAccountType();
    console.log('this.accountType', this.accountType);
    
    this.taskType = this.navParams.get("taskType");
    //this.technicians = [{employeename: "sample"}, {employeename: "sample"}];
    
    console.log('TaskdetailsPage:taskType = ', this.taskType);
    
    /*if(navParams.get("listIndex") === null) {
      this.task = [];
    } else {
      this.task = this.taskService.getSpecificTask(navParams.get("listIndex"), this.taskType);
    }*/

    this.task = this.navParams.get("task");
    console.log('TaskdetailsPage:constructor => ', this.task);

  }

  

  fabton(){
    this.accountService.getData().then(data => {
    this.accountData = data;
    this.i = 0;
    this.actType = this.accountData[this.i].ACCOUNT_DESC;
    console.log(this.accountData[this.i].ACCOUNT_DESC);
    });
    
    if (this.actType = 'Manager'){
      console.log('Manager');
    }
    else{
      console.log('Technician');
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailsPage');
  }
  
  goToDelete(taskID:any){
    //this.taskService.removeToTask(this.index, this.taskType);
    const prompt = this.alertCtrl.create({
      title: 'Confirm',
      message: "Are you sure you want to delete this task?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {

            this.taskService.removeTask(taskID).then(isError => {
              let isDeleted = !isError;
              if (isDeleted) {
                this.events.publish('updateTaskNumBadge', isDeleted);
                this.showAlert("Task has been deleted!");
                this.navCtrl.push(ManageTaskPage, {taskType: this.taskType});
              }
            });

          }
        }
      ]
    });
    prompt.present();
}

  goToEdit(){
    console.log('goToEdit => ', this.task);
    this.task.DATE_PROMISED = this.formatDate(this.task.DATE_PROMISED);
    this.task.PROMISE_START_DATE = this.formatDate(this.task.PROMISE_START_DATE);
    this.navCtrl.push(TaskeditPage, {taskType: this.taskType, taskSelected: this.task});
  }

  private formatDate(date:string) : string {
    let newDate = date.split('/', 3);
    return newDate[2] + '-' + newDate[1] + '-' + newDate[0];
  }

  showAlert(errorMessage){
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  } 
 

   techServiceReport(reports: any){
    this.navCtrl.push(CreateservicereportPagePage, {reportItem: reports});
  }
  //  techServiceReport(task: any){
  //    this.navCtrl.push(CreateservicereportPagePage, {taskDetails: task});
  // }

  updateStatus(id){
    console.log(id);
    this.taskService.getTasksListRef().update(id, {
            COMPLETED_IND: 'Y'
          });
    this.togglePrompt("complete");
    this.navCtrl.pop();
  }

  togglePrompt(source) {
    if (source == "checkmark") {
        this.isShown = 1;
    } else {
        this.isShown = 0;
    }
  }


  askToVerify() {
    return this.isShown == 1;
  }

  selectTechnician() {
    this.navCtrl.push(MytechnicianPage );
  }

  signcomplete(){
    // this.navCtrl.push(SignaturePage);
    let modal=  this.modalCtrl.create(SignaturePage);
    modal.onDidDismiss(data => {
     });
    modal.present();
  }

  completeThisTask() {
      this.navCtrl.push(CreateservicereportPagePage, {task: this.task});
  }

}

