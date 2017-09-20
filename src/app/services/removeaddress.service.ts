import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Singleton from '../utils/singleton';

@Injectable()
export class RemoveaddressService {
  public SERVICE_NAME:string =  Singleton.SERVER_PATH + "services/removeaddress.php";
  constructor(private http: Http) { }
  doService(data:any) {
      var body = new URLSearchParams(data);
      body.set('user', data.user);
      body.set('pass', data.pass);

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers });
  }
}
export class ServiceData {
  user:string;
  pass:string;
}
