export class TaskModel {
    
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

        this.employeeid = employeeid;
        this.workorder = workorder;
        this.promisedate = promisedate;
        this.customer = customer;
        this.manufacturer = manufacturer;
        this.description = description;
    }
}