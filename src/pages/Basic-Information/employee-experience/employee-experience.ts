import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Constants } from '../../../utils/Constants';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';
// import { AddExperiencePage } from '../add-qualification/add-qualification';
import { GeneralProvider } from '../../../providers/general/general';
import { AddEmployeeExperiencePage } from '../add-employee-experience/add-employee-experience';

@Component({
  selector: 'page-employee-experience',
  templateUrl: 'employee-experience.html',
})
export class EmployeeExperiencePage {
  employee_id: any;
  degreeList: any;

  constructor(public directionParam:GeneralProvider,public api:ApiProvider, public loadingCtrl:LoadingController,  public localStore:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeExperiencePage');
  }

  ionViewWillEnter(){
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res)=>{
      console.log(res,"ye hey local")
      if(res !== null && res !== undefined){
        // this.EmployeName = res.name;
        this.employee_id=res.employee_id;
        // this.readDegree();
        this.getexperienceList(); 
      }
    })
  }
  experienceList:any=[];
  getexperienceList(){
     let loading = this.loadingCtrl.create({
        spinner:'hide',
        content: ' <img src="assets/imgs/loading.gif" />'
  
      });
  
    loading.present();

    this.api.getRequest(`${Constants.GET_EXPERIENCE}`+this.employee_id).then ((data:any) =>{
      loading.dismiss()
      console.log(data)

      if(data !== null && data !== undefined && data.error == undefined){
        // for(var k =0;k<data.length;k++){
        //   var dt = data[k].qualified_year.split(' ');
        //   data[k].qualified_year = dt[1]+' '+ dt[2]+' '+dt[3];
        //   data[k].degreeName = this.getDegreeNme(data[k].degree_id)
        // }
         
        this.experienceList=data;
        console.log(this.experienceList)

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


  addexperience(){
    this.navCtrl.push(AddEmployeeExperiencePage)
  }

}
