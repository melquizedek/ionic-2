import { Injectable } from '@angular/core';
import { TaskItems } from '../model/TasksModel';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';



@Injectable()
export class TaskReportService {

    private reportsRef: AngularFireList<any>;

    private reportList: Observable<any>;
    private taskList: Observable<any>;
    private tableName: string = "report/";
    private reports: Array<any> = [{   
                            "TASK_NAME": "Wheel Alignment Car",
                            "EMP_ID_NO": "0001",
                            "EMP_INITIALS": "TECH1",
                            "EMP_LAST_NAME": "TECH1",
                            "WORK_ORDER_NUMBER": "BE96188"                            
                        },
                        {        
                            "TASK_NAME": "Wheel Alignment Truck",
                            "EMP_ID_NO": "0002",
                            "EMP_INITIALS": "TECH2",
                            "EMP_LAST_NAME": "TECH2",
                            "WORK_ORDER_NUMBER": "BE96188"
                        }];
    
    constructor( public afdb: AngularFireDatabase) {
    this.reportsRef = afdb.list('/report');
      this.reportList = this.reportsRef.valueChanges();
      this.taskList = afdb.list('/task').valueChanges();
    }

    //ge20170526 : get data from fb
    getServiceReports(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.afdb.list(this.tableName).valueChanges().subscribe(data => {
            if (data){
            resolve(data);            
            }        
            else {
            reject('error');
            }
        })
      })
    }

    addReportToFb(data: any, id: any): Promise<any>{
        return new Promise(resolve => {
            var newPostKey = firebase.database().ref().child(this.tableName).push();
            var id = newPostKey.key;        
            resolve(firebase.database().ref(this.tableName + id).set(data));
        });
    }

    updateReportInFb(data: any, id: any): Promise<any>{
        console.log(data);
        return new Promise(resolve => {
            this.reportsRef.update(id, {
              REPORT_STATUS: "review",
              TITLE: data.TITLE,
              WORK_ORDER_NUMBER: data.WORK_ORDER_NUMBER,
              EMP_ID_NO: data.EMP_ID_NO,
              CUSTOMER_NAME: data.CUSTOMER_NAME,
              EQPMNF_SERIAL_NUM: data.EQPMNF_SERIAL_NUM,
              DEALER_CODE: data.DEALER_CODE,
              SERVICE_DATE: data.SERVICE_DATE,
              CUST_EQUIP_NUMBER: data.CUST_EQUIP_NUMBER,
              CUST_EQUIP_MANUFACTURER: data.CUST_EQUIP_MANUFACTURER,
              CUST_EQUIP_MODEL: data.CUST_EQUIP_MODEL,
              CUST_EQUIP_SERIALNUMBER: data.CUST_EQUIP_SERIALNUMBER,
              CUST_EQUIP_LOCATION: data.CUST_EQUIP_LOCATION,
              IN_DATE: data.IN_DATE,
              OUT_DATE: data.OUT_DATE,
              PROMISE_DATE: data.PROMISE_DATE,
              INSTRUCTIONS: data.INSTRUCTIONS,
              COMPLAINT: data.COMPLAINT,
              CAUSE: data.CAUSE,
              DAMAGE: data.DAMAGE,
              PROCESS: data.PROCESS,
              TIMESTAMP: data.TIMESTAMP,

              LABOR_DATE: data.LABOR_DATE,
              LABOR_ENTRY: data.LABOR_ENTRY, //Labor entry data is an array of objects
              START_TIME: data.START_TIME,
              END_TIME: data.END_TIME,
              OVERTIME: data.OVERTIME,
              HOURS: data.HOURS,
              DATE: data.DATE,
              CHARGE_CODE: data.CHARGE_CODE,
              QTY: data.QTY,
              DESCRIPTION: data.DESCRIPTION,
              COST: data.COST,
              COMMENTS: data.COMMENTS,
              COMPLETED: data.COMPLETED,
              PARTS_RETURNED: data.PARTS_RETURNED,
              PARTS_RESTOCKED: data.PARTS_RESTOCKED,
              TOOLS_RETURNED: data.TOOLS_RETURNED,
              REMAN_RETURNED: data.REMAN_RETURNED,
              INFO_IN_SIMS: data.INFO_IN_SIMS,
              ADDITIONAL_SERVICE: data.ADDITIONAL_SERVICE,
              SERVICE_QUOTE: data.SERVICE_QUOTE,
              PSSR_REQ: data.PSSR_REQ,
              COMMENT: data.COMMENT,
              COMPLAINTS: data.COMPLAINTS,
              CORRECTION: data.CORRECTION,
              COMPLICATIONS: data.COMPLICATIONS,
              PROCESS_COMMENTS: data.PROCESS_COMMENTS,
              JOB_CODE: data.JOB_CODE,
              COMP_CODE: data.COMP_CODE,
              INSTRUCTIONS_RHI: data.INSTRUCTIONS_RHI,
              PART_NUM: data.PART_NUM,
              PART_NAME: data.PART_NAME,
              QUANTITY: data.QUANTITY,
              SMCS: data.SMCS,
              PRIMARY: data.PRIMARY,
              SECONDARY: data.SECONDARY,
              GROUP_NUM: data.GROUP_NUM,
              GROUP_NAME: data.GROUP_NAME,
              DURABILITY_IND: data.DURABILITY_IND,
              PROD_INOP: data.PROD_INOP,
              CAT: data.CAT,
              COMM: data.COMM,
              SMU_val: data.SMU_val,
              SMU_num: data.SMU_num,



            });
        });
    }

    addLaborEntryData(data: any, id: any): Promise<any>{
        return new Promise(resolve => {
            

        });

    }


    getTaskReportItems(): Array<any> {          
        return this.reports;               
    }

    geTaskListsRef(): any{
        return this.reportsRef;
    }
    
    getSpecificTaskReport(index: number): Array<any> {               
        return this.reports[index];
    }
}

