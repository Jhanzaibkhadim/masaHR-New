import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Constants } from "../../utils/Constants"
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  employeeJobGlobal: any = ""

  constructor(public http: HttpClient, public alertCtrl: AlertController, ) {
    console.log('Hello ApiProvider Provider');
  }


  getRequest(url) {
    return new Promise(resolve => {

      var resp;
      console.log(Constants.BASE_URL + url)
      this.http.get(Constants.BASE_URL + url)
        .subscribe((res) => {
          console.log(res)
          resp = res;
          resolve(resp)
        }, (err) => {
          console.log(err, 'err')
          if (err.status == 0) {
            this.presentErrorAlert()
          }
          resolve(err)
        })
    })
  }

  postRequest(url, data) {
    console.log(url)
    return new Promise(resolve => {
      console.log(Constants.BASE_URL + url)
      console.log(data)
      this.http.post(Constants.BASE_URL + url, data)
        .subscribe((res) => {
          console.log(res, ' res')

          resolve(res)
        }, (err) => {
          console.log(err, 'err')
          if (err.status == 0) {
            this.presentErrorAlert()
          }
          resolve(err)
        })
    })
  }

  getRequestWithoutBaseURL(url) {
    return new Promise(resolve => {
      var resp;
      this.http.get(url)
        .subscribe((res) => {
          console.log(res)
          resp = res;
          resolve(resp)
        }, (err) => {
          console.log(err, 'err')
          if (err.status == 0) {
            this.presentErrorAlert()
          }
          resolve(err)
        })
    })

  }



  // getRequestWithHeader(url) {
  //   return new Promise(resolve => {
  //     this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {
  //       console.log("asdfasdf")
  //       console.log(res)
  //       // if (res != null) {
  //       var resp;
  //       this.http.get(url, { headers: { 'Authorization': 'Bearer ' + res } })
  //         .subscribe((response) => {
  //           console.log('data res', response)
  //           resp = response;
  //           resolve(resp)
  //         },
  //           (err) => {
  //             if (err.status == 0) {
  //               this.presentErrorAlert()
  //             }
  //             console.log(err)
  //             resolve(err)

  //           })
  //       // }
  //     })
  //   })
  // }
  // postRequestWithHeader(url, data) {
  //   return new Promise(resolve => {
  //     this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {
  //       // if (res != null) {
  //       console.log("asdfasdf")
  //       console.log(res)
  //       var resp;
  //       this.http.post(Constants.BASE_URL + url, data, { headers: { 'Authorization': 'Bearer ' + res } })
  //         .subscribe((res) => {
  //           console.log(res, 'data res')
  //           resp = res;
  //           resolve(resp)
  //         },
  //           (err) => {
  //             if (err.status == 0) {
  //               this.presentErrorAlert()
  //             }
  //             resolve(err)
  //           })
  //       // }
  //     })
  //   })
  // }

  // putRequestWithHeader(url, data) {
  //   return new Promise(resolve => {
  //     this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {
  //       if (res != null) {
  //         var resp;
  //         this.http.put(Constants.BASE_URL + url, data, { headers: { 'Authorization': 'Bearer ' + res } })
  //           .subscribe((res) => {
  //             console.log(res, 'data res')
  //             resp = res;
  //             resolve(resp)
  //           },
  //             (err) => {
  //               if (err.status == 0) {
  //                 this.presentErrorAlert()
  //               }
  //               console.log(err)
  //               resolve(err)
  //             })
  //       }
  //     })
  //   })
  // }

  putRequestWithOutHeader(url, data) {
    return new Promise(resolve => {
      // this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {
      //   if (res != null) {
      var resp;
      this.http.put(Constants.BASE_URL + url, data)
        .subscribe((res) => {
          console.log(res, 'data res')
          resp = res;
          resolve(resp)
        },
          (err) => {
            if (err.status == 0) {
              this.presentErrorAlert()
            }
            console.log(err)
            resolve(err)
          })
      //   }
      // })
    })
  }

  presentErrorAlert() {
    var alert = this.alertCtrl.create({
      title: 'Network connection',
      message: 'There seem to be some issue with your internet connection. Please check your connection',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            // this.app.getRootNav().setRoot(LoginPage, {}, { animate: true, animation: "wp-transition" });
          }
        }
      ]
    });




  }

}
