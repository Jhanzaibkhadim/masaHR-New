import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BasicInfoPage } from '../Basic-Information/basic-info/basic-info';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BasicInfoListPage } from '../Basic-Information/basic-info-list/basic-info-list';
import { ContractsListPage } from '../contracts-list/contracts-list';
import { HrProceduresListPage } from '../hr-procedures-list/hr-procedures-list';
import { LeavesPage } from '../leaves/leaves';
import { OverviewPage } from '../overview/overview';
import { TranslateService } from '@ngx-translate/core';

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

  username: any;
  employee_id: any;
  employeeJob: any;
  constructor(public localStore: Storage, public navCtrl: NavController, public navParams: NavParams,
    public translateService: TranslateService,
    public api: ApiProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.username = res.name;
        if(res.name !== undefined){
          this.api.employeeNmeGlobal= res.name;
        }
        this.employee_id = res.employee_id
      }
    })
    this.getEmployeeDetail()

    console.log('ionViewDidLoad DashboardPage');
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
  gotoBasicInformation() {
    this.navCtrl.push(BasicInfoListPage)
  }
  gotobasicEdit() {
    this.navCtrl.push(BasicInfoPage)
  }
  gotoContracts() {
    this.navCtrl.push(ContractsListPage)
  }
  gotoLeaves() {
    this.navCtrl.push(LeavesPage)
  }

  gotoAttendance() {
    this.navCtrl.push(OverviewPage)
  }


  getEmployeeDetail() {
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
    this.api.getRequest(Constants.GET_EMP_DETAIL).then((data: any) => {
      console.log(data)
      loading.dismiss()

      if (data.length > 0 && data !== undefined) {
        // this.username = data[0].name

        this.api.employeeJobGlobal = data[0].name
      }


    });

  }


}
