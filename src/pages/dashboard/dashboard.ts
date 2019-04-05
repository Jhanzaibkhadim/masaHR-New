import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicInfoPage } from '../Basic-Information/basic-info/basic-info';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BasicInfoListPage } from '../Basic-Information/basic-info-list/basic-info-list';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  username:any;
  employee_id:any;
  constructor(public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        this.username = res.name;
        this.employee_id=res.employee_id
      }
    })
    console.log('ionViewDidLoad DashboardPage');
  }


  gotoBasicInformation(){
    this.navCtrl.setRoot(BasicInfoListPage)
  }
}
