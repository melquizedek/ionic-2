export class TasksModel {
    
    employeeid: string;
    workorder: string;
    promisedate: string;
    customer: string;
    manufacturer: string;
    description: string;

    constructor(employeeid: string
                ,workorder: string 
                ,promisedate: string
                ,customer: string
                ,manufacturer: string
                ,description: string ){

        /*this.employeeid = employeeid;
        this.workorder = workorder;
        this.promisedate = promisedate;
        this.customer = customer;
        this.manufacturer = manufacturer;
        this.description = description;*/
    }
}

export class TaskItems{
    
    constructor(public tasks: Array<TasksModel>) {
       
    }
}

/*export class TaskItems extends Array<TasksModel> {
    
    constructor(public tasks: Array<TasksModel>) {
        super();
        this.tasks.forEach(t => {
            this.push(t);
        });
    }
}

export class TaskListItems {
    constructor(public TaskItems: TaskItems) { }
}*/