import { SalariesAndIncentiveListPage } from './../pages/salaries-and-incentive-list/salaries-and-incentive-list';
import { LoansListPage } from './../pages/loans-list/loans-list';
import { HrProceduresListPage } from './../pages/hr-procedures-list/hr-procedures-list';
import { JobTerminationListingPage } from './../pages/job-termination-listing/job-termination-listing';
import { ContractsListPage } from './../pages/contracts-list/contracts-list';
import { BasicInfoListPage } from './../pages/basic-info-list/basic-info-list';
import { AdminComumnicationsPage } from './../pages/admin-comumnications/admin-comumnications';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { BasicInfoPage } from '../pages/basic-info/basic-info';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    BasicInfoPage,
    DashboardPage,
    AdminComumnicationsPage,
    BasicInfoListPage,
    ContractsListPage,
    JobTerminationListingPage,
    HrProceduresListPage,
    LoansListPage,
    SalariesAndIncentiveListPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DashboardPage,
    AdminComumnicationsPage,
    BasicInfoPage,
    BasicInfoListPage,
    ContractsListPage,
    JobTerminationListingPage,
    HrProceduresListPage,
    LoansListPage,
    SalariesAndIncentiveListPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
