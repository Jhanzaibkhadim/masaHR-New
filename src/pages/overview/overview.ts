import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';

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

  constructor(public translationProvider:GeneralProvider, public navCtrl: NavController, public navParams: NavParams) {
  console.log(this.translationProvider.direction)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
  }

}
