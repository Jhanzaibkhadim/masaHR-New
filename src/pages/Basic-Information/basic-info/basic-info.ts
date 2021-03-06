import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Global } from '../../../utils/Global';
import { Constants } from '../../../utils/Constants';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { GeneralProvider } from '../../../providers/general/general';
import { MessageDialoguePage } from '../../message-dialogue/message-dialogue';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-basic-info',
  templateUrl: 'basic-info.html',
})
export class BasicInfoPage {

  EmployeName: any;
  EmployeCode: any;
  EmployeNumber: any;
  EmployeEmail: any;
  EmployeDepartment: any;
  EmployeDepartmentID: any;
  typee: any;
  userInfo:any;
  employee_id: any;
  EmployeeGender: any;
  EmployeeJobTitle: any;
  EmployeeJobID: any;
  // (ionChange)="checktype()"
  constructor(public translateService: TranslateService, public directionParam: GeneralProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public modal: ModalController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {


  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.userInfo = res;
        this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        this.getBasicInfo();
      }
    })
    // console.log('ionViewDidLoad BasicInfoPage');
    this.getJOBS();
    this.getDepartments();
  }
  departmentsList: any = [];
  getDepartments() {
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
    this.api.getRequest(`${Constants.GET_DEPARTMENTS}`).then((data: any) => {
      loading.dismiss()
      if (data !== null && data !== undefined) {
        console.log(data)
        this.departmentsList = data;
        console.log(this.departmentsList)

      }
    });
  }

  jobsList: any = [];
  getJOBS() {
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
    this.api.getRequest(`${Constants.GET_JOBS}`).then((data: any) => {
      console.log(data)
      loading.dismiss();
      if (data !== null && data !== undefined) {
        // var list = [];
        // list.push(data);
        // console.log(list.length)
        // if (list.length > 1) {

        this.jobsList = data
        // }
        // else if (list.length == 1) {

        //   this.jobsList.push(data)
        // }
        console.log(this.jobsList)

      }
    });
  }
  job_join_date:any;
  getBasicInfo() {
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
    this.api.getRequest(Constants.GET_BASIC_INFO).then((data: any) => {
      loading.dismiss();
      console.log(data, 'basic infoooo');

      if (data) {
        this.job_join_date = data.job_join_date
        this.EmployeName = data.name;
        this.EmployeCode = data.emp_code;
        this.EmployeNumber = data.mobile_phone;
        this.EmployeEmail = data.work_email;
        this.EmployeDepartment = data.department_name;
        this.EmployeeGender = data.gender;
        this.EmployeeJobTitle = data.job_name;
        this.EmployeeJobID = data.job_id;
        this.EmployeDepartmentID = data.department_id;
        console.log(this.EmployeDepartment)
      }
    })
  }
  isDepartShow: boolean = false;



  searchDepartments() {
    // if (this.EmployeDepartment == '') {
    this.isDepartShow = true;
    // } else {
    //   this.isDepartShow = false;

    // }
  }
  selectDeparment(obj) {
    this.EmployeDepartment = obj.name;
    this.EmployeDepartmentID = obj.id;
    this.isDepartShow = false
  }


  isJobShow: boolean = false;
  searchjobs() {
    // if (this.EmployeeJobTitle == '') {
    this.isJobShow = true;
    // } else {
    //   this.isJobShow = false;

    // }
  }
  selectJob(objec) {
    this.EmployeeJobID = objec.id;
    this.EmployeeJobTitle = objec.name;
    this.isJobShow = false;

  }


  // Edit profile /update

  cancel() {
    this.isJobShow = false;
    this.isDepartShow = false;
    this.InfoIsEdit = false;
  }
  InfoIsEdit: boolean = false;
  EditInfo() {
    this.InfoIsEdit = true;
  }
  updateProfile() {
    if (this.EmployeCode == '' || this.EmployeeJobTitle == '' || this.EmployeName == '' || this.EmployeNumber == '' || this.EmployeDepartment == '' || this.EmployeEmail == '' || this.EmployeeGender == '') {
      // this.displaySimpleToast("Please Fill all the Fields")
    } else {
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

      this.InfoIsEdit = false;

      var temp = {
        name: this.EmployeName,
        emp_code: this.EmployeCode,
        mobile_phone: this.EmployeNumber,
        work_email: this.EmployeEmail,
        department_name: this.EmployeDepartment,
        gender: this.EmployeeGender,
        job_name: this.EmployeeJobTitle,
        job_id: this.EmployeeJobID,
        department_id: this.EmployeDepartmentID,
        job_join_date:this.job_join_date,
        employee_id: this.employee_id,
        user_id: this.userInfo.user_id,

      }
      console.log(temp)
      this.api.postRequest(`${Constants.UPDATE_PROFILE}`, temp).then((resp: any) => {
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

          // this.displaySimpleToast('success','Success',"Profile Updated SuccessFully",true)
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

