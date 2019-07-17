import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

 

 
@Component({
  selector: 'page-message-dialogue',
  templateUrl: 'message-dialogue.html',
})
export class MessageDialoguePage {

  yesButtonText = "";
  noButtonText = "";
  alertTitle:String = "";
  alertMessage: String = "";
  icon:String = '';
  buttonshow:boolean = false;
  alertDialog:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    
    
    this.alertDialog = navParams.get('data');
    console.log( this.alertDialog)
    this.icon = this.alertDialog.icon;
    this.alertTitle = this.alertDialog.title;
    this.alertMessage = this.alertDialog.message;
    this.yesButtonText = this.alertDialog.yesButtonText;
    this.noButtonText = this.alertDialog.noButtonText;
    this.buttonshow = this.alertDialog.singleButton;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDialoguePage');
     
  }

  clickYes(){
    this.viewCtrl.dismiss(1);
  }

  clickNo(){
    this.viewCtrl.dismiss(0);
  }


  
}
