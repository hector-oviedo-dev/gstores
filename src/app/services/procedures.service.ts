import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Singleton from '../utils/singleton';

@Injectable()
export class ProceduresService {
  public SERVICE_NAME:string = Singleton.SERVER_PATH + "services/getprocedures.php";
  public SERVICE_PARTNER_NAME:string = Singleton.SERVER_PATH + "services/getpartnerprocedures.php";
  public SERVICE_LIST_NAME:string = Singleton.SERVER_PATH + "services/listprocedures.php";
  public SERVICE_POSTULATE_NAME:string = Singleton.SERVER_PATH + "services/makepostulation.php";
  public SERVICE_POSTULATIONS_NAME:string = Singleton.SERVER_PATH + "services/getpostulations.php";
  public SERVICE_CONFIRM_POSTULATION_NAME:string = Singleton.SERVER_PATH + "services/confirmpostulation.php";
  constructor(private http: Http) { }
  doService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers });
  }
  doPartnerService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_PARTNER_NAME, body.toString(),{ headers:headers });
  }
  doListService() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_LIST_NAME,"",{ headers:headers });
  }
  doPostulateService(data:any) {
    var body = new URLSearchParams(data);
    body.set('pid', data.pid);
    body.set('prid', data.prid);
    body.set('aid', data.aid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_POSTULATE_NAME, body.toString(),{ headers:headers });
  }
  doPostulationsService(data:any) {
    var body = new URLSearchParams(data);
    body.set('prid', data.prid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_POSTULATIONS_NAME, body.toString(),{ headers:headers });
  }
  doConfirmPostulationService(data:any) {
    var body = new URLSearchParams(data);
    body.set('pid', data.pid);
    body.set('prid', data.prid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_CONFIRM_POSTULATION_NAME, body.toString(),{ headers:headers });
  }
}
export class ServiceData {
  uid:string;
  aid:string;

  type:string;
  subtype:string;
  desc:string;
}
