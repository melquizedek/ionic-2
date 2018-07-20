import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskService } from '../../providers/task_service';
import { TaskModel } from '../../model/tasks';
import { StappintroPage } from '../stappintro/stappintro';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TaskeditPage } from "../taskedit/taskedit";

/*
  Generated class for the Opentab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-opentab',
  templateUrl: 'opentab.html'
})
export class OpentabPage {

  public tasks: Array<any> = [];
  
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public taskService: TaskService) {
        this.loadOpenTaskData();
  }
  
  loadOpenTaskData(){     
    console.log("loadOpenTaskData method call");    
    this.tasks = this.taskService.getTaskItems("OPEN");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpentabPage');
  }

  taskSelected(index: number) {
    console.log("tabSelected");
		this.navCtrl.setRoot(TaskdetailsPage, {listIndex: index, taskType: "OPEN"});
	}

  addNewTask() {
    console.log('addNewTask method call');
    this.navCtrl.setRoot(TaskeditPage, {listIndex: null, taskType: "OPEN"});
  }
}
