import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Global } from '../../../utils/Global';
import { Constants } from '../../../utils/Constants';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { GeneralProvider } from '../../../providers/general/general';
import { TranslateService } from '@ngx-translate/core';
import { MessageDialoguePage } from '../../message-dialogue/message-dialogue';

@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html',
})
export class AddBankPage {
  EmployeName: any;
  employee_id: any;
  banksList: any = [];
  bankName: string = '';
  showBank: boolean;
  bankID: any = '';
  bankStatus: string = '';
  accountNumber: string = '';
  partner_id: any = '';
  BankIsEdit: boolean = false;
  hideEditbtn: boolean = false
  constructor(public modal:ModalController,  public translateService: TranslateService, public directionParam: GeneralProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {

    console.log(this.navParams.data)
    this.BankIsEdit = this.navParams.data
    if (this.navParams.data == true) {
      this.hideEditbtn = true;
    }
  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        this.getPartnerID();

      }
    })
    console.log('ionViewDidLoad addbank');
    this.readBanks();

  }

  readBanks() {
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
    this.api.getRequest(`${Constants.READ_BANKS}`).then((data: any) => {
      loading.dismiss()
      console.log(data)

      if (data !== null && data !== undefined) {
        console.log(data)
        this.banksList = data;
        console.log(this.banksList)

      }
    });
  }

  getPartnerID() {
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
    this.api.getRequest(`${Constants.GET_PARTNER_ID}` + this.employee_id).then((data: any) => {
      loading.dismiss()
      console.log(data)

      if (data !== null && data !== undefined && data.length > 0) {
        console.log(data)

        this.partner_id = data[0].id

      }
    });

  }
  selectbank(obj) {
    this.showBank = false
    this.bankID = obj.id;
    this.bankName = obj.name

  }
  searchbanks() {
    // if(this.bankName == ''){
    //   this.showBank = true
    // }else{
    //   this.showBank = false
    // }
    this.showBank = true
    //
  }

  createBank() {
    if (this.bankID !== '' || this.accountNumber !== '' || this.bankStatus !== '') {

      var please_wait;
      this.translateService.get('PLEASE_WAIT').subscribe(
        value => {

          please_wait = value;
        }
      )
      console.log(please_wait)
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: ' <img src="assets/imgs/loading.gif" /> <br>' + please_wait
      });

      var data = {
        // employee_id:this.employee_id,
        bank_id: this.bankID,
        // bank_name:this.bankName,
        active: this.bankStatus,
        partner_id: "1",
        acc_number: this.accountNumber
      }
      console.log(data)
      loading.present();
      this.api.postRequest(`${Constants.CREATE_BANK}`, data).then((data: any) => {
        loading.dismiss()
        console.log(data)

        if (data !== null && data !== undefined) {
          console.log(data)
          var record_added;
          var success;
          this.translateService.get('RECORD_ADDED').subscribe(
            value => {
              // value is our translated string
              record_added = value;
            }
          )
          this.translateService.get('SUCCESS').subscribe(
            value => {
              // value is our translated string
              success = value;
            }
          )

          this.displaySimpleToast('success', success, record_added, false)

          this.navCtrl.pop();

          // this.banksList=data;
          // console.log(this.banksList)

        }
      });
    }
    else {
      var fillDetails;
      var error;
      this.translateService.get('FILL_DETAILS').subscribe(
        value => {
          // value is our translated string
          fillDetails = value;
        }
      )
      this.translateService.get('Error').subscribe(
        value => {
          // value is our translated string
          error = value;
        }
      )

      this.displaySimpleToast('error', error, fillDetails, false)
    }
  }




  // Edit profile /update

  cancel() {
    this.BankIsEdit = false;
  }

  EditBank() {
    this.BankIsEdit = true;
  }
  updateBank() {
    if (this.bankID == '' || this.accountNumber == '' || this.bankStatus == '') {
      var fillDetails;
      var error;
      this.translateService.get('FILL_DETAILS').subscribe(
        value => {
          // value is our translated string
          fillDetails = value;
        }
      )
      this.translateService.get('Error').subscribe(
        value => {
          // value is our translated string
          error = value;
        }
      )

      this.displaySimpleToast('error', error, fillDetails, false)


    } else {
      var please_wait;
      this.translateService.get('PLEASE_WAIT').subscribe(
        value => {

          please_wait = value;
        }
      )
      console.log(please_wait)
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: ' <img src="assets/imgs/loading.gif" /> <br>' + please_wait
      });

      loading.present();

      this.BankIsEdit = false;

      var temp =
      {
        // employee_id:this.employee_id,
        bank_id: this.bankID,
        // bank_name:this.bankName,
        active: this.bankStatus,
        partner_id: this.partner_id,
        acc_number: this.accountNumber
      }


      console.log(temp)
      this.api.postRequest(`${Constants.UPDATE_BANK}`, temp).then((resp: any) => {
        console.log(resp)
        loading.dismiss();
        if (resp.success == 0) {
          var record_updated;
          var success;
          this.translateService.get('PROFILE_UPDATED').subscribe(
            value => {
              // value is our translated string
              record_updated = value;
            }
          )
          this.translateService.get('SUCCESS').subscribe(
            value => {
              // value is our translated string
              success = value;
            }
          )

          this.displaySimpleToast('success', success, record_updated, false)


          this.navCtrl.pop();
        }
      })

    }
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
}
