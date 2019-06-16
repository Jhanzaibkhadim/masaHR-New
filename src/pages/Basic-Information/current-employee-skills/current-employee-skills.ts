import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { AddBankPage } from '../add-bank/add-bank';
import { GeneralProvider } from '../../../providers/general/general';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-current-employee-skills',
  templateUrl: 'current-employee-skills.html',
})
export class CurrentEmployeeSkillsPage {

  employee_id: any;

  constructor(public translateService: TranslateService, public directionParam: GeneralProvider, public api: ApiProvider, public loadingCtrl: LoadingController, public localStore: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        // this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        this.getcurrentSkillList();
      }
    })


  }
  currentSkillList: any = [];
  getcurrentSkillList() {
    var please_wait;
    this.translateService.get('PLEASE_WAIT').subscribe(
      value => {
        // value is our translated string
        please_wait = value;
      }
    )
    console.log(please_wait)
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ' <img src="assets/imgs/loading.gif" /> <br>' + please_wait
    });

    loading.present();

    this.api.getRequest(`${Constants.CURRENT_EMPLOYEE_SKILL_LIST}` + this.employee_id).then((data: any) => {
      loading.dismiss()
      console.log(data)

      if (data !== null && data !== undefined) {
        this.currentSkillList = data;
        console.log(this.currentSkillList)

      }
    });
  }

}
