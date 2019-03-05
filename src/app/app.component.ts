import { LeavesPage } from './../pages/leaves/leaves';
import { TabsPage } from './../pages/tabs/tabs';
import { SalariesAndIncentiveListPage } from './../pages/salaries-and-incentive-list/salaries-and-incentive-list';
import { LoansListPage } from './../pages/loans-list/loans-list';
import { HrProceduresListPage } from './../pages/hr-procedures-list/hr-procedures-list';
import { JobTerminationListingPage } from './../pages/job-termination-listing/job-termination-listing';
import { ContractsListPage } from './../pages/contracts-list/contracts-list';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { AdminComumnicationsPage } from './../pages/admin-comumnications/admin-comumnications';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { BasicInfoPage } from '../pages/basic-info/basic-info';
import { BasicInfoListPage } from '../pages/basic-info-list/basic-info-list';
import { OverviewPage } from '../pages/overview/overview';
import { TranslateService } from '@ngx-translate/core';
import { GeneralProvider } from '../providers/general/general';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage

  logoutbtn:boolean=false;
  dashboard:any;
  pages: Array<{ title: string, component: any, img: any }>;
  about: any;
  job_term: any;
  loans: any;
  hrpro: any;
  overview: any;
  contracts: any;
  basic_info: any;
  admin: any;
  salaries: any;
  leaves: any;

  constructor(public translationProvider:GeneralProvider, public translate: TranslateService,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
     
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('ar');
     
      this.changeLanguage(2)
      // if(this.translate.currentLang == 'ar'){

      // }
       
      
     
    // used for an example of ngFor and navigation
    this.getTranslatedString();
    this.pages = [
      { title: this.dashboard, component: DashboardPage, img: "assets/imgs/SideMenu/dashboard.png" },
      { title: this.leaves, component: LeavesPage, img: "assets/imgs/SideMenu/about.png" },
      { title: this.overview, component: OverviewPage, img: "assets/imgs/SideMenu/overview.png" },
      { title:  this.basic_info, component: BasicInfoListPage, img: "assets/imgs/SideMenu/basic_info.png" },
      { title: this.contracts, component: ContractsListPage, img: "assets/imgs/SideMenu/contracts.png" },
      { title: this.hrpro, component: HrProceduresListPage, img: "assets/imgs/SideMenu/hr_procedures.png" },
      { title: this.salaries, component: SalariesAndIncentiveListPage, img: "assets/imgs/SideMenu/salaries_incentives.png" },
      { title: this.loans, component: LoansListPage, img: "assets/imgs/SideMenu/loans.png" },
      { title: this.job_term, component: JobTerminationListingPage, img: "assets/imgs/SideMenu/job_termination.png" },
      { title: this.admin, component: AdminComumnicationsPage, img: "assets/imgs/SideMenu/admin_communications.png" },
      { title: this.about, component: DashboardPage, img: "assets/imgs/SideMenu/about.png" },
    ];


  }

  getTranslatedString( ){
    this.translationProvider.GetTranslatedString("DASHBOARD").then((res: any) => {
       
      this.dashboard = res;
    });
    this.translationProvider.GetTranslatedString("LEAVES").then((res: any) => {
       
      this.leaves = res;
    });
    this.translationProvider.GetTranslatedString("SALARIES_AND_INCENTIVES").then((res: any) => {
       
      this.salaries = res;
    });
    this.translationProvider.GetTranslatedString("ADMIN_COMM").then((res: any) => {
       
      this.admin = res;
    });
    this.translationProvider.GetTranslatedString("BASIC_INFORMATION").then((res: any) => {
       
      this.basic_info = res;
    });
    this.translationProvider.GetTranslatedString("CONTRACTS").then((res: any) => {
       
      this.contracts = res;
    });
    this.translationProvider.GetTranslatedString("OVERVIEW").then((res: any) => {
       
      this.overview = res;
    });
    this.translationProvider.GetTranslatedString("HR_PROCEDURES").then((res: any) => {
       
      this.hrpro = res;
    });
    this.translationProvider.GetTranslatedString("LOANS").then((res: any) => {
       
      this.loans = res;
    });
    this.translationProvider.GetTranslatedString("JOB_TERMINATION").then((res: any) => {
       
      this.job_term = res;
    });
    this.translationProvider.GetTranslatedString("ABOUT").then((res: any) => {
       
      this.about = res;
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  changeLanguage(id){
    if(id ==1){
      this.platform.setDir("ltr",true)
      this.translate.setDefaultLang('en');
    }else if(id == 2){
      this.platform.setDir("rtl",true)
      this.translate.setDefaultLang('ar');
      
    }
    console.log(this.platform.dir())
    if(this.platform.dir() == 'rtl'){
      this.logoutbtn = true;
    }
    else{
      this.logoutbtn = false;
    }
  }
}
