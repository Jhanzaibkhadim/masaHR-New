import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Constants } from "../../utils/Constants"
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  employeeJobGlobal: any = ""
  employeeNmeGlobal:any = ""
  monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  constructor(public http: HttpClient, public alertCtrl: AlertController,public localStore:Storage ) {
    console.log('Hello ApiProvider Provider');
  }


  getRequest(url) {
    return new Promise(resolve => {

      var resp;
      this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
        console.log(res, "ye hey local")
        if (res !== null && res !== undefined) {
          console.log(Constants.BASE_URL + url)
          this.http.get(Constants.BASE_URL + url, {
            headers: { token: res.token }
          })
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
        }else{
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
        }
      })
     
    })
  }

  postRequest(url, data) {
    console.log(url)
    return new Promise(resolve => {
      console.log(Constants.BASE_URL + url)
      console.log(data)
      this.localStore.get(Constants.SAVE_USER_INFO_KEY).then((res) => {
        console.log(res, "ye hey local")
        if (res !== null && res !== undefined) {
          this.http.post(Constants.BASE_URL + url, data, {
            headers: { token: res.token }
          })
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
        }else{
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
        }
      })

      
    })
  }


  setDate(dt){
    var date_year = dt.split(' ')
    var month = 0;
    for (let index = 0; index < this.monthShortNames.length; index++) {
       if(this.monthShortNames[index] == date_year[2]){
        month=index+1;
        var dd = new Date(date_year[3] + '-' + month + '-' + date_year[1]).toISOString();
        console.log(date_year,dd)
        return dd;
       }
    }
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
