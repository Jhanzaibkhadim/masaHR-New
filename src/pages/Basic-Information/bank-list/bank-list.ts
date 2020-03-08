import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { AddBankPage } from '../add-bank/add-bank';
import { GeneralProvider } from '../../../providers/general/general';
import { TranslateService } from '@ngx-translate/core';
import { MessageDialoguePage } from '../../message-dialogue/message-dialogue';
 
@Component({
  selector: 'page-bank-list',
  templateUrl: 'bank-list.html',
})
export class BankListPage {
  EmployeName: any;
  employee_id: any;
  bankList:any=[];
  partner_id:any;

  constructor(public modal:ModalController,public translateService: TranslateService,public toastCtrl:ToastController, public directionParam:GeneralProvider,public api:ApiProvider, public loadingCtrl:LoadingController,  public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getBankList(); 

    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        this.EmployeName = res.name;
        this.employee_id=res.employee_id;
        // this.getPartnerID();
       
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
  getPartnerID(){
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
    this.api.getRequest(`${Constants.GET_PARTNER_ID}`+this.employee_id).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined && data.length >0){
        console.log(data)
        
         this.partner_id = data[0].id
         this.getBankList(); 
      }else{
        var try_again;
          var error;
          this.translateService.get('TRY_AGAIN').subscribe(
            value => {
              // value is our translated string
              try_again = value;
            }
          )
          this.translateService.get('Error').subscribe(
            value => {
              // value is our translated string
              error = value;
            }
          )

          this.displaySimpleToast('error', error, try_again, false)
      }
    });

  }
  getBankList(){
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
    // +'&partner_bank_id=1'

    this.api.getRequest(`${Constants.GET_BANK_LIST}`).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        this.bankList=data;
        console.log(this.bankList)

      }
    });
  }

  addBank(obj){
    this.navCtrl.push(AddBankPage,obj)
  }


}
