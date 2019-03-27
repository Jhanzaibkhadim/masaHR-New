import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html',
})
export class AddBankPage {
  EmployeName: any;
  employee_id: any;
  banksList: any=[];
  bankName: string;
  showBank: boolean;
  bankID: any;
  bankStatus: string;
  accountNumber: string;
  partner_id: any;

  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams,public localStore:Storage,public api:ApiProvider,) {

  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        this.EmployeName = res.name;
        this.employee_id=res.employee_id;
      this.getPartnerID();
 
      }
    })
    console.log('ionViewDidLoad BasicInfoPage');
    this.readBanks();
    
  }

  readBanks(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api.getRequest(`${Constants.READ_BANKS}`).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        console.log(data)
        this.banksList=data;
        console.log(this.banksList)

      }
    });
  }

  getPartnerID(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.api.getRequest(`${Constants.GET_PARTNER_ID}`+this.employee_id).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        console.log(data)
        
         this.partner_id = data[0].id

      }
    });

  }
  selectbank(obj){
    this.showBank = false
    this.bankID=obj.id;
    this.bankName = obj.name

  }
  searchbanks(){
    if(this.bankName == ''){
      this.showBank = true
    }else{
      this.showBank = false
    }
  }

  createBank(){
    if(this.bankID !== '' || this.accountNumber !== '' || this.bankStatus !== ''){
      
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      var data ={
        // employee_id:this.employee_id,
        bank_id:this.bankID,
        // bank_name:this.bankName,
        active:this.bankStatus,
        partner_id: this.partner_id,
        acc_number:this.accountNumber
      }
      console.log(data)
      loading.present();
      this.api.postRequest(`${Constants.CREATE_BANK}`,data).then ((data:any) =>{
        loading.dismiss()
        console.log(data)
  
        if(data !== null && data !== undefined){
          console.log(data)
          this.banksList=data;
          console.log(this.banksList)
  
        }
      });
    }
    else{
      alert("Please provide all details")
    }
  }
}
