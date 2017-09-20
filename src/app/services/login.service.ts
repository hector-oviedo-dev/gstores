import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import * as Singleton from '../utils/singleton';

@Injectable()
export class LoginService {
  public SERVICE_NAME:string =  Singleton.SERVER_PATH + "services/login.php";
  constructor(private http: Http) { }
  doService(data:any) {
      var body = new URLSearchParams(data);
      body.set('user', data.user);
      body.set('pass', data.pass);

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers }).catch( ( error: Response ) => {
            if (error.status === 413) {
                return('e');
            } else {
                return ('e');
            }
        });
  }
  public onSuccess(data) {
    console.log("on suces " + data)
  }
  public onError(data) {
    console.log("on eror " + data)
  }
}
export class ServiceData {
  user:string;
  pass:string;
}
