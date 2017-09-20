import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Singleton from '../utils/singleton';

@Injectable()
export class RegistService {
  public SERVICE_NAME:string = Singleton.SERVER_PATH + "services/regist.php";
  constructor(private http: Http) { }
  // Get all posts from the API
  doService(data:any) {
      var body = new URLSearchParams(data);
      body.set('name', data.name);
      body.set('dni', data.dni);
      body.set('email', data.email);

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

      body.set('mercadopago', data.mercadopago);

      body.set('bank_number', data.bank_number);
      body.set('bank_type', data.bank_type);
      body.set('bank_cbu', data.bank_cbu);

      body.set('password', data.password);

      body.set('type', data.type);

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(this.SERVICE_NAME, body.toString(),{ headers:headers });
  }
  doSearchService(address:string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCUEZtKFF4YhRmJQ3qL_vE7SzY5BmIE-Pw')
      .map(res => res.json());
    }
}
export class ServiceData {
  name:string;
  dni:string;
  email:string;

  address_street:string;
  address_number:string;
  address_room:string;
  address_floor:string;
  address_cp:string;
  address_state:string;
  address_city:string;
  address_country:string;

  address_lng:string;
  address_lat:string;

  address_phone:string;
  address_contact:string;

  mercadopago:string;

  bank_number:string;
  bank_type:string;
  bank_cbu:string;

  password:string;

  type:string;
}
