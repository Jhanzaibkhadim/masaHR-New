import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Constants } from '../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  username: any;
  employee_id: any
  constructor(public localStore: Storage, public translationProvider: GeneralProvider, public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider) {
    console.log(this.translationProvider.direction)

  }


  ionViewWillEnter() {
    // let elem = <HTMLElement>document.querySelector(".tabbar");
    // if (elem != null) {
    //   elem.style.display = 'none';
    // }
  }
  ionViewWillLeave() {
    // let elem = <HTMLElement>document.querySelector(".tabbar");
    // if (elem != null) {
    //   elem.style.display = 'flex';
    // }
  }

  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.username = res.name;
        this.employee_id = res.employee_id
      }
    })
    console.log('ionViewDidLoad OverviewPage');
  }

}
