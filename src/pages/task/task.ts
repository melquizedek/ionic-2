import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder} from "@angular/forms";
//import { TaskService } from '../../providers/task_service'
import { TaskeditPage } from '../taskedit/taskedit';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { TasksModel, TaskItems } from '../../model/TasksModel';

/*
  Generated class for the Task page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
  //providers: [TaskService]
})

export class TaskPage {

  taskForm: FormGroup;  
  tasks: any;
  tasksData: any;
  
  taskListItemsData = [{taskName: "Wheel Alignment" 
                    , assignment: "sadad"
                    , custName: ""
                    , urgencyCode: ""
                    , promiseDate: "March 30"
                    , promiseStart: ""
                    , datePromised: ""
                    , address: ""
                    , description: ""},                    
            {taskName: "Wheel Alignment" 
                    , assignment: "sadad"
                    , custName: ""
                    , urgencyCode: ""
                    , promiseDate: "March 30"
                    , promiseStart: ""
                    , datePromised: ""
                    , address: ""
                    , description: ""}]

          
  taskListItems: any;

  constructor(public navCtrl: NavController
          , public navParams: NavParams
          , public formBuilder: FormBuilder
          //, public taskService: TaskService
          , public alertCtrl: AlertController) {
    
    //this.taskListItems = this.taskService.getTaskItems();
    this.taskForm = formBuilder.group({
          
		});     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }
  
  goToModifyTask(){
     this.navCtrl.push(TaskdetailsPage);
  }

  goToAddTask(){
     this.navCtrl.push(TaskeditPage);
  }

  showAlert(errorMessage){
    let alert = this.alertCtrl.create({
      message: errorMessage
    });
    alert.present();
  }  

}
