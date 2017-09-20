import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../services/procedures.service';

@Component({
  selector: 'app-partnerprocedures',
  templateUrl: './partnerprocedures.component.html',
  styleUrls: ['./partnerprocedures.component.css']
})
export class PartnerproceduresComponent implements OnInit {
  @ViewChild('popupModal') popupModal;

  @ViewChild('formQualify') formQualify;
  @ViewChild('formUpdate') formUpdate;

  public router:Router;

  public formQualifyHide:Boolean = true;
  public formUpdateHide:Boolean = true;

  public MODAL_POPUP = {
    title: "",
    body: "",
    btn:""
  };

  public procedures = [];

  public procedureID:string;
  public UID:string;

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
      this.service.doPartnerService(data).subscribe(res => { this.onServiceResult(res); });
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
        case "2":
          status = "En Proceso";
          action = "Actualizar";
          break;
        case "3":
          status = "Finalizado";
          action = "Calificar";
          break;
      }

      let procedure = {
        class:"primary",
        id:result.procedures[i].id,
        title: result.procedures[i].type,
        subtitle:result.procedures[i].subtype,
        name: result.procedures[i].username,
        status:status,
        action:action
      }

      this.procedures.push(procedure);
    }

    //HARDCODED
    /*
    this.procedures.push(
      {
        class:"primary",
        id:0,
        title: "AFIP",
        subtitle:"Monotributo",
        name: "Juan Perez",
        status:"Finalizado",
        action:"Calificar"
      },
      {
        class:"primary",
        id:1,
        title: "Anses",
        subtitle:"Otros",
        name: "Jose Barrera",
        status:"En Proceso",
        action:"Actualizar"
      },
      {
        class:"primary",
        id:2,
        title: "Anses",
        subtitle:"Otros",
        name: "Francisco Paredes",
        status:"En Proceso",
        action:"Actualizar"
      }
    );
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
   if (this.hasError || this.formQualify.hasError || this.formUpdate.hasError) this.router.navigateByUrl("home");
 }
 public onClick(id) {
   var procedure:any = this.getProcedure(id)[0];

   this.procedureID = procedure.id;

   switch (procedure.action)
   {
     case "Calificar":
     this.onCalifClick();
     break;
     case "Actualizar":
     this.onUpdateClick();
     break;
   }
 }
 public onCalifClick() {
   this.formUpdateHide = true;
   this.formQualifyHide = false;

   this.MODAL_POPUP = {
     title: "Calificar",
     body:"",
     btn:"Salir"
   };
   this.popupModal.open();
 }

 public onUpdateClick() {
   this.formUpdateHide = false;
   this.formQualifyHide = true;

   this.MODAL_POPUP = {
     title: "Actualizar Tramite",
     body:"",
     btn:"Salir"
   };
   this.popupModal.open();
 }
}
export class serviceData {
  uid:string;
  aid:string;

  type:string;
  subtype:string;
  desc:string;
}
