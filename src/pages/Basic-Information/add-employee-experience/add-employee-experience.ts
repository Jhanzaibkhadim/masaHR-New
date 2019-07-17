import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
@Component({
  selector: 'page-add-employee-experience',
  templateUrl: 'add-employee-experience.html',
})
export class AddEmployeeExperiencePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeeExperiencePage');
  }

}
