import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../utils/Global';
import { Constants } from '../../utils/Constants';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-basic-info',
  templateUrl: 'basic-info.html',
})
export class BasicInfoPage {

  EmployeName:any;
  EmployeCode:any;
  EmployeNumber:any;
  EmployeEmail:any;
  EmployeDepartment:any;
  typee:any;
  employee_id:any;
  EmployeeGender:any;
  // (ionChange)="checktype()"
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStore:Storage,public api:ApiProvider,) {

  }


  ionViewDidLoad() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        this.EmployeName = res.name;
        this.employee_id=res.employee_id;
        this.getBasicInfo(); 
      }
    })
    console.log('ionViewDidLoad BasicInfoPage');
  }
  getBasicInfo(){
    this.api.getRequest(`${Constants.GET_BASIC_INFO}`+this.employee_id).then ((data:any) =>{
      if(data[0] !== null && data[0] !== undefined){
      console.log(data,'basic infoooo');

        this.EmployeName = data[0].name;
        this.EmployeCode = data[0].emp_code;
        this.EmployeNumber = data[0].mobile_phone;
        this.EmployeEmail = data[0].work_email;
        this.EmployeDepartment = data[0].department_name;
        this.EmployeeGender = data[0].gender;
        console.log(this.EmployeDepartment)
      }
    })
  }
   

}
