import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})
export class NewrequestComponent implements OnInit {
  public complexForm:FormGroup;

  public router:Router;

  public data:RegistData;

  public seltramites;
  public seltramite;
  public selindex;

  onChange(param) {
    this.selindex = param;
    switch (param) {
      case "1":
        this.tramite = this.afip;
        break;
      case "2":
        this.tramite = this.anses;
        break;
      case "3":
        this.tramite = this.arba;
        break;
      case "4":
        this.tramite = this.agip;
        break;
      case "5":
        this.tramite = this.igj;
        break;
    }
  }

  constructor(r:Router, fb:FormBuilder) {
    this.router = r;

    this.complexForm = fb.group({
      'type':[null,Validators.required],
      'subtype':[null],
      'desc':[null, Validators.required]
    });
  }
  public onClick() {
    let type = this.getType(this.complexForm.get('type').value);

    let subtype:string = this.complexForm.get('subtype').value;

    if (!subtype) subtype = this.tramite[0].label;

    this.router.navigate(['/newrequeststep1',{type:type,subtype:subtype,desc:this.complexForm.get('desc').value}]);
  }
  public getType(id):string {
    for (let i = 0; i < this.tramites.length; i++) {
      if (this.tramites[i].val == id) return this.tramites[i].label;
    }
    return "";
  }
  ngOnInit() {
  }
  public tramite:any = [];

  public tramites = [
    {
      label:"AFIP",
      val:1
    },
    {
      label:"ANSES",
      val:2
    },
    {
      label:"ARBA",
      val:3
    },
    {
      label:"AGIP",
      val:4
    },
    {
      label:"IGJ",
      val:5
    }
  ];

  public afip = [
    {
      label:"CERTIFICADO DE CAPACIDAD ECONOMICA (PERSONAS CON DISCAPACIDAD)",
      val:1
    },
    {
      label:"CLAVE FISCAL REPRESENTANTES DE SUJETOS DEL EXTERIOR",
      val:2
    },
    {
      label:"INSCRIPCIONES - SOLICITUD DE CUIT PERSONAS FISICAS",
      val:3
    },
    {
      label:"INSCRIPCION - PERSONAS JURIDICAS",
      val:4
    },
    {
      label:"REIMPUTACION DE PAGOS",
      val:5
    },
    {
      label:"SOLICITUD CERTIFICADO NO RETENCION TRANSFERENCIA DE INMUEBLES",
      val:6
    },
    {
      label:"PRESENTACIÓN DOCUMENTACIÓN TRAMITES VARIOS",
      val:7
    },
    {
      label:"CERTIFICADO FISCAL PARA CONTRATAR CON EL ESTADO",
      val:8
    },
    {
      label:"SOLICITUD EXENCION IMPUESTO A LAS GANANCIAS",
      val:9
    }

  ];

  public anses = [
    {
      label:"SOLICITUD DE CUIL",
      val:1
    },
    {
      label:"SABANA DE APORTES / HISTORIA LABORAL",
      val:2
    },
    {
      label:"CERTIFICACION DE SERVICIOS",
      val:3
    },
    {
      label:"SOLICITUD ASIGNACIONES FAMILIARES",
      val:4
    },
    {
      label:"SOLICITUD DE SUBSIDIOS",
      val:5
    },
    {
      label:"JUBILADOS Y PENSIONADOS - SOLICITUD CAMBIO DE BANCO",
      val:6
    },
    {
      label:"TRABAJADORES - ACREDITACION DE DATOS",
      val:7
    }
  ];

  public arba = [
    {
      label:"INMOBILIARIO - TRAMITACIÓN DE EXENCIONES",
      val:1
    },
    {
      label:"INGRESOS BRUTOS - RECLAMO POR RETENCIONES BANCARIAS",
      val:2
    },
    {
      label:"INGRESOS BRUTOS - TRAMITACIÓN DE EXENCIONES",
      val:3
    }
  ];

  public agip = [
    {
      label:"INGRESOS BRUTOS - CONSTANCIA DE NO INSCRIPCION",
      val:1
    },
    {
      label:"INMOBILIARIO / ABL - ACTUALIZACION DE DATOS / NOMINACION DE PARTIDA",
      val:2
    },
    {
      label:"ADHESION A PLANES DE FACILIDADES DE PAGO",
      val:3
    }
  ];


    public igj = [
      {
        label:"PRESENTACION DE ESTADOS CONTABLES",
        val:1
      },
      {
        label:"SOLICITUD DE INDIVIDUALIZACIÓN Y RÚBRICA DE LIBROS",
        val:2
      },
      {
        label:"CONSTITUCION DE SOCIEDADES",
        val:3
      },
      {
        label:"DESIGNACION Y CESACION DE AUTORIDADES",
        val:4
      }
    ];
}
export class RegistData {
  type:string;
  subtype:string;
}
