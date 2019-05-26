import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Global } from '../../../utils/Global';
import { Constants } from '../../../utils/Constants';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from '@ionic/storage';
import { GeneralProvider } from '../../../providers/general/general';

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
  editable:boolean=true;
  monthShortNames: string[];
  userID: any;
  qualifId: any;

  constructor(public directionParam:GeneralProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public localStore: Storage, public api: ApiProvider, ) {

    this.monthShortNames=["Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"]
    console.log(this.navParams.data)
    // this.BankIsEdit = this.navParams.data
    if(this.navParams.data == false){
      this.editable = true;
    }else{
      this.editable=false
      this.qualifId=this.navParams.data.id;
      this.score = this.navParams.data.score;
      this.degreeID = this.navParams.data.degree_id;
      var date_year = this.navParams.data.qualified_year.split(' ')
      var month=0;
      // for (let index = 0; index < this.monthShortNames.length; index++) {
      //    if(this.monthShortNames[index] == date_year[1]){
      //     month=index+1;
      //    }
      // }
      var dd = new Date(date_year[2]+'-'+date_year[1]+'-'+date_year[0]).toJSON().split('T')[0];;
      // month = dd.getMonth()+1;
      this.qualifiedYear =  dd;

      // this.qualifiedYear =  date_year[2]+'-'+month+'-'+date_year[0]
      //  new Date(date_year[2]+'-'+date_year[1]+'-'+date_year[0]);
      this.universityName =  this.navParams.data.institute_id;
      this.specializationID =  this.navParams.data.specialt_id;
      this.specializationName =  this.navParams.data.special_name
      this.state = this.navParams.data.state
      this.degreeName = this.navParams.data.degreeName;
      this.employee_id = this.navParams.data.employee_id
      console.log(this.specializationName,this.navParams.data.qualified_year,this.qualifiedYear)
    }
  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        // this.EmployeName = res.name;
        this.employee_id = res.employee_id;
        this.userID= res.user_id;
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
    // if (this.degreeName == "") {
      this.showDegree = true;
    // } else {
    //   this.showDegree = false;
    // }
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
    // if (this.specializationName == "") {
      this.showspecialization = true;
    // } else {
    //   this.showspecialization = false;
    // }
  }

  submit() {

    if (this.degreeName.trim() !== '' && this.specializationID !== '' && this.employee_id !== '' && this.qualifiedYear !== '' && this.score !== '' && this.state !== '') {

      var data = {
        degree_id: this.degreeID,
        employee_id: this.employee_id,
        institute_id: "النيلين",
        qualified_year: this.qualifiedYear,
        score: this.score,
        special_name: this.specializationName,
        specialt_id: this.specializationID,
        state: this.state,
        user_id:  this.userID
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
    else{
      this.displaySimpleToast("Please Provide all details")
    }
  }

  
  displaySimpleToast(msg) {

    var toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    })
    toast.present();
  }


  updateQualificationInfo(){
    if (this.degreeName.trim() !== '' && this.specializationID !== '' && this.employee_id !== '' && this.qualifiedYear !== '' && this.score !== '' && this.state !== '') {

      var data = {
        degree_id: this.degreeID,
        id:this.qualifId,
        employee_id: this.employee_id,
        institute_id: this.universityName,
        qualified_year: this.qualifiedYear,
        score: this.score,
        special_name: this.specializationName,
        specialt_id: this.specializationID,
        state: this.state,
        user_id:  this.userID
      }
      console.log(data)
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.api.postRequest(`${Constants.UPDATE_EMPLOYEE_QUALIFICATION}`,data).then((data: any) => {
        loading.dismiss()
        console.log(data)

        if (data !== null && data !== undefined) {
          console.log(data)
        }
      })
    }
    else{
      this.displaySimpleToast("Please Provide all details")
    }

  }
}
