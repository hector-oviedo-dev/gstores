import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewprocedureService } from '../../services/newprocedure.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('popupModal') popupModal;

  public router:Router;

  public addresses = [];

  public titletype:string;

  public formAddAddressHide:boolean = true;

  public MODAL_POPUP = {
    title: "",
    body: "",
    btn:""
  };

  constructor(r:Router,private service:NewprocedureService) {
    this.router = r;
  }
  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {

      if (localStorage.getItem('gstore_TYPE') == "partner") this.titletype = "PARTNER";
      else this.titletype = "CLIENTE";

      let data = {
        uid:localStorage.getItem('gstore_ID')
      }
      this.service.getAddressesService(data).subscribe(res => { this.onAddressesServiceResult(res); });

    } else this.router.navigateByUrl('/home')
  }
  public onModalClick() {
    this.popupModal.close();
  }
  public onClick(addressID) {
    console.log(addressID);
    let data = {
      id:addressID
    }
    this.service.removeAddressService(data).subscribe(res => { this.onRemoveServiceResult(res); });
  }
  public openAddAddress() {
    this.formAddAddressHide = false;

    this.MODAL_POPUP.title = "Agregar Nueva Direccion";
    this.MODAL_POPUP.body = "";
    this.MODAL_POPUP.btn = "Cerrar";

    this.popupModal.open();
  }
  public onRemoveServiceResult(res) {
    var result = JSON.parse(res._body);

    if (result.STATUS == "OK") {
      this.router.navigateByUrl('/home');
    } else {
      this.MODAL_POPUP.title = "Error";
      this.MODAL_POPUP.body = "Por favor vuelva a intentarlo mas tarde.";
      this.MODAL_POPUP.btn = "aceptar.";
      this.popupModal.open();
    }
  }
  public onAddressesServiceResult(res) {
    var result = JSON.parse(res._body);

    let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let lettersGoogle = ["icon48","icon49","icon50","icon51","icon52","icon53","icon54","icon55","icon40","icon41","icon42","icon43","icon44","icon45","icon46","icon47","icon16","icon17","icon18","icon19","icon20","icon21","icon22","icon23","icon8","icon9"];

    this.addresses = [];

    for (let i = 0; i < result.addresses.length; i++) {
      let lat = Number(result.addresses[i].lat);
      let lng = Number(result.addresses[i].lng);

      let address = {
        "id":result.addresses[i].id,
        "name":result.addresses[i].name
      }
      this.addresses.push(address);
      /*
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
      this.lng = marker.lng;*/
    }

    //this.aid = this.markers[0].id.toString();
    //this.addressselected.id = this.markers[0].id.toString();

    //this.startGeolocation();
  }

}
