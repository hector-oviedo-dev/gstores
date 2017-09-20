import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancelprocedureService } from '../../../../services/cancelprocedure.service';

@Component({
  selector: 'app-formcancel',
  templateUrl: './formcancel.component.html',
  styleUrls: ['./formcancel.component.css']
})
export class FormcancelComponent implements OnInit {
  @Input() UID:string;
  @Input() procedureID:string;
  @Output() hasError:boolean;
  public FINISHED:boolean;

  public title:string = "Motivo";
  public body:string = "";

  public complexForm:FormGroup;
  public router:Router;

  constructor(r:Router, fb:FormBuilder, private service:CancelprocedureService) {
    this.router = r;

    this.complexForm = fb.group({
      'motivo':[null, Validators.required],
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

      motivo:this.complexForm.get('motivo').value,
      desc:this.complexForm.get('desc').value
    }
    //this.service.doService(data).subscribe(res => { this.onServiceResult(res); });
  }
  public onServiceResult(res) {
    this.FINISHED = true;
    var valid:boolean = false;
    if (res.status == "success") {
      this.hasError = false;
      this.title = "Tramite cancelado";
      this.body = "El tramite fue dado de baja correctamente.";
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

  motivo:string;
  desc:string;
}
