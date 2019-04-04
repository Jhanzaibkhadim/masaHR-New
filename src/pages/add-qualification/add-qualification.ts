import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-qualification',
  templateUrl: 'add-qualification.html',
})
export class AddQualificationPage {
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


  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {

    console.log(this.navParams.data)
    // this.BankIsEdit = this.navParams.data
    // if(this.navParams.data == true){
    //   this.hideEditbtn = true;
    // }
  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        // this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        // this.getPartnerID();

      }
    })
    console.log('ionViewDidLoad addbank');
    this.readDegree();
    this.readspecialization();
  }

  readDegree() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.api.getRequest(`${Constants.READ_DEGREES_LIST}`).then((data: any) => {
      loading.dismiss()
      console.log(data)

      if (data !== null && data !== undefined) {
        // console.log(data)
        this.degreeList = data;
        console.log(this.degreeList)

      }
    });
  }



  selectDegree(obj) {
    this.showDegree = false
    this.degreeID = obj.id;
    this.degreeName = obj.name

  }
  searchDegree() {
    if (this.degreeName == "") {
      this.showDegree = true;
    } else {
      this.showDegree = false;
    }
  }


  specializationList: any[];


  // For Specialization


  readspecialization() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.api.getRequest(`${Constants.READ_SPECIALIST_LIST}`).then((data: any) => {
      loading.dismiss()
      console.log(data)

      if (data !== null && data !== undefined) {
        // console.log(data)
        this.specializationList = data;
        console.log(this.specializationList)

      }
    });
  }


  selectspecialization(obj) {
    this.showspecialization = false
    this.specializationID = obj.id;
    this.specializationName = obj.name

  }
  searchspecialization() {
    if (this.specializationName == "") {
      this.showspecialization = true;
    } else {
      this.showspecialization = false;
    }
  }

  submit() {

    if (this.degreeName !== '' && this.specializationID !== '') {

      var data = {
        degree_id: this.degreeID,
        employee_id: this.employee_id,
        institute_id: "النيلين",
        qualified_year: this.qualifiedYear,
        score: this.score,
        special_name: this.specializationName,
        specialt_id: this.specializationID,
        state: this.state,
        user_id: 1
      }

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.api.postRequest(`${Constants.INSERT_EMPLOYEE_QUALIFICATION}`,data).then((data: any) => {
        loading.dismiss()
        console.log(data)

        if (data !== null && data !== undefined) {
          console.log(data)
        }
      })
    }
  }

}
