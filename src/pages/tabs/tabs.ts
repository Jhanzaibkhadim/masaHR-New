import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OverviewPage } from '../overview/overview';
import { AttendancePopupPage } from '../attendance-popup/attendance-popup';
import { BasicInfoListPage } from '../Basic-Information/basic-info-list/basic-info-list';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = DashboardPage;
  tab2Root: any = AttendancePopupPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  ionViewWillEnter() {
    console.log(this.tab1Root)
    // this.navParams.data.pageComp =
    console.log(this.navParams.data.pageComp)

    // if (this.tab1Root == undefined) {
    //   this.tab1Root = DashboardPage
    // } else {
    //   this.tab1Root = this.navParams.data.pageComp
    // }
  }

}
