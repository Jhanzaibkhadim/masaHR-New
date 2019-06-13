import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Constants } from '../../utils/Constants';
import { Storage } from '@ionic/storage';

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

  username:any;
  employee_id:any
  constructor(public localStore: Storage, public translationProvider: GeneralProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.translationProvider.direction)

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
