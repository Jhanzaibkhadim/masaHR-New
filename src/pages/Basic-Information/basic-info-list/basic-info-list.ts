import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BasicInfoPage } from '../basic-info/basic-info';
import { BankListPage } from '../bank-list/bank-list';
import { LostEmployeeSkillsPage } from '../lost-employee-skills/lost-employee-skills';
import { CurrentEmployeeSkillsPage } from '../current-employee-skills/current-employee-skills';
import { QualificationListPage } from '../qualification-list/qualification-list';
import { EmployeeExperiencePage } from '../employee-experience/employee-experience';

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
  ionViewWillEnter() {
    // let elem = <HTMLElement>document.querySelector(".tabbar");
    // if (elem != null) {
    //   elem.style.display = 'none';
    // }

    // let elem = <HTMLElement>document.querySelector(".tabbar");
    // if (elem != null) {
    //   elem.style.display = 'flex';
    // }

  }
  ionViewWillLeave() {
    // let elem = <HTMLElement>document.querySelector(".tabbar");
    // if (elem != null) {
    //   elem.style.display = 'flex';
    // }
  }

  gotoLost() {
    this.navCtrl.push(LostEmployeeSkillsPage)
  }
  gotoCurrent() {
    this.navCtrl.push(CurrentEmployeeSkillsPage)
  }
  gotoBank() {
    this.navCtrl.push(BankListPage)
  }
  gotoEmployeeExp() {
    this.navCtrl.push(EmployeeExperiencePage)
  }
  gotoPersonalInfo() {
    this.navCtrl.push(BasicInfoPage)
  }
  gotoQualificationsPage() {
    this.navCtrl.push(QualificationListPage)
  }
}
