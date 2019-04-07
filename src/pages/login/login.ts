import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { TabsPage } from '../tabs/tabs';
import { GeneralProvider } from '../../providers/general/general';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName: any;
  password: any;
  constructor(public localStore:Storage, public toastCtrl: ToastController, public api: ApiProvider , 
    public navCtrl: NavController, public navParams: NavParams, public translationProvider: GeneralProvider,
    public menu: MenuController) {
  console.log(this.translationProvider.direction)
  }


  gotoHomePage() {
    this.navCtrl.setRoot(TabsPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillEnter(){
    this.menu.enable(false)
    this.getLocalData();
  }
  ionViewWillLeave(){
    this.menu.enable(true)

  }

  displaySimpleToast(msg) {

    var toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    })
    toast.present();
  }
  login() {
    var data = {
      "emp_code": this.userName,
      "password": this.password
    }

    if (this.userName == undefined || this.userName.trim() == "") {
      this.displaySimpleToast("Please Enter your Username");

    } else
      if (this.password == undefined || this.password.trim() == "") {
        this.displaySimpleToast("Please Enter your Password");

      } else {
        this.api.postRequest(`${Constants.LOGIN}`, data).then((data: any) => {
          console.log(data)
          if (data.success == 0) {
            this.localStore.set(Constants.SAVE_USER_INFO_KEY, data);

            this.navCtrl.setRoot(TabsPage);

          }
          else {
            this.displaySimpleToast("Please Try again")
          }

        })
      }

  }

  getLocalData() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        // this.userName = res.name;
        this.navCtrl.setRoot(TabsPage);
      }
    })
  }
}
