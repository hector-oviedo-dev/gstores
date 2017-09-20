import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('popupModal') popupModal;
  public hidden:boolean = false;

  public complexForm:FormGroup;

  public router:Router;

  public LOGGED:boolean = false;
  public MODAL_POPUP = {
    title: "",
    body: ""
  };

  constructor(r:Router, private service:LoginService, fb:FormBuilder) {
    this.router = r;

    this.complexForm = fb.group({
      'user':[null, Validators.required],
      'pass':[null, Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {
      this.hidden = true;
      if (localStorage.getItem('gstore_TYPE') == "partner") this.router.navigateByUrl('/partner');
      else this.router.navigateByUrl('/client');
    }
    else this.hidden = false;
  }

  public doLogin():void {
    let data:serviceData = {
      user:this.complexForm.get('user').value,
      pass:this.complexForm.get('pass').value
    };

    this.service.doService(data).subscribe(res => { this.doLoginResult(res); });
  }
  public doLoginResult(res) {

    if (res == "e") {
      this.MODAL_POPUP.title = "Error de conexion";
      this.MODAL_POPUP.body = "Verifique su conexion o vuelva a intentarlo mas tarde.";
      this.popupModal.open();
      return;
    }

    var result = JSON.parse(res._body);
    if (result.status == "OK") {
      localStorage.setItem('gstore_LOGGED', "true");
      localStorage.setItem('gstore_TYPE', result.type);
      localStorage.setItem('gstore_ID', result.id);

      if (result.type == "partner") this.router.navigateByUrl('/partner');
      else this.router.navigateByUrl('/client');
    } else {
      localStorage.setItem('gstore_LOGGED', "false");

      this.MODAL_POPUP.title = "Error en el inicio de sesion";
      this.MODAL_POPUP.body = "Verifique los datos ingresados.";
      this.popupModal.open();
    }
  }
  public onModalClick() {
    this.popupModal.close();
  }
}
export class serviceData {
  user:string;
  pass:string;
}
