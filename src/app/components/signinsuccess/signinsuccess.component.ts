import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signinsuccess',
  templateUrl: './signinsuccess.component.html',
  styleUrls: ['./signinsuccess.component.css']
})
export class SigninsuccessComponent implements OnInit {

  public router:Router;

  constructor(r: Router) {
    this.router = r;
  }

  ngOnInit() {
  }

}
