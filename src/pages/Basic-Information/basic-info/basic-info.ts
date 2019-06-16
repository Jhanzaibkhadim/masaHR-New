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
  employee_id: any;
  EmployeeGender: any;
  EmployeeJobTitle: any;
  EmployeeJobID: any;
  // (ionChange)="checktype()"
  constructor(public translateService: TranslateService, public directionParam: GeneralProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public modal: ModalController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {
    this.displaySimpleToast('cancel','Success',"Profile Updated SuccessFully",true)

  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
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
    this.api.getRequest(`${Constants.GET_BASIC_INFO}` + this.employee_id).then((data: any) => {
      loading.dismiss();
      if (data[0] !== null && data[0] !== undefined) {
        console.log(data, 'basic infoooo');

        this.EmployeName = data[0].name;
        this.EmployeCode = data[0].emp_code;
        this.EmployeNumber = data[0].mobile_phone;
        this.EmployeEmail = data[0].work_email;
        this.EmployeDepartment = data[0].department_name;
        this.EmployeeGender = data[0].gender;
        this.EmployeeJobTitle = data[0].job_name;
        this.EmployeeJobID = data[0].job_id;
        this.EmployeDepartmentID = data[0].department_id;
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
        job_join_date: "2018-07-11",
        employee_id: this.employee_id,
        user_id: 1,

      }
      console.log(temp)
      this.api.postRequest(`${Constants.UPDATE_PROFILE}`, temp).then((resp: any) => {
        console.log(resp)
        loading.dismiss();
        if (resp.success == 0) {
          this.displaySimpleToast('success','Success',"Profile Updated SuccessFully",true)
        }
      })

    }
  }

  displaySimpleToast(icon, messageTitle, messageText, button) {

    // var toast = this.toastCtrl.create({
    //   message: msg,
    //   duration: 2000,
    //   position: 'bottom',
    // })
    // toast.present();


    var addSuccess = {
      icon: `assets/imgs/${icon}.svg`,
      title: messageTitle,
      message: messageText,
      yesButtonText: 'OK',
      noButtonText: 'NO',
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

