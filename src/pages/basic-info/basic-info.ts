import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-basic-info',
  templateUrl: 'basic-info.html',
})
export class BasicInfoPage {

  employeName:any;
  employeCode:any;
  employeNumber:any;
  employeEmail:any;
  employeDepartment:any;
  typee:any;
  // (ionChange)="checktype()"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicInfoPage');
  }
   

}
