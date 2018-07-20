import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TechnicianService {

    private account_type: any;
    private accounts: Array<any> = new Array<any>();
    private accountsData: Observable<any[]>;
    private userData: any;

    constructor(public afdb: AngularFireDatabase) {
    }

    getTechnicianData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afdb.list('/technician').valueChanges().subscribe(data => {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            })
        })
    }

    getTechnicianUserData(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afdb.list('/technician',
                ref => ref.orderByChild('EMP_ID_NO').equalTo(userId)
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


    // All Technician
    addTechnician(techItem: any) {
        //this.all_technician.push(techItem);
    }

    removeTechnician(index: number) {
        //return this.all_technician.splice(index, 1);
    }

    getTechnicianItem(): Array<any> {
        //return this.all_technician;
        return null;
    }

    getSpecificTechnician(index: number): Array<any> {
        //return this.all_technician[index];
        return null;
    }

    // My Technician
    addMyTechnician(myTechItem: any) {
        //this.my_technician.push(myTechItem);
    }

    removeMyTechnician(index: number) {
        //return this.my_technician.splice(index, 1);
    }

    getMyTechnicianItem(): Array<any> {
        //return this.my_technician;
        return null;
    }

    getSpecificMyTechnician(index: number): Array<any> {
        //return this.my_technician[index];
        return null;
    }

    setUserData(data) {
        this.userData = data;
    }

    getUserData() {
        return this.userData;
    }
}

