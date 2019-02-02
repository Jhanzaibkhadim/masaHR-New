import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SalariesAndIncentiveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salaries-and-incentive-list',
  templateUrl: 'salaries-and-incentive-list.html',
})
export class SalariesAndIncentiveListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalariesAndIncentiveListPage');
  }

}
