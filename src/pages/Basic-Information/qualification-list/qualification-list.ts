import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
import { AddQualificationPage } from '../add-qualification/add-qualification';

 
@Component({
  selector: 'page-qualification-list',
  templateUrl: 'qualification-list.html',
})
export class QualificationListPage {
  employee_id: any;
  degreeList: any;

  constructor(public api:ApiProvider, public loadingCtrl:LoadingController,  public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.readDegree();
    
    
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
  ionViewWillEnter(){
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        // this.EmployeName = res.name;
        this.employee_id=res.employee_id;
        this.readDegree();
        this.getqualificationList(); 
      }
    })
  }
  qualificationList:any=[];
  getqualificationList(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.api.getRequest(`${Constants.EMPLOYEE_QUALIFICATION_LIST}`+this.employee_id).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined){
        for(var k =0;k<data.length;k++){
          var dt = data[k].qualified_year.split(' ');
          data[k].qualified_year = dt[1]+' '+ dt[2]+' '+dt[3];
          data[k].degreeName = this.getDegreeNme(data[k].degree_id)
        }
         
        this.qualificationList=data;
        console.log(this.qualificationList)

      }
    });
  }
  getDegreeNme(id){
    for(var k =0;k<this.degreeList.length;k++){
       if(this.degreeList[k].id === id){
         return this.degreeList[k].name;
       }else{
         return 0;
       }
      
    }
  }
  datecheck(date){
    var split_date = date.split(' ');

  }
  addqualification(){
    var data = false
    this.navCtrl.push(AddQualificationPage,data)
  }

  editQualification(data){
    this.navCtrl.push(AddQualificationPage,data)
  }
}
