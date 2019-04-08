import { AddLeavePage } from './../pages/add-leave/add-leave';
import { LeaveDetailsPage } from './../pages/leave-details/leave-details';
import { LeavesPage } from './../pages/leaves/leaves';
import { TabsPage } from './../pages/tabs/tabs';
import { SalariesAndIncentiveListPage } from './../pages/salaries-and-incentive-list/salaries-and-incentive-list';
import { LoansListPage } from './../pages/loans-list/loans-list';
import { HrProceduresListPage } from './../pages/hr-procedures-list/hr-procedures-list';
import { JobTerminationListingPage } from './../pages/job-termination-listing/job-termination-listing';
import { ContractsListPage } from './../pages/contracts-list/contracts-list';
import { BasicInfoListPage } from './../pages/Basic-Information/basic-info-list/basic-info-list';

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
import { OverviewPage } from '../pages/overview/overview';



import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GeneralProvider } from '../providers/general/general';
import { Headers, RequestOptions } from '@angular/http';
import { ApiProvider } from '../providers/api/api';
import { IonicStorageModule } from '@ionic/storage';


import { Ng2SearchPipeModule } from 'ng2-search-filter'
// import { BankListPage } from '../pages/bank-list/bank-list';
// import { AddBankPage } from '../pages/add-bank/add-bank';
// import { CurrentEmployeeSkillsPage } from '../pages/current-employee-skills/current-employee-skills';
// import { LostEmployeeSkillsPage } from '../pages/lost-employee-skills/lost-employee-skills';
// import { QualificationListPage } from '../pages/qualification-list/qualification-list';
// import { AddQualificationPage } from '../pages/add-qualification/add-qualification';
// import { EmployeeLocationPage } from '../pages/employee-location/employee-location';
import { BankListPage } from '../pages/Basic-Information/bank-list/bank-list';
import { AddBankPage } from '../pages/Basic-Information/add-bank/add-bank';
import { CurrentEmployeeSkillsPage } from '../pages/Basic-Information/current-employee-skills/current-employee-skills';
import { LostEmployeeSkillsPage } from '../pages/Basic-Information/lost-employee-skills/lost-employee-skills';
import { QualificationListPage } from '../pages/Basic-Information/qualification-list/qualification-list';
import { AddQualificationPage } from '../pages/Basic-Information/add-qualification/add-qualification';
import { BasicInfoPage } from '../pages/Basic-Information/basic-info/basic-info';
import { EmployeeLocationPage } from '../pages/Basic-Information/employee-location/employee-location';



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
    AddLeavePage,
    BankListPage,
    AddBankPage,
    CurrentEmployeeSkillsPage,
    LostEmployeeSkillsPage,
    QualificationListPage,
    AddQualificationPage,
    EmployeeLocationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    Ng2SearchPipeModule,
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
    AddLeavePage,
    BankListPage,
    AddBankPage,
    CurrentEmployeeSkillsPage,
    LostEmployeeSkillsPage,
    QualificationListPage,
    AddQualificationPage,
    EmployeeLocationPage

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
