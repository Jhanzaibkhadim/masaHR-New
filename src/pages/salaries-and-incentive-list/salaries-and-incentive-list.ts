import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 
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
