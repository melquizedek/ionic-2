import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AssignedtabPage } from '../assignedtab/assignedtab';
import { OpentabPage } from '../opentab/opentab';
import { CompletedtabPage } from '../completedtab/completedtab';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = OpentabPage;
  tab2Root: any = AssignedtabPage;
  tab3Root: any = CompletedtabPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    //this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.mySelectedIndex = 0;
  }

  calendarView(){
    console.log("calendarView");
  }

  listView(){
    console.log("listView");
  }

}
