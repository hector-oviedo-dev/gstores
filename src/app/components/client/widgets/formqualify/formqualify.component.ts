import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QualifyprocedureService } from '../../../../services/qualifyprocedure.service';

@Component({
  selector: 'app-formqualify',
  templateUrl: './formqualify.component.html',
  styleUrls: ['./formqualify.component.css']
})
export class FormqualifyComponent implements OnInit {
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
      'option':[null, Validators.required],
      'score':[null, Validators.required],
      'desc':[null, Validators.required],
    })
  }

  ngOnInit() {
    this.hasError = false;
    this.title = "Motivo";
    this.body = "";
  }
  public onClick() {
    let data:ServiceData = {
      UID:this.UID,
      procedureID:this.procedureID,

      finished:this.complexForm.get('option').value,
      score:this.complexForm.get('score').value,
      desc:this.complexForm.get('desc').value
    }
    //this.service.doService(data).subscribe(res => { this.onServiceResult(res); });
    var result = {status:"error"};
    this.onServiceResult(result);
  }
  public onServiceResult(res) {
    this.FINISHED = true;
    var valid:boolean = false;
    if (res.status == "success") {
      this.hasError = false;
      this.title = "Tramite finalizado";
      this.body = "El tramite fue finalizado correctamente.";
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

  finished:string;
  score:string;
  desc:string;
}
