import { Http,Headers} from '@angular/http';
import { Injectable } from '@angular/core';

let apiUrl = 'http://178.128.156.28/webservice_app_curso/public/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /**
   * Método criado para consumir o serviço do webservice
   * O mesmo envia e recebe objeto JSON.
   */

  postData(credentials: { "email": string; "password": string; }, type: string) {
    console.log(`${JSON.stringify(credentials)}`);
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
