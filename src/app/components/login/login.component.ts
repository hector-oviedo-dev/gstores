import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal') loginModal;

  public complexForm:FormGroup;

  public router:Router;

  public MODAL_LOGIN = {
    title: "",
    body: ""
  };

  constructor(r:Router, private service:LoginService,  fb:FormBuilder) {
    this.router = r;

    this.complexForm = fb.group({
      'user':[null, Validators.required],
      'pass':[null, Validators.required]
    });
  }

  ngOnInit() {
  }

  public doLogin():void {
    let data:serviceData = {
      user:this.complexForm.get('user').value,
      pass:this.complexForm.get('pass').value
    };
    this.service.doService(data).subscribe(res => { this.doLoginResult(res); });
  }
  public doLoginResult(res) {
    var result = JSON.parse(res._body);
    if (result.status == "OK") {
      console.log("success login");
      localStorage.setItem('gstore_LOGGED', "true");
      localStorage.setItem('gstore_TYPE', result.type);
      localStorage.setItem('gstore_ID', result.id);

      if (result.type == "partner") this.router.navigateByUrl('/partner');
      else this.router.navigateByUrl('/client');
    } else {
      localStorage.setItem('gstore_LOGGED', "false");

      this.MODAL_LOGIN.title = "Error en el inicio de sesion";
      this.MODAL_LOGIN.body = "Verifique los datos ingresados.";
      this.loginModal.open();
    }
  }
}
export class serviceData {
  user:string;
  pass:string;
}
