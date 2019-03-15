import { AddLeavePage } from './../pages/add-leave/add-leave';
import { LeaveDetailsPage } from './../pages/leave-details/leave-details';
import { LeavesPage } from './../pages/leaves/leaves';
import { TabsPage } from './../pages/tabs/tabs';
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
import { OverviewPage } from '../pages/overview/overview';



import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http} from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GeneralProvider } from '../providers/general/general';
import {   Headers, RequestOptions } from '@angular/http';
import { ApiProvider } from '../providers/api/api';
import { IonicStorageModule } from '@ionic/storage';

// import { HTTP } from "@ionic-native/http";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
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
    SalariesAndIncentiveListPage,
    OverviewPage,
    TabsPage,
    LeavesPage,
    LeaveDetailsPage,
    AddLeavePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
           provide: TranslateLoader,
           useFactory: (createTranslateLoader),
           deps: [HttpClient]
         }
      })
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
    SalariesAndIncentiveListPage,
    OverviewPage,
    TabsPage,
    LeavesPage,
    LeaveDetailsPage,
    AddLeavePage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    HttpModule,
    Http,
   
    HttpClientModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GeneralProvider,
    ApiProvider
  ]
})
export class AppModule { }
