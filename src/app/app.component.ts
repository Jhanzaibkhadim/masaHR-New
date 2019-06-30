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
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { BasicInfoPage } from '../pages/Basic-Information/basic-info/basic-info';
import { BasicInfoListPage } from '../pages/Basic-Information/basic-info-list/basic-info-list';
import { OverviewPage } from '../pages/overview/overview';
import { TranslateService } from '@ngx-translate/core';
import { GeneralProvider } from '../providers/general/general';
import { Global } from '../../src/utils/Global';
import { Constants } from '../../src/utils/Constants';
import { ApiProvider } from '../../src/providers/api/api';
import { Storage } from '@ionic/storage';
import { AttendancePopupPage } from '../pages/attendance-popup/attendance-popup';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage
  // rootPage: any = TabsPage

  logoutbtn: boolean = false;

  pages: Array<{ title: string, component: any, img: any }>;
  menuSide: boolean = true;
  username: any;



  constructor(public localStore: Storage, public translationProvider: GeneralProvider, public translate: TranslateService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app: App) {
    this.initializeApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    this.changeLanguage(1)

    this.getLocalData()
    this.pages = [
      { title: 'DASHBOARD', component: TabsPage, img: "assets/imgs/SideMenu/dashboard.png" },
      { title: 'BASIC_INFORMATION', component: BasicInfoListPage, img: "assets/imgs/SideMenu/basic_info.png" },
      { title: 'CONTRACTS', component: ContractsListPage, img: "assets/imgs/SideMenu/contracts.png" },
      { title: 'OVERVIEW', component: OverviewPage, img: "assets/imgs/SideMenu/overview.png" },
      // { title: 'ATTENDANCE', component: AttendancePopupPage, img: "assets/imgs/SideMenu/attendace.svg" },
      { title: 'LEAVES', component: LeavesPage, img: "assets/imgs/SideMenu/job_termination@2x.png" },
      { title: 'MISSIONS', component: TabsPage, img: "assets/imgs/SideMenu/salaries_incentives.png" },
          { title: 'PERMISSIONS', component: TabsPage, img: "assets/imgs/SideMenu/hr_procedures@2x.png" },

      // { title: 'HR_PROCEDURES', component: HrProceduresListPage, img: "assets/imgs/SideMenu/hr_procedures.png" },
      // { title: 'SALARIES_AND_INCENTIVES', component: SalariesAndIncentiveListPage, img: "assets/imgs/SideMenu/salaries_incentives.png" },
      // { title: 'LOANS', component: LoansListPage, img: "assets/imgs/SideMenu/loans.png" },
      // { title: 'JOB_TERMINATION', component: JobTerminationListingPage, img: "assets/imgs/SideMenu/job_termination.png" },
      // { title: 'ADMIN_COMM', component: AdminComumnicationsPage, img: "assets/imgs/SideMenu/admin_communications.png" },
      { title: 'ABOUT', component: TabsPage, img: "assets/imgs/SideMenu/about.png" },
    ];


  }

  getLocalData() {
    this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
      console.log(res, "ye hey local")
      if (res !== null && res !== undefined) {
        this.username = res.name;
      }
    })
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

    // DASHBOARD
    // BASIC_INFORMATION
    // console.log(page)
    // if (page.title !== "DASHBOARD" && page.title !== "BASIC_INFORMATION") {
    //   console.log("here")
    //   let elem = <HTMLElement>document.querySelector(".tabbar");
    //   console.log(elem)

    //   if (elem != null) {
    //     elem.style.display = 'flex';
    //   }
    // }

    this.app.getActiveNav().setRoot(page.component);
    // this.nav.setRoot(TabsPage);
    // this.nav.push(page.component);
  }


  changeLanguage(id) {
    if (id == 1) {
      this.menuSide = true;
      // let element: HTMLElement = document.getElementById("sidemenu");
      // console.log(element)

      // if(element !== null){
      //   element.setAttribute("ng-reflect-side", "left");
      //   element.setAttribute("side", "left");


      // }
      this.translationProvider.direction = "left"
      this.platform.setDir("ltr", true)
      this.translate.setDefaultLang('en');
    } else if (id == 2) {
      this.menuSide = false;
      this.translationProvider.direction = "right"

      // let element: HTMLElement = document.getElementById("sidemenu");
      // console.log(element)
      // if(element !== null){
      //   element.setAttribute("ng-reflect-side", "right");
      //   element.setAttribute("side", "right");


      // }
      this.platform.setDir("rtl", true)
      this.translate.setDefaultLang('ar');

    }
    console.log(this.platform.dir())
    if (this.platform.dir() == 'rtl') {
      this.logoutbtn = true;
    }
    else {
      this.logoutbtn = false;
    }
  }

  loguot() {
    this.localStore.clear().then(() => {
      this.nav.setRoot(LoginPage)
    })
  }
}
