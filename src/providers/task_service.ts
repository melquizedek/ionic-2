import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {


    private tasksRef: AngularFireList<any>;

    private tableName: string = "task/";
    public taskOpen: any;
    public taskAssigned: any;
    public taskCompleted: any;
    public account_type: any;
    public accounts: Array<any> = new Array<any>();
    public accountsData: Observable<any[]>;
    public taskList: Observable<any>;

    constructor(public afdb: AngularFireDatabase) {
        this.tasksRef = afdb.list('/task');
        this.taskList = this.tasksRef.valueChanges();
    }

    getTasksListRef(): any{
        return this.tasksRef;
    }

    getTaskData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.tasksRef.snapshotChanges().map(actions => {
                    return actions.map(action => ({ key: action.key, ...action.payload.val() }));
              }).subscribe(items => {
                    console.log('TaskService:getTaskData => ', items);
                    resolve(items);
              });
        });
    }

    getAssignedTechnicianTaskData(userId: string): Promise<any> {
        //console.log('TaskService:getAssignedTechnicianTaskData:tableName =>', this.tableName, 'userId=>', userId);
        return new Promise((resolve, reject) => {
            var tasks : Array<object> = [];
            const ref = firebase.database().ref();
            ref.child(this.tableName).orderByChild('EMP_ID_NO')
                .on("value", function(snapshots) {
                    let assignTasks = snapshots.val();
                    if (assignTasks) {
                        for (let pro in assignTasks) {
                            //console.log(assignTasks[pro]['EMP_ID_NO'], assignTasks[pro]['EMP_ID_NO'].indexOf(userId));
                            if (assignTasks[pro]['EMP_ID_NO'].indexOf(userId) > -1) {
                                tasks.push(assignTasks[pro]);
                            }
                        }   
                    }
                    resolve(tasks);
                })
        })
    }

    addToTask(taskItem: any, taskType: any) {
        if(taskType == "OPEN"){
            this.taskOpen.push(taskItem);
        } else if(taskType == "ASSIGNED"){
            this.taskAssigned.push(taskItem);
        } else if(taskType == "COMPLETED"){
            this.taskCompleted.push(taskItem);
        } 

        firebase.database().ref().child('').push().key;               
    }

    addTaskToFb(data: any): Promise<any> {
        return new Promise(resolve => {
            var newPostKey = firebase.database().ref().child(this.tableName).push();
            var id = newPostKey.key;
            console.log('TaskService:addTaskToFb:data => ', data, ' this.tableName + id =>', this.tableName + id);
            resolve(firebase.database().ref(this.tableName + id).set(data));
        });
    }

    updateTaskToFb(taskID:any, data:any) : Promise<any> {
        console.log('TaskService:updateTaskToFb:taskID =>', taskID, 'TaskService:updateTaskToFb:data => ', data);
        return new Promise(resolve => {
            var isError = false; 
            
            firebase.database().ref(this.tableName + taskID).set(data).catch(error => {
                if (error) isError = true;
            });

            resolve(isError);
        });
    }

    removeToTask(index: number, taskType: any) {
        if(taskType == "OPEN"){
            return this.taskOpen.splice(index, 1);
        } else if(taskType == "ASSIGNED"){
            return this.taskAssigned.splice(index, 1);
        } else if(taskType == "COMPLETED"){
            return this.taskCompleted.splice(index, 1);
        }
    }

    removeTask(taskID: any): Promise<any>{
        console.log('TaskService:removeTask:taskID' + taskID);
        return new Promise(resolve => {
            var isError:boolean = false;
            this.afdb.list(this.tableName).remove(taskID).catch(err => {
                if (err) isError = true;
            });
            resolve(isError);
        })
    }

    getTaskItems(taskType: any): Array<any> {
        if(taskType == "OPEN"){
            return this.taskOpen;
        } else if(taskType == "ASSIGNED"){
            return this.taskAssigned;
        } else if(taskType == "COMPLETED"){
            return this.taskCompleted;
        }
        return null;
    }

    getSpecificTask(index: number, taskType: any): Array<any> {
        if(taskType == "OPEN"){
            return this.taskOpen[index];
        } else if(taskType == "ASSIGNED"){
            return this.taskAssigned[index];
        } else if(taskType == "COMPLETED"){
            return this.taskCompleted[index];
        }
        return null;
    }

    getTaskItemsByEmployee(taskType: any, employee: any): Array<any> {
        // if(taskType == "ASSIGNED"){
        //     this.assignedTaskEmp = [];
        //     for(var i=0; i < this.taskAssigned.length; i++){
        //         let task = this.taskAssigned[i];
        //         if(task.EMP_ID_NO == employee){
        //             //this.assignedTaskEmp[i] = task;
        //             this.assignedTaskEmp.push(task);
        //         }
        //     }
        //     return this.assignedTaskEmp;
        // } else if(taskType == "COMPLETED"){
        //     this.completedTaskEmp = [];
        //     for(var i=0; i < this.taskCompleted.length; i++){
        //         let task = this.taskCompleted[i];
        //         if(task.EMP_ID_NO == employee){
        //             //this.completedTaskEmp[i] = task;
        //             this.completedTaskEmp.push(task);
        //         }
        //     }
        //     return this.completedTaskEmp;
        // }
        return null;
    }
}

