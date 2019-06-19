import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Constants } from '../../utils/Constants';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'page-attendance-popup',
  templateUrl: 'attendance-popup.html',
})
export class AttendancePopupPage {

  username:any;
  employee_id:any
  constructor(public localStore: Storage, public translationProvider: GeneralProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.translationProvider.direction)

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePopupPage');
  }

}