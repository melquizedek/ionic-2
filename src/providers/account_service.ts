import { Injectable } from '@angular/core';
import { TaskItems } from '../model/TasksModel';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AccountService {

    private account_type: any;
    private accounts: Array<any> = new Array<any>();
    private uploadFiles: Array<any> = new Array<any>();

    constructor(private af: AngularFireDatabase) {

    }

    setAccountType(accountType) {
        this.account_type = accountType;
    }

    getAccountType() {
        return this.account_type;
    }


    getTaskItems(): Array<any> {
        return this.accounts;
    }

    getSpecificTask(index: number): Array<any> {
        return this.accounts[index];
    }

    getUploadFiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.af.list("/uploadFiles").valueChanges().subscribe(data => {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            })
        })
    }

    getData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.af.list("/accounts").valueChanges().subscribe(data => {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            })
        })
    }


    getUserData(userName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.af.list("/accounts",
                ref => ref.orderByChild('USERNAME').equalTo(userName)
            ).valueChanges().subscribe(data => {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            })
        })
    }

}

