import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BasicInfoPage } from '../basic-info/basic-info';
import { BankListPage } from '../bank-list/bank-list';
import { LostEmployeeSkillsPage } from '../lost-employee-skills/lost-employee-skills';
import { CurrentEmployeeSkillsPage } from '../current-employee-skills/current-employee-skills';
import { QualificationListPage } from '../qualification-list/qualification-list';

/**
 * Generated class for the BasicInfoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-basic-info-list',
  templateUrl: 'basic-info-list.html',
})
export class BasicInfoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicInfoListPage');
  }

  gotoLost(){
    this.navCtrl.push(LostEmployeeSkillsPage)
  }
  gotoCurrent(){
    this.navCtrl.push(CurrentEmployeeSkillsPage)
  }
  gotoBank(){
    this.navCtrl.push(BankListPage)
  }
  gotoPersonalInfo(){
    this.navCtrl.push(BasicInfoPage)
  }
  gotoQualificationsPage(){
    this.navCtrl.push(QualificationListPage)
  }
}
