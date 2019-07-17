import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 
@Component({
  selector: 'page-employee-location',
  templateUrl: 'employee-location.html',
})
export class EmployeeLocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeLocationPage');
  }

}
