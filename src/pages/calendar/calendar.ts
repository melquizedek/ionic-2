import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ManageTaskPage } from '../managetask/managetask';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { MyTaskPage } from '../mytask/mytask';
import { TaskeditPage } from '../taskedit/taskedit';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  eventSource;
  viewTitle;
  calendarTask: any;
  isManager: boolean = false;

  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }
  displaymode: string = "calendar";

  constructor(public navCtrl: NavController
          , public navParams: NavParams) {
            this.calendarTask = this.navParams.get("source");
            this.isManager = this.navParams.get("isManager");
            console.log(this.calendarTask);
            console.log("is This manager? " +  this.isManager);
            this.eventSource = this.calendarTask;
            this.today();
            console.log(this.viewTitle);
  }

  ionViewWillEnter() {
    this.displaymode = "calendar";
    console.log(this.displaymode);
  }

 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    console.log(event.taskData);
    this.navCtrl.push(TaskdetailsPage, {task: event.taskData});
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
    console.log(this.calendar.currentDate);
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    // this.navCtrl.push(ManageTaskPage, {date: ""});
  }
  onCurrentDateChanged(event: Date) {
    console.log(event);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
 
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  listView() {
    if (this.isManager){
      this.navCtrl.setRoot(ManageTaskPage, {source: this.calendarTask});
    } else {
      this.navCtrl.setRoot(MyTaskPage, {source: this.calendarTask});
    }
  }

  addNewTask() {
    console.log('addNewTask method call');
    this.navCtrl.push(TaskeditPage, {listIndex: null, taskType: "OPEN"});
  }
}