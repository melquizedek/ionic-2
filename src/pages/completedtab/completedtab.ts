import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskService } from '../../providers/task_service';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TaskeditPage } from "../taskedit/taskedit";

/*
  Generated class for the Completedtab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-completedtab',
  templateUrl: 'completedtab.html'
})
export class CompletedtabPage {

  /*public tasks: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadCompletedTaskData();
  }

  loadCompletedTaskData(){
    console.log("loadCompletedTaskData method call");
    this.tasks = [
          { title: 'Wheel alignment of tracktor', 
            description: 'Lorem ipsum dolor sit amet, consectetur adlipsing elit', 
            technician: 'John Doe', 
            promiseDate: 'Mar 22, 2017'},
           { title: 'Change oil', 
             description: 'Lorem ipsum dolor sit amet, consectetur adlipsing elit', 
             technician: 'John Doe', 
             promiseDate: 'Mar 23, 2017'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedtabPage');
  }

  addNewTask() {
    console.log('addNewTask method call');
  }*/

  public tasks: Array<any> = [];
  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public taskService: TaskService) {
              this.loadOpenTaskData();
  }
  
  loadOpenTaskData(){     
    console.log("loadOpenTaskData method call");    
    this.tasks = this.taskService.getTaskItems("COMPLETED");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpentabPage');
    
  }

  taskSelected(index: number) {
    //console.log(task);
		this.navCtrl.setRoot(TaskdetailsPage, {listIndex: index, taskType: "COMPLETED"});
	}

  addNewTask() {
    console.log('addNewTask method call');
    this.navCtrl.setRoot(TaskeditPage, {listIndex: null, taskType: "COMPLETED"});
  }

}
