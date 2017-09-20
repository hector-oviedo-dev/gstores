import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Singleton from '../utils/singleton';

@Injectable()
export class QualifyprocedureService {
  public SERVICE_NAME:string = Singleton.SERVER_PATH + "services/qualifyprocedure.php";
  constructor(private http: Http) { }
  doService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers });
  }
}

export class ServiceData {
  UID:string;
  procedureID:string;

  finished:string;
  score:string;
  desc:string;
}
