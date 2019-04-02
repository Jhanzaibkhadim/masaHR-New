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
  degreeList: any=[];

  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams,public localStore:Storage,public api:ApiProvider,) {

    console.log(this.navParams.data)
    // this.BankIsEdit = this.navParams.data
    // if(this.navParams.data == true){
    //   this.hideEditbtn = true;
    // }
  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        // this.EmployeName = res.name;
        this.employee_id=res.employee_id;
      // this.getPartnerID();
 
      }
    })
    console.log('ionViewDidLoad addbank');
    this.readDegree();
    
  }

  readDegree(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api.getRequest(`${Constants.READ_DEGREES_LIST}`).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        console.log(data)
        this.degreeList=data;
        console.log(this.degreeList)

      }
    });
  }

}
