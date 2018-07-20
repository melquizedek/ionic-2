import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StappintroPage } from '../stappintro/stappintro';
import { TaskService } from '../../providers/task_service';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TaskeditPage } from "../taskedit/taskedit";

/*
  Generated class for the Assignedtab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-assignedtab',
  templateUrl: 'assignedtab.html'
})

export class AssignedtabPage {

  /*public tasks: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadAssignedTaskData();
  }

  loadAssignedTaskData(){
    console.log("loadAssignedTaskData method call");
    this.tasks = [
          { title: 'Wheel alignment of tracktor', 
            description: 'Lorem ipsum dolor sit amet, consectetur adlipsing elit', 
            technician: 'John Doe', 
            promiseDate: 'Mar 28, 2017'},
          { title: 'Wheel replacement', 
            description: 'Lorem ipsum dolor sit amet, consectetur adlipsing elit', 
            technician: 'Jackie Chan', 
            promiseDate: 'Mar 26, 2017'},
          { title: 'Create a floor plan', 
            description: 'Lorem ipsum dolor sit amet, consectetur adlipsing elit', 
            technician: 'Jet Lee', 
            promiseDate: 'Mar 26, 2017'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignedtabPage');
  }

  taskSelected(task) {
    console.log('taskSelected method call');
		this.navCtrl.setRoot(StappintroPage);
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
    this.tasks = this.taskService.getTaskItems("ASSIGNED");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpentabPage');
    
  }

  taskSelected(index: number) {
    console.log('tab selected');
		this.navCtrl.setRoot(TaskdetailsPage, {listIndex: index, taskType: "ASSIGNED"});
	}

  addNewTask() {
    console.log('addNewTask method call');
    this.navCtrl.setRoot(TaskeditPage, {listIndex: null, taskType: "ASSIGNED"});
  }

}
