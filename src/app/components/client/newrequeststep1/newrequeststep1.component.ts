import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewprocedureService } from '../../../services/newprocedure.service';

@Component({
  selector: 'app-newrequeststep1',
  templateUrl: './newrequeststep1.component.html',
  styleUrls: ['./newrequeststep1.component.css']
})
export class Newrequeststep1Component implements OnInit {
  @ViewChild(AgmMap) private map: any;
  @ViewChild('popupModal') popupModal;
  public complexForm:FormGroup;

  public router:ActivatedRoute;
  public routerNAV:Router;

  public lat = -34.50802731202977;
  public lng = -58.37031841278076;
  public zoom:number = 12;

  public circles:circle[];
  public markers:marker[];

  public myposition:marker = {
    id:0,
    name:"",
    icon:"",
    lat: 0,
    lng: 0
  };

  public type:string;
  public subtype:string;
  public desc:string;
  public addressselected = { id:"0", label:"" }

  public MODAL_POPUP = {
    title: "",
    body: ""
  };

  constructor(public mapsApiLoader:MapsAPILoader,r:ActivatedRoute, rn:Router, private service:NewprocedureService, fb:FormBuilder) {
    this.router = r;
    this.routerNAV = rn;
    //let routeData:any = routeParams.params;
    //console.log(routeData.type);
    this.complexForm = fb.group({
      'seldrop':['null']
    });
  }
  ngOnInit() {
    this.mapsApiLoader.load().then(() => {
      console.log('google script loaded');
      this.getAddresses();
    });

    this.router.params.subscribe(
     (params : Params) => {
        this.type = params["type"];
        this.subtype = params["subtype"];
        this.desc = params["desc"];
     }
    );
  }
  public onClick() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {
      let data:serviceData = {
        uid:localStorage.getItem('gstore_ID'),
        aid: this.addressselected.id,

        type:this.type,
        subtype:this.subtype,
        desc:this.desc
      }
      this.service.doService(data).subscribe(res => { this.onServiceResult(res); });
    } else {
      this.MODAL_POPUP.title = "ERROR";
      this.MODAL_POPUP.body = "El tramite no pudo ser dado de alta, por favor verifique si se encuentra conectado al sitio correctamente.";
      this.popupModal.open();
    }
  }
  public onServiceResult(res) {
    var result = JSON.parse(res._body);
    var valid:boolean = false;
    if (result.status == "OK") {
      this.MODAL_POPUP.title = "TRAMITE DADO DE ALTA";
      this.MODAL_POPUP.body = "Su tramite ya fue dado de alta, para seguir el estado del mismo, puede hacerlo desde su panel de control.";
    } else {
      this.MODAL_POPUP.title = "ERROR";
      this.MODAL_POPUP.body = "El tramite no pudo ser dado de alta, por favor intente nuevamente mas tarde.";
    }
    this.popupModal.open();
  }
  public onModalClick() {
    this.routerNAV.navigateByUrl('/client');
  }
  public getAddresses() {
    let data:serviceData = {
      uid:localStorage.getItem('gstore_ID'),
      aid:"",

      type:"",
      subtype:"",
      desc:""
    }
    this.service.getAddressesService(data).subscribe(res => { this.onAddressesServiceResult(res); });
  }
  public onAddressesServiceResult(res) {
    var result = JSON.parse(res._body);

    let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let lettersGoogle = ["icon48","icon49","icon50","icon51","icon52","icon53","icon54","icon55","icon40","icon41","icon42","icon43","icon44","icon45","icon46","icon47","icon16","icon17","icon18","icon19","icon20","icon21","icon22","icon23","icon8","icon9"];

    this.markers = [];

    for (let i = 0; i < result.addresses.length; i++) {
      let lat = Number(result.addresses[i].lat);
      let lng = Number(result.addresses[i].lng);

      let marker:marker = {
        label: "(" + letters[i] + ") " + result.addresses[i].name,
        icon:"http://maps.google.com/mapfiles/kml/pal5/" + lettersGoogle[i] + ".png",

        lat:lat,
        lng:lng,

        id:result.addresses[i].id,
        name:result.addresses[i].name
      };

      this.markers.push(marker);

      this.lat = marker.lat;
      this.lng = marker.lng;
    }

    this.addressselected.id = this.markers[0].id.toString();

    this.startGeolocation();
  }

  public startGeolocation() {
    if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(this.successGeolocation.bind(this), this.failGeolocation.bind(this),{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
    } else {
      alert("El servicio de geolocalizacion no se encuentra disponible en este dispositivo.");
    }
  }

  public successGeolocation(position:Position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    this.myposition = {
      id:0,
      name:"Mi Ubicacion Actual",
      icon:"http://maps.google.com/mapfiles/ms/micons/man.png",
      lat: this.lat,
      lng: this.lng
    };

    this.circles = [
      {
        name:"Mi ubicacion actual aproximada",
        id:0,
        rad:1000,
        color:"lightblue",
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    ];
  }

  public failGeolocation() {
    alert("Error de autorizacion.");
  }

  public onMarkerClick(marker:marker, index:number) {
    /*
    this.addressselected.label = marker.label;
    this.addressselected.id = marker.id.toString();
    console.log("clicked " + marker.id);*/
  }
  public onChange(val,lab) {
    this.addressselected.id = val;
  }
}
interface marker {
  name?:string;
  label?:string;
  id:number;
  lat:number;
  lng:number;
  icon?:string;
}
interface circle {
name?:string;
id:0;
lat:number;
lng:number;
rad:number;
color?:string;
}
export class serviceData {
  uid:string;
  aid:string;

  type:string;
  subtype:string;
  desc:string;
}
