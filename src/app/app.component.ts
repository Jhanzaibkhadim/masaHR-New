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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'DashBoard', component: DashboardPage },
      { title: 'Admin Communications', component: AdminComumnicationsPage },
      { title: 'Basic Information', component: BasicInfoListPage },
      { title: 'Contracts List', component: ContractsListPage },
      { title: 'Job Termination', component: JobTerminationListingPage },
      { title: 'HR Procedures', component: HrProceduresListPage },
      { title: 'Loans ', component: LoansListPage },
      { title: 'Salaries and Incentives ', component: SalariesAndIncentiveListPage },
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
