import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Global {
     


    constructor(public http: HttpClient) {

    }

      PostRequest(url, data) {

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');

        const requestOptions = new RequestOptions({ headers: headers });
        // return new Promise((resolve, reject) => {
        //     this.http.post('url', data, requestOptions)
        //     .toPromise()
        //     .then((response) =>
        //     {
        //       console.log('API Response : ', response.json());
        //       resolve(response.json());
        //     })
        //     .catch((error) =>
        //     {
        //       console.error('API Error : ', error.status);
        //       console.error('API Error : ', JSON.stringify(error));
        //       reject(error.json());
        //     });
        //   });

        this.http.post(url, data)
            .subscribe(data => {
                console.log(data);
            }, error => {
                console.log(error);
        });
    }
} 