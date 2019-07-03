import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { TabsPage } from '../tabs/tabs';
import { GeneralProvider } from '../../providers/general/general';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { MessageDialoguePage } from '../message-dialogue/message-dialogue';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName: any;
  password: any;
  constructor(public modal: ModalController, public translateService: TranslateService, public localStore: Storage, public toastCtrl: ToastController, public api: ApiProvider,
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
  ionViewWillEnter() {
    this.menu.enable(false)
    this.getLocalData();
  }
  ionViewWillLeave() {
    this.menu.enable(true)

  }

  displaySimpleToast(icon, messageTitle, messageText, button) {

    var addSuccess = {
      icon: `assets/imgs/${icon}.svg`,
      title: messageTitle,
      message: messageText,
      yesButtonText: 'Ok',
      noButtonText: 'Cancel',
      singleButton: button
    };
    var modal = this.modal.create(MessageDialoguePage, { data: addSuccess }, { enableBackdropDismiss: false, cssClass: "picture-option" })

    modal.onDidDismiss(data => {
      // if (data === 1) {
      // }
      // else {
      // }
    })
    modal.present()
  }
  login() {
    var data = {
      emp_code: this.userName,
      password: this.password
    }

    if (this.userName == undefined || this.userName.trim() == "") {
      alert("Please Enter your Username");

    } else
      if (this.password == undefined || this.password.trim() == "") {
        alert("Please Enter your Password");

      } else {
        this.api.postRequest(`${Constants.LOGIN}`, data).then((data: any) => {
          console.log(data)
          if (data.success == 1) {
            this.localStore.set(Constants.SAVE_USER_INFO_KEY, data);

            this.navCtrl.setRoot(TabsPage);

          }
          else {
            var try_again;
            var error;
            this.translateService.get('TRY_AGAIN').subscribe(
              value => {
                // value is our translated string
                try_again = value;
              }
            )
            this.translateService.get('Error').subscribe(
              value => {
                // value is our translated string
                error = value;
              }
            )

            this.displaySimpleToast('error', error, try_again, false)
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
