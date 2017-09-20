import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Singleton from '../utils/singleton';

@Injectable()
export class NewprocedureService {
  public SERVICE_NAME:string = Singleton.SERVER_PATH + "services/makeprocedure.php";
  public SERVICE_GET_ADDRESSES_NAME:string = Singleton.SERVER_PATH + "services/getaddresses.php";
  public SERVICE_REMOVE_ADDRESS:string = Singleton.SERVER_PATH + "services/removeaddress.php";
  public SERVICE_ADD_ADDRESS:string = Singleton.SERVER_PATH + "services/makeaddress.php";
  constructor(private http: Http) { }
  doService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);
    body.set('aid', data.aid);

    body.set('type', data.type);
    body.set('subtype', data.subtype);
    body.set('desc', data.desc);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers });
  }
  getAddressesService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_GET_ADDRESSES_NAME, body.toString(),{ headers:headers });
  }
  removeAddressService(data:any) {
    var body = new URLSearchParams(data);
    body.set('id', data.id);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_REMOVE_ADDRESS, body.toString(),{ headers:headers });
  }
  addAddressService(data:any) {
    var body = new URLSearchParams(data);
    body.set('uid', data.uid);

    body.set('address_street', data.address_street);
    body.set('address_number', data.address_number);
    body.set('address_room', data.address_room);
    body.set('address_floor', data.address_floor);
    body.set('address_cp', data.address_cp);
    body.set('address_state', data.address_state);
    body.set('address_city', data.address_city);
    body.set('address_country', data.address_country);

    body.set('address_lng', data.address_lng);
    body.set('address_lat', data.address_lat);

    body.set('address_phone', data.address_phone);
    body.set('address_contact', data.address_contact);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.SERVICE_ADD_ADDRESS, body.toString(),{ headers:headers });
  }
}
export class ServiceData {
  uid:string;
  aid:string;

  type:string;
  subtype:string;
  desc:string;
}
