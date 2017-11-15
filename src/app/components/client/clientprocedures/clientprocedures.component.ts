import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../services/procedures.service';

@Component({
  selector: 'app-clientprocedures',
  templateUrl: './clientprocedures.component.html',
  styleUrls: ['./clientprocedures.component.css']
})
export class ClientproceduresComponent implements OnInit {
  @ViewChild('popupModal') popupModal;

  @ViewChild('formQualify') formQualify;
  @ViewChild('formCancel') formCancel;
  @ViewChild('formPostulations') formPostulations;

  public router:Router;

  public formQualifyHide:Boolean = true;
  public formCancelHide:Boolean = true;
  public formPostulationsHide:Boolean = true;

  public MODAL_POPUP = {
    title: "",
    body: "",
    btn:""
  };

  public procedures = [];

  public postulations = [];

  public pid:string;
  public prid:string;
  public UID:string;

  //TODO revisar esto
  public procedureID:string;

  public hasError:boolean = false;

  constructor(r:Router, private service:ProceduresService) {
    this.router = r;
  }
  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {
      let data:serviceData = {
        uid:localStorage.getItem('gstore_ID'),
        aid:"",

        type:"",
        subtype:"",
        desc:""
      }
      this.service.doService(data).subscribe(res => { this.onServiceResult(res); });
    } else {
      this.MODAL_POPUP.title = "ERROR";
      this.MODAL_POPUP.body = "No se pudo realizar la consulta de tramites, por favor verifique si esta conectado al sitio.";
      this.MODAL_POPUP.btn = "Cerrar";
      this.popupModal.open();
    }
  }
  public onServiceResult(res) {
    var result = JSON.parse(res._body);

    for (let i = 0; i < result.procedures.length; i++) {

      let status:string;
      let action:string;
      switch (result.procedures[i].status.toString()) {
        case "0":
          status = "Sin Postulaciones";
          action = "Cancelar";
          break;
        case "1":
          status = "Ver Postulaciones";
          action = "Ver Postulaciones";
          break;
        case "2":
          status = "En Proceso";
          action = "Cancelar";
          break;
        case "3":
          status = "Finalizado";
          action = "Calificar";
          break;
      }

      let procedure = {
        class:"primary",
        id:result.procedures[i].id,
        pid:result.procedures[i].pid,
        title: result.procedures[i].type,
        subtitle:result.procedures[i].subtype,
        name: result.procedures[i].name,
        status:status,
        action:action
      }

      this.procedures.push(procedure);
    }

    //HARDCODED
    /*
    this.procedures.push({
      class:"primary",
      id:3,
      title: "Anses",
      subtitle:"Otros",
      name: "Partner (Bether Asociados)",
      status:"Finalizado",
      action:"Calificar"
    });
    this.procedures.push({
      class:"primary",
      id:4,
      title: "Anses",
      subtitle:"Otros",
      name: "",
      status:"Sin Asignar",
      action:"Ver Postulaciones"
    });
    */
    //END HARDCODED

     if (localStorage.getItem('gstore_LOGGED') == "true") {
       this.hasError = false;
       this.UID = localStorage.getItem('gstore_ID');
     } else {
       //this.hasError = true;
       this.MODAL_POPUP.title = "ERROR";
       this.MODAL_POPUP.body = "Por favor verifique si se encuentra conectado al sitio correctamente.";
       this.MODAL_POPUP.btn = "Aceptar";
       this.popupModal.open();
     }
  }
  public getProcedure(id) {
    var obj = this.procedures.filter(function(node) {
        return node.id == id;
    });

    return obj;
  }
  public onModalClick() {
    this.popupModal.close();
    if (this.hasError || this.formQualify.hasError || this.formCancel.hasError || this.formPostulations.hasError) this.router.navigateByUrl("home");
  }
  public onClick(id) {
    var procedure:any = this.getProcedure(id)[0];

    this.prid = procedure.id;
    this.pid = procedure.pid;

    switch (procedure.action)
    {
      case "Calificar":
      this.onCalifClick();
      break;
      case "Cancelar":
      this.onCancelClick();
      break;
      case "Ver Postulaciones":
      this.onPostulacionesClick();
      break;
    }
  }
  public onCalifClick() {
    this.formCancelHide = true;
    this.formQualifyHide = false;
    this.formPostulationsHide = true;

    this.MODAL_POPUP = {
      title: "Calificar",
      body:"",
      btn:"Salir"
    };
    this.popupModal.open();
  }

  public onCancelClick() {
    this.formCancelHide = false;
    this.formQualifyHide = true;
    this.formPostulationsHide = true;

    this.MODAL_POPUP = {
      title: "Cancelar Tramite",
      body:"",
      btn:"Salir"
    };
    this.popupModal.open();
  }
  public onPostulacionesClick() {
    this.formCancelHide = true;
    this.formQualifyHide = true;
    this.formPostulationsHide = false;

    this.MODAL_POPUP = {
      title: "Seleccione un gestor",
      body:"",
      btn:"Salir"
    };
    this.popupModal.open();

    var data = {
      prid:this.prid
    }

    this.formPostulations.triggerResize(data);
  }
}
export class serviceData {
  uid:string;
  aid:string;

  type:string;
  subtype:string;
  desc:string;
}
