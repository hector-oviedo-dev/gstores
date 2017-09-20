import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistService } from '../../../services/regist.service';
import { PasswordValidation } from '../../../utils/passwordvalidation';

@Component({
  selector: 'app-clientregist',
  templateUrl: './clientregist.component.html',
  styleUrls: ['./clientregist.component.css']
})
export class ClientregistComponent implements OnInit {
  @ViewChild('popupModal') popupModal;
  public complexForm : FormGroup;

  public router:Router;

  public MODAL_POPUP = {
    title: "",
    body: ""
  };

  public address:string;
  public dataResult:any;
  public data:serviceData;

  public lat:any;
  public lng:any;

  constructor(r:Router, fb:FormBuilder, private service:RegistService) {
    this.router = r;

    this.complexForm = fb.group({
      'name':[null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      'dni':[null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      'email':[null, Validators.compose([Validators.required, Validators.minLength(5),Validators.email])],

      'address_full':[null, Validators.required],
      'address_street':[null],
      'address_number':[null],
      'address_room':[null],
      'address_floor':[null],
      'address_cp':[null],
      'address_state':[null],
      'address_city':[null],
      'address_country':[null],

      'address_phone':[null, Validators.required],
      'address_contact':[null, Validators.required],

      'mercadopago':[null],

      'agree':[null, Validators.requiredTrue],

      'password':[null, Validators.required],
      'confirmPassword':[null, Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    })
  }
  public onSearchClick() {
    this.address = this.complexForm.get('address_full').value;
    this.service.doSearchService(this.address).subscribe(res => { this.doSearchResult(res); });
  }
  public doSearchResult(res) {
    var valid:boolean = false;
    if (res.results) if (res.results[0].types) for (var i = 0; i < res.results[0].types.length; i++) if (res.results[0].types[i] == "street_address") valid = true;

    if (res.status == "OK" && valid) {
      this.dataResult = res.results[0];
      this.MODAL_POPUP.title = "Direccion encontrada";
      this.MODAL_POPUP.body = res.results[0].formatted_address;
    } else {
      this.MODAL_POPUP.title = "ERROR";
      this.MODAL_POPUP.body = "Por favor ingrese nuevamente su direccion: Verifique que sea una direccion valida, ejemplo: avenida corrientes 1000, buenos aires, argentina.";
    }
    this.popupModal.open();
  }
  ngOnInit() {

  }

  public onClick() {
    this.data = {
      name:this.complexForm.get('name').value,
      dni:this.complexForm.get('dni').value,
      email:this.complexForm.get('email').value,

      address_street:this.complexForm.get('address_street').value,
      address_number:this.complexForm.get('address_number').value,
      address_room:this.complexForm.get('address_room').value,
      address_floor:this.complexForm.get('address_floor').value,
      address_cp:this.complexForm.get('address_cp').value,
      address_state:this.complexForm.get('address_state').value,
      address_city:this.complexForm.get('address_city').value,
      address_country:this.complexForm.get('address_country').value,
      address_lng:this.lng,
      address_lat:this.lat,

      address_phone:this.complexForm.get('address_phone').value,
      address_contact:this.complexForm.get('address_contact').value,

      mercadopago:this.complexForm.get('mercadopago').value,

      bank_number:"",
      bank_type:"",
      bank_cbu:"",

      password:this.complexForm.get('password').value,

      type: "client"
    }
    this.service.doService(this.data).subscribe(res => { this.doRegist(res); });
  }
  public doRegist(res) {
    var result = JSON.parse(res._body);
    if (result.status == "OK") {
      console.log("success regist");
      this.router.navigateByUrl('/signinsuccess');
    } else {
      this.MODAL_POPUP.title = "Error de registro";
      this.MODAL_POPUP.body = "Por favor vuelva a intentarlo mas tarde.";
      this.popupModal.open();
    }
  }
  public onModalClick() {
    this.popupModal.close();

    if (this.dataResult && this.dataResult.address_components && this.dataResult.geometry && this.dataResult.geometry.location) {

      for (var i = 0; i < this.dataResult.address_components.length; i++) {
        var obj = this.dataResult.address_components[i];
        for (var j = 0; j < obj.types.length; j++) {
          if (obj.types[j] == "route") this.complexForm.controls['address_street'].setValue(this.dataResult.address_components[i].long_name);
          if (obj.types[j] == "street_number") this.complexForm.controls['address_number'].setValue(this.dataResult.address_components[i].short_name);
          if (obj.types[j] == "postal_code") this.complexForm.controls['address_cp'].setValue(this.dataResult.address_components[i].short_name);
          if (obj.types[j] == "sublocality_level_1") this.complexForm.controls['address_city'].setValue(this.dataResult.address_components[i].long_name);
          if (obj.types[j] == "administrative_area_level_1") this.complexForm.controls['address_state'].setValue(this.dataResult.address_components[i].long_name);
          if (obj.types[j] == "street_address") this.complexForm.controls['address_city'].setValue(this.dataResult.address_components[i].short_name);
          if (obj.types[j] == "country") this.complexForm.controls['address_country'].setValue(this.dataResult.address_components[i].long_name);
        }
      }

      this.lat = this.dataResult.geometry.location.lat;
      this.lng = this.dataResult.geometry.location.lng;
    }
  }
}
export class serviceData {
  type:string;
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
}
