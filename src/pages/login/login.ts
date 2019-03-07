import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName: any;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gotoHomePage() {
    this.navCtrl.setRoot(TabsPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
