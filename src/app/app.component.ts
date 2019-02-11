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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage

  pages: Array<{ title: string, component: any, img: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, img: "assets/imgs/SideMenu/dashboard.png" },
      { title: 'Leaves', component: LeavesPage, img: "assets/imgs/SideMenu/about.png" },
      { title: 'Overview ', component: OverviewPage, img: "assets/imgs/SideMenu/overview.png" },
      { title: 'Basic Information', component: BasicInfoListPage, img: "assets/imgs/SideMenu/basic_info.png" },
      { title: 'Contracts ', component: ContractsListPage, img: "assets/imgs/SideMenu/contracts.png" },
      { title: 'HR Procedures ', component: HrProceduresListPage, img: "assets/imgs/SideMenu/hr_procedures.png" },
      { title: 'Salaries and Incentives ', component: SalariesAndIncentiveListPage, img: "assets/imgs/SideMenu/salaries_incentives.png" },
      { title: 'Loans ', component: LoansListPage, img: "assets/imgs/SideMenu/loans.png" },
      { title: 'Job Termination   ', component: JobTerminationListingPage, img: "assets/imgs/SideMenu/job_termination.png" },
      { title: 'Admin Communications   ', component: AdminComumnicationsPage, img: "assets/imgs/SideMenu/admin_communications.png" },
      { title: 'About', component: DashboardPage, img: "assets/imgs/SideMenu/about.png" },
    ];

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
}
