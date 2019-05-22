import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { AddBankPage } from '../add-bank/add-bank';
 
@Component({
  selector: 'page-bank-list',
  templateUrl: 'bank-list.html',
})
export class BankListPage {
  EmployeName: any;
  employee_id: any;
  bankList:any=[];
  partner_id:any;

  constructor(public api:ApiProvider, public loadingCtrl:LoadingController,  public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
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
         this.getBankList(); 
      }
    });

  }
  getBankList(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.api.getRequest(`${Constants.GET_BANK_LIST}`+this.employee_id+'&partner_bank_id=1').then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        this.bankList=data;
        console.log(this.bankList)

      }
    });
  }

  addBank(){
    this.navCtrl.push(AddBankPage,true)
  }


}
