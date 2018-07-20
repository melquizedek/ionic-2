import { Injectable } from '@angular/core'
import * as moment from 'moment'

@Injectable()
export class HelperService {

    today : any = Date.now();

    constructor() {}

    taskStatusDate(startDate:string, endDate:string, returnType:string) : string {

        var today = Math.floor(moment.duration(this.today, 'milliseconds').asDays());
        var dueStart = Math.floor(moment.duration(startDate, 'milliseconds').asDays());
        var dueEnd = Math.floor(moment.duration(endDate, 'milliseconds').asDays());
        
        let badgeStatus = {badge: "", status: "", style: ""};
        let daysRemaining = (dueEnd - today);
    
        if (today == dueStart) {
          badgeStatus = {badge: "IN-PROGRESS", status: "IN-PROGRESS", style: "task-list-status-completed"};
        } else if (daysRemaining === 1) {
            badgeStatus = {badge: daysRemaining + " DAY", status: "DUE TOMMOROW", style: "task-list-status"};
        } else if (daysRemaining === 0) {
            badgeStatus = {badge: "TODAY", status: "DUE TODAY", style: "task-list-status-today"};
        } else if (daysRemaining < 0) {
          badgeStatus = {badge: "OVERDUE", status: "OVERDUE", style: "task-list-status-overdue"};
        } else if (dueEnd > today) {
          let remainingDays = (dueEnd - today);
          badgeStatus = {badge: remainingDays + " DAYS", status: "DUE IN " + remainingDays + " DAYS", style: "task-list-status"};
        }
    
        if (returnType === "status") return badgeStatus.status;
        if (returnType === "style") return badgeStatus.style;
        if (returnType === "badge") return badgeStatus.badge;
    
        return "";
      }

      makeid() : string {
          let alphaChar = "";
          let numChar = "";
          let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let num = "0123456789";

          for (let i = 0; i < 2; i++)
            alphaChar += alpha.charAt(Math.floor(Math.random() * alpha.length));

          for (let i = 0; i < 5; i++)
            numChar += num.charAt(Math.floor(Math.random() * num.length));

          return alphaChar + numChar;
      }
}