import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QualifyprocedureService } from '../../../../services/qualifyprocedure.service';

@Component({
  selector: 'app-formupdate',
  templateUrl: './formupdate.component.html',
  styleUrls: ['./formupdate.component.css']
})
export class FormupdateComponent implements OnInit {
  @Input() UID:string;
  @Input() procedureID:string;
  @Output() hasError:boolean;
  public FINISHED:boolean;

  public title:string = "Motivo";
  public body:string = "";

  public complexForm:FormGroup;
  public router:Router;

  constructor(r:Router, fb:FormBuilder, private service:QualifyprocedureService) {
    this.router = r;

    this.complexForm = fb.group({
      'seldrop':[null, Validators.required],
      'desc':[null, Validators.required],
    })
  }

  ngOnInit() {
    this.hasError = false;
    this.title = "Motivo";
    this.body = "";
  }
  public onClick() {
    
  }
}
