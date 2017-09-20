import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signed',
  templateUrl: './signed.component.html',
  styleUrls: ['./signed.component.css']
})
export class SignedComponent implements OnInit {
  public hidden:boolean = false;
  public router:Router;
  constructor(r: Router) {
    this.router = r;
  }

  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") this.hidden = false;
    else this.hidden = true;
  }
  public onLogut() {
    console.log("pressed");
    localStorage.setItem('gstore_LOGGED','false');
    this.router.navigateByUrl('/home');
  }
}
