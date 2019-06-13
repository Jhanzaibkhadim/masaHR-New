import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OverviewPage } from '../overview/overview';

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
  tab2Root:any = OverviewPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
