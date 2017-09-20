import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { AgmMap, AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProceduresService } from '../../../../services/procedures.service';

@Component({
  selector: 'app-formpostulations',
  templateUrl: './formpostulations.component.html',
  styleUrls: ['./formpostulations.component.css']
})
export class FormpostulationsComponent implements OnInit {
  @Input() UID:string;
  @Input() procedureID:string;
  @Output() hasError:boolean;
  @ViewChild(AgmMap) private map: any;

  public FINISHED:boolean;

  public title:string = "Ver Postulaciones";
  public body:string = "";

  public complexForm:FormGroup;
  public router:Router;

  public lat = -34.50802731202977;
  public lng = -58.37031841278076;
  public zoom:number = 12;

  public circles:circle[] = [];
  public markers:marker[] = [];

  public pid:number;
  public prid:number;

  public myposition:marker = {
    id:0,
    pid:0,
    name:"",
    icon:"",
    lat: 0,
    lng: 0
  };
  public triggerResize(data) {
    this.map.triggerResize();
    this.map.triggerResize().then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));

    this.prid = data.prid;

    var data:any = { prid:this.prid };
    this.service.doPostulationsService(data).subscribe(res => { this.onPostulationsResult(res); });
  }
  public onPostulationsResult(res) {
    var result = JSON.parse(res._body);

    let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let lettersGoogle = ["icon48","icon49","icon50","icon51","icon52","icon53","icon54","icon55","icon40","icon41","icon42","icon43","icon44","icon45","icon46","icon47","icon16","icon17","icon18","icon19","icon20","icon21","icon22","icon23","icon8","icon9"];

    this.markers = [];

    for (let i = 0; i < result.postulations.length; i++) {

      let lat = Number(result.postulations[i].lat);
      let lng = Number(result.postulations[i].lng);

      let marker:marker = {
        name: "(" + letters[i] + ") " + result.postulations[i].name,
        label: "(" + letters[i] + ") " + result.postulations[i].name,
        icon:"http://maps.google.com/mapfiles/kml/pal5/" + lettersGoogle[i] + ".png",

        id:result.postulations[i].id,
        pid:result.postulations[i].pid,
        lat: lat,
        lng: lng
      }
      this.markers.push(marker);

      if (this.markers.length == 1) this.pid = marker.pid;
    }
  }
  constructor(public mapsApiLoader:MapsAPILoader, r:Router, private service:ProceduresService, fb:FormBuilder) {
    this.router = r;

    this.complexForm = fb.group({
      'seldrop':[null]
      //'desc':[null, Validators.required]
    })
  }
  ngOnInit() {
    this.hasError = false;
    this.title = "Seleccionar Gestor";
    this.body = "";

    this.mapsApiLoader.load().then(() => {
      this.startGeolocation();
    });
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
      pid:0,
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
    //google.maps.event.trigger(map, 'resize');
    /*
    this.addressselected.label = marker.label;
    this.addressselected.id = marker.id.toString();
    console.log("clicked " + marker.id);*/
  }
  public onChange(val,lab) {
    console.log("clicked " + lab);
    console.log("clicked " + val);

    this.pid = val;
  }
  public onClick() {

    console.log("pid es " + this.pid);

    let data:any = {
      pid:this.pid,
      prid:this.prid
    }

    console.log("PR ID ES " + this.prid);
    console.log("P ID ES " + this.pid);

    this.service.doConfirmPostulationService(data).subscribe(res => { this.onConfirmPostulationResult(res); });
    var result = {status:"error"};
  }
  public onConfirmPostulationResult(res) {
    var result = JSON.parse(res._body);

    this.FINISHED = true;
    var valid:boolean = false;
    if (result.status == "OK") {
      this.router.navigateByUrl("confirmsuccess");
    } else {
      this.hasError = true;
      this.title = "ERROR";
      this.body = "Por favor vuelva a intentarlo mas tarde.";
    }
  }
}
  export class ServiceData {
  UID:string;
  procedureID:string;

  PID:string;
  desc:string;
  }
  interface marker {
    name?:string;
    label?:string;
    id:number;
    pid:number;
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
  export class procedureData {
    id:string;
    type:string;
    subtype:string;
    desc:string;
    addressID:string;
  }
