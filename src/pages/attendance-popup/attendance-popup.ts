import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Constants } from '../../utils/Constants';
import { Storage } from '@ionic/storage';
import { MessageDialoguePage } from '../message-dialogue/message-dialogue';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-attendance-popup',
  templateUrl: 'attendance-popup.html',
})
export class AttendancePopupPage {

  username: any;
  employee_id: any;
  attendanceList: any = [];
  todayDate: any = 0;
  timeIn: any = 0;
  timeout: any = 0;
  delayTime; any = 0;
  constructor(public api: ApiProvider, public loadingCtrl: LoadingController, public localStore: Storage, public modal: ModalController, public translateService: TranslateService, public translationProvider: GeneralProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.translationProvider.direction)
    // this.getContractID();
  }

  goto() {
    // this.navCtrl.setRoot(tabsPage);

  }
  ionViewWillEnter() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.username = res.name;
        this.employee_id = res.employee_id
        this.getTodayAttendance();
        this.getContractID()
        this.getAttendanceConfig()

      }
    })
    console.log('ionViewDidLoad AttendancePopupPage');
    console.log("enter")

  }
  ionViewDidLoad() {

  }

  contractID: any = 0;
  getContractID() {
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
    this.api.getRequest(`${Constants.CONTRACT_ID + 5997}`).then((data: any) => {
      loading.dismiss()
      if (data !== null && data !== undefined) {
        console.log(data)
        this.contractID = data[0].id;
        console.log(this.contractID)

      }
    });
  }


  checkinAttendance() {
    var checkinTime = new Date();
    var day = checkinTime.getDate();
    var monthIndex = checkinTime.getMonth();
    var year = checkinTime.getFullYear();
    var time = checkinTime.getTime();
    var checkin = year + '-' + (monthIndex + 1) + '-' + day + " " + checkinTime.getHours() + ":" + checkinTime.getMinutes() + ":" + checkinTime.getSeconds();

    var data = {
      "employee_id": this.employee_id,
      "action_datetime": checkin,
      "action": "check_in",
      "contract_id": this.contractID

    }

    var please_wait;
    this.translateService.get('PLEASE_WAIT').subscribe(
      value => {
        // value is our translated string
        please_wait = value;
      }
    )
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ' <img src="assets/imgs/loading.gif" /> <br>' + please_wait
    });

    loading.present();



    console.log(data)
    this.api.postRequest(`${Constants.INSERT_ATTENDECE}`, data).then((resp: any) => {
      console.log(resp)
      loading.dismiss();
      if (resp.success == 0) {
        this.getTodayAttendance();
        var record_updated;
        var success;
        this.translateService.get('RECORD_UPDATED').subscribe(
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

        // this.displaySimpleToast('success','Success',"Profile Updated SuccessFully",true)
      }
    })

  }


  diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
  }



  formatAMPM(dat, checkin?) {
    console.log(dat)
    var j = dat.split(' ');
    var hours = j[4].split(':')[0];
    var minutes = j[4].split(':')[1]

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    if (checkin == true) {
      this.delayTime = this.diff('9:00', (hours + ':' + minutes))
    }
    return strTime;
  }




  getTodayAttendance() {
    this.api.getRequest(`${Constants.TODAY_ATTENDANCE}` + this.employee_id).then((resp: any) => {
      console.log(resp)

      if (resp.length > 0 && resp !== undefined) {

        this.attendanceList = resp;
        for (let index = 0; index < this.attendanceList.length; index++) {
          if (this.attendanceList[index].action == "check_in") {
            var today = this.attendanceList[index].action_datetime.split(' ')


            this.todayDate = today[1] + ' ' + today[2] + ' ' + today[3]

            this.timeIn = this.formatAMPM(this.attendanceList[index].action_datetime, true);
          } else if (this.attendanceList[index].action == "check_out") {
            // this.todayDate = this.attendanceList[index].action_datetime
            this.timeout = this.formatAMPM(this.attendanceList[index].action_datetime);
          }

        }

        // this.displaySimpleToast('success','Success',"Profile Updated SuccessFully",true)
      }
    })
  }


  getAttendanceConfig() {

    // sat = 0
    // fri = 6

    // var findDayOfWeek = new Date().getDay()

    this.api.getRequest(`${Constants.GET_ATTENDANCE_CONFIG}` + this.employee_id + '&day=1').then((resp: any) => {
      console.log(resp)

      if (resp.length > 0 && resp !== undefined) {

        console.log(resp)

        // delay = (actual_checkin - config_time_in)


        // progress = ((hour_from - checkin_time) - (hour_to - hour_from)) * 100


      }
    })
  }






  checkoutAttendance() {
    var checkout = new Date();
    var day = checkout.getDate();
    var monthIndex = checkout.getMonth();
    var year = checkout.getFullYear();
    var time = checkout.getTime();
    var checkoutTime = year + '-' + (monthIndex + 1) + '-' + day + " " + checkout.getHours() + ":" + checkout.getMinutes() + ":" + checkout.getSeconds();

    var data = {
      "employee_id": this.employee_id,
      "action_datetime": checkoutTime,
      "action": "check_out",
      "contract_id": this.contractID

    }

    var please_wait;
    this.translateService.get('PLEASE_WAIT').subscribe(
      value => {
        // value is our translated string
        please_wait = value;
      }
    )
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ' <img src="assets/imgs/loading.gif" /> <br>' + please_wait
    });

    loading.present();



    console.log(data)
    this.api.postRequest(`${Constants.INSERT_ATTENDECE}`, data).then((resp: any) => {
      console.log(resp)
      loading.dismiss();
      if (resp.success == 0) {
        this.getTodayAttendance();

        var record_updated;
        var success;
        this.translateService.get('RECORD_UPDATED').subscribe(
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

        // this.displaySimpleToast('success','Success',"Profile Updated SuccessFully",true)
      }
    })

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
