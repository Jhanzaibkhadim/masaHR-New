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
  bankName: string='';
  showBank: boolean;
  bankID: any='';
  bankStatus: string='';
  accountNumber: string='';
  partner_id: any='';
  BankIsEdit:boolean = false;
  hideEditbtn:boolean = false
  constructor(public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams,public localStore:Storage,public api:ApiProvider,) {

    console.log(this.navParams.data)
    this.BankIsEdit = this.navParams.data
    if(this.navParams.data == true){
      this.hideEditbtn = true;
    }
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
    console.log('ionViewDidLoad addbank');
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
        employee_id:this.employee_id,
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
          this.displaySimpleToast("Bank added");
          this.navCtrl.pop();

          // this.banksList=data;
          // console.log(this.banksList)
  
        }
      });
    }
    else{
      this.displaySimpleToast("Please provide all details")
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
    if(this.bankID == '' || this.accountNumber == '' || this.bankStatus == ''){
      
       this.displaySimpleToast("Please Fill all the Fields")
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.BankIsEdit = false;

      var temp = 
        {
          // employee_id:this.employee_id,
          bank_id:this.bankID,
          // bank_name:this.bankName,
          active:this.bankStatus,
          partner_id: this.partner_id,
          acc_number:this.accountNumber
        }

       
      console.log(temp)
      this.api.postRequest(`${Constants.UPDATE_BANK}`, temp).then((resp: any) => {
        console.log(resp)
        loading.dismiss();
        if (resp.success == 0) {
          this.displaySimpleToast("Bank Updated SuccessFully");
          this.navCtrl.pop();
        }
      })

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
}
