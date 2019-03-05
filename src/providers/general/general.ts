import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {

  constructor(public http: HttpClient,public translate:TranslateService) {
    console.log('Hello GeneralProvider Provider');
  }


  GetTranslatedString(key) {
    return new Promise((resolve) => {
      this.translate.get(key).subscribe(res => {
        console.log(res);
        resolve(res)
      }
      );
    })
  }
}
