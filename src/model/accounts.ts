export class AccountsModel {
    empIdNo: string;
    username: string;
    password: string;
   
    constructor(empIdNo: string
                ,username: string 
                ,password: string){
        this.empIdNo = empIdNo;
        this.username = username;
        this.password = password; 
    }
}