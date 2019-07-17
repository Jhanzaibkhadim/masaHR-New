 
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
  selector: 'page-add-employee-experience',
  templateUrl: 'add-employee-experience.html',
})
export class AddEmployeeExperiencePage {

  employee_id: any;
  degreeList: any = [];
  showDegree: boolean;
  degreeName: string;
  degreeID: any;
  showspecialization: boolean;
  specializationName: any;
  specializationID: any;
  universityName: any;
  qualifiedYear: any;
  score: any;
  state: any;
  editable: boolean = true;
  monthShortNames: string[];
  userID: any;
  experienceID: any;

  JobTitle:any;






   
  constructor(public modal: ModalController, public translateService: TranslateService, public directionParam: GeneralProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {

    this.monthShortNames = ["Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"]

    this.getJOBS();
    this.getJobCategory();
    console.log(this.navParams.data)
    // this.BankIsEdit = this.navParams.data
    if (this.navParams.data == false) {
      this.editable = true;
    } else {
      this.editable = false
      this.experienceID = this.navParams.data.id;
      this.location = this.navParams.data.location
      this.EmployeeJobID = this.navParams.data.degree_id;
      this.EmployeeJobCategoryID = this.navParams.data.categ_id
      // var date_year = this.navParams.data.qualified_year.split(' ')
      var month = 0;
      // for (let index = 0; index < this.monthShortNames.length; index++) {
      //    if(this.monthShortNames[index] == date_year[1]){
      //     month=index+1;
      //    }
      // }
      // var dd = new Date(date_year[2] + '-' + date_year[1] + '-' + date_year[0]).toJSON().split('T')[0];;
      // month = dd.getMonth()+1;
      // this.qualifiedYear = dd;
 
      this.universityName = this.navParams.data.institute_id;
      this.specializationID = this.navParams.data.specialt_id;
      this.specializationName = this.navParams.data.special_name
      this.state = this.navParams.data.state
      this.degreeName = this.navParams.data.degree_name;
      this.employee_id = this.navParams.data.employee_id
      console.log(this.specializationName, this.navParams.data.qualified_year, this.qualifiedYear)
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeeExperiencePage');
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        // this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        this.userID = res.user_id;
        // this.getPartnerID();

      }
    })
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
      

        this.jobsList = data
         
        console.log(this.jobsList)

      }
    });
  }
  jobscategoryList: any = [];
  getJobCategory() {
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
    this.api.getRequest(`${Constants.READ_JOB_CATEGORY_LIST}`).then((data: any) => {
      console.log(data)
      loading.dismiss();
      if (data !== null && data !== undefined) {
       

        this.jobscategoryList = data
        
        console.log(this.jobscategoryList)

      }
    });
  }


  isJobShow: boolean = false;
  searchjobs() {
   
    this.isJobShow = true;
   
  }
  EmployeeJobID:any;
  EmployeeJobTitle:any;
  selectJob(objec) {
    this.EmployeeJobID = objec.id;
    this.JobTitle = objec.name;
    this.isJobShow = false;

  }

  isJobCategoryShow: boolean = false;
  searchjobsCategory() {
   
    this.isJobCategoryShow = true;
   
  }
  EmployeeJobCategoryID:any;
  EmployeeJobCategory:any;
  selectJobCategory(objec) {
    this.EmployeeJobCategoryID = objec.id;
    this.EmployeeJobCategory = objec.name;
    this.isJobCategoryShow = false;

  }
  location:any;
  fromDate:any;
  toDate:any;

  submit() {

    if (this.location.trim() !== '' && this.EmployeeJobCategoryID !== '' && this.employee_id !== '' && this.employee_id !== undefined && this.EmployeeJobID !== ''  && this.state !== '') {

      var data = 
        {
          "from_date": this.fromDate,
          "employee_id":this.employee_id,
          "categ_id": this.EmployeeJobCategoryID,
          "job_id": this.EmployeeJobID,
          "location": this.location,
          "state": this.state,
          "to_date": this.toDate,
          "user_id":this.userID
      }

 
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

      this.api.postRequest(`${Constants.CREATE_EXPERIENCE}`, data).then((data: any) => {
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
          this.navCtrl.pop();

          this.displaySimpleToast('success', success, record_added, false)
        }
      })
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

  updateExperience(){

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
