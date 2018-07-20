import { Injectable } from '@angular/core';
import { TaskItems } from '../model/TasksModel';

@Injectable()
export class AccountService {

    public accounts: Array<any> = new Array<any>();

    constructor() {
       this.accounts = [{   
                            "TASK_NAME": "0001",
                            "EMP_INITIALS": "MNGR1",
                            "EMP_LAST_NAME": "MNGR1",
                            "USERNAME": "mngr1",
                            "PASSWORD": "mngr1",
                            "ACCOUNT_TYPE": "1",
                            "ACCOUNT_DESC": "Manager",
                            "EMAIL": "manager1@gmail.com"
                        },
                        {        
                            "EMP_ID_NO": "0002",
                            "EMP_INITIALS": "TECH1",
                            "EMP_LAST_NAME": "TECH1",
                            "USERNAME": "tech1",
                            "PASSWORD": "tech1",
                            "ACCOUNT_TYPE": "2",
                            "ACCOUNT_DESC": "Technician",
                            "EMAIL": "tech1@gmail.com"
                        }];
    }

    getTaskItems(): Array<any> {          
        return this.accounts;               
    }
    
    getSpecificTask(index: number): Array<any> {               
        return this.accounts[index];
    }

}

