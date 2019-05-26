import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { AddBankPage } from '../add-bank/add-bank';
import { GeneralProvider } from '../../../providers/general/general';
 
 
@Component({
  selector: 'page-lost-employee-skills',
  templateUrl: 'lost-employee-skills.html',
})
export class LostEmployeeSkillsPage {

  employee_id: any;

  constructor(public directionParam:GeneralProvider,public api:ApiProvider, public loadingCtrl:LoadingController,  public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        // this.EmployeName = res.name;
        this.employee_id=res.employee_id;
        this.getlostSkillList(); 
      }
    })
    
    
  }
  lostSkillList:any=[];
  getlostSkillList(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.api.getRequest(`${Constants.LOST_EMPLOYEE_SKILL_LIST}`+this.employee_id).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        this.lostSkillList=data;
        console.log(this.lostSkillList)

      }
    });
  }


}
