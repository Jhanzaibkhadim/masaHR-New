import { AddLeavePage } from './../add-leave/add-leave';
import { LeaveDetailsPage } from './../leave-details/leave-details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeavesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-leaves',
  templateUrl: 'leaves.html',
})
export class LeavesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavesPage');
  }


  gotoLeavesDetail() {
    this.navCtrl.push(LeaveDetailsPage)
  }

  gotoAddLeaves() {
    this.navCtrl.push(AddLeavePage)
  }


}
