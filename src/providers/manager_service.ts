import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ManagerService {

  public account_type: any;
  public store_no: any;
  public initial: any;
  public cost_ctr_code: any;

  private accounts: Array<any> = new Array<any>();
  private userData: Array<any> = new Array<any>();

  constructor(private afdb: AngularFireDatabase) {
  }

  getManagerData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.list("/manager").valueChanges().subscribe(data => {
        if (data) {
          resolve(data);
        }
        else {
          reject(data);
        }
      })
    })
  }

  getManagerUserData(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.list('/manager',
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

  setUserData(param) { this.userData = param; }
  getUserData(): Array<any> { return this.userData; }

  setStoreNo(storeNo) { this.store_no = storeNo; }
  getStoreNo(): any { return this.store_no; }

  setCostCtrCode(costCtrCode) { this.cost_ctr_code = costCtrCode; }
  getCostCtrCode(): any { return this.cost_ctr_code; }

  setInitial(initials) {
    this.initial = initials;
  }

  getInitial(): any {
    return this.initial;
  }
}

