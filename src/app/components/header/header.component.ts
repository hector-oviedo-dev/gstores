import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public LOGGED:boolean = false;
  public TYPE:boolean = false;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {
      this.LOGGED = true;
      if (localStorage.getItem('gstore_TYPE') == "partner") this.TYPE = true;
      else this.TYPE = false;
    }
    else this.LOGGED = false;
  }
}
