import { Component, ViewChild, OnInit } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { ProceduresService } from '../../../services/procedures.service';

@Component({
  selector: 'app-partnerlistrequests',
  templateUrl: './partnerlistrequests.component.html',
  styleUrls: ['./partnerlistrequests.component.css']
})
export class PartnerlistrequestsComponent implements OnInit {
    @ViewChild('popupModal') popupModal;
    @ViewChild('formPostulation') formPostulation;

    public popupMapHide:Boolean = true;
    public popupPostulateHide:Boolean = true;
    public popupInfoHide:Boolean = true;

    public router:Router;

    public MODAL_POPUP = {
      title: "",
      body: "",
      btn:""
    };

    public procedures = [];

    public selectedID:string;

    public procedureID:string;
    public UID:string;

    public hasError:boolean = false;

    public lat: number = -34.60802731202977;
    public lng: number = -58.37031841278076;
    public zoom:number = 12;

    public circle:any;
    public marker:any = {
        name:"",
        id:1,
        icon:"",
        lat: 0,
        lng: 0 }
    public myPosition:any;

  constructor(public mapsApiLoader: MapsAPILoader,r:Router, private service:ProceduresService) {
    this.router = r;
  }
  ngOnInit() {
    if (localStorage.getItem('gstore_LOGGED') == "true") {
      this.mapsApiLoader.load().then(() => {
        console.log('google script loaded');
        this.startGeolocation();
      });

      this.circle = {
          name:"Mi ubicacion actual aproximada",
          id:0,
          rad:1000,
          color:"lightblue",
          lat: this.lat,
          lng: this.lng
        };

      this.myPosition = {
        name:"Mi Ubicacion Actual",
        id:0,
        icon:"http://maps.google.com/mapfiles/ms/micons/man.png",
        lat: this.lat,
        lng: this.lng
      };
    } else {
      this.MODAL_POPUP.title = "ERROR";
      this.MODAL_POPUP.body = "No se pudo realizar la consulta de tramites, por favor verifique si esta conectado al sitio.";
      this.MODAL_POPUP.btn = "Cerrar";
      this.popupModal.open();
    }
  }
  public onModalClick() {
    if (!this.popupPostulateHide) {
       var data:any = {
         pid: localStorage.getItem('gstore_ID'),
         prid:this.selectedID,
         aid:this.formPostulation.aid
       };
       this.service.doPostulateService(data).subscribe(res => { this.onPostulateResult(res); });
     }
     if (!this.popupMapHide) this.popupModal.close();
    if (!this.popupInfoHide) {
      this.popupModal.close();
      this.router.navigateByUrl('/partner');
    }
  }
  public startGeolocation() {
    if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(this.successGeolocation.bind(this), this.failGeolocation.bind(this),{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
    } else {
      alert("El servicio de geolocalizacion no se encuentra disponible en este dispositivo.");
    }
  }
  public failGeolocation() {
    alert("Error de autorizacion.");
  }

  public successGeolocation(position:Position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

    this.circle =
      {
        name:"Mi ubicacion actual aproximada",
        id:0,
        rad:1000,
        color:"lightblue",
        lat: this.lat,
        lng: this.lng
      };

    this.myPosition = {
      name:"Mi Ubicacion Actual",
      id:0,
      icon:"http://maps.google.com/mapfiles/ms/micons/man.png",
      lat: this.lat,
      lng: this.lng
    };

    this.service.doListService().subscribe(res => { this.onServiceResult(res); });
  }

  public onServiceResult(res) {
      var result = JSON.parse(res._body);

      for (let i = 0; i < result.procedures.length; i++) {

        let lat = Number(result.procedures[i].address.lat);
        let lng = Number(result.procedures[i].address.lng);

        let procedure = {
          class:"primary",
          id:result.procedures[i].id,
          title: result.procedures[i].type,
          subtitle:result.procedures[i].subtype,
          name: result.procedures[i].username,
          action:"Postularse",
          lat: lat,
          lng: lng,
          upvotes:[1,1,1],
          downvotes:[1,1]
        }

        this.procedures.push(procedure);
      }
    //HARDCODED
    /*
    this.procedures = [
      {
        class:"primary",
        id:0,
        title: "AFIP",
        subtitle:"Monotributo",
        name: "Juan Perez",
        action:"Postularse",
        lat: -34.5185733,
        lng: -58.4177676,
        upvotes:[1,1,1],
        downvotes:[1,1]
      },
      {
        class:"primary",
        id:1,
        title: "Anses",
        subtitle:"Otros",
        name: "Jose Barrera",
        action:"Postularse",
        lat: -34.5185733,
        lng: -58.4177676,
        upvotes:[1],
        downvotes:[1,1,1,1]
      },
      {
        class:"primary",
        id:2,
        title: "Anses",
        subtitle:"Otros",
        name: "Francisco Paredes",
        action:"Postularse",
        lat: -34.5185733,
        lng: -58.4177676,
        upvotes:[1,1,1,1,1],
        downvotes:[]
      }
    ];
    */
 }
 public getProcedure(id) {
   var obj = this.procedures.filter(function(node) {
       return node.id == id;
   });

   return obj;
 }
 public onClick(id) {
   this.popupMapHide = true;
   this.popupInfoHide = true
   this.popupPostulateHide = false;

   this.MODAL_POPUP.title = "Seleccione una direccion";
   this.MODAL_POPUP.body = "";
   this.MODAL_POPUP.btn = "Aceptar";

   this.selectedID = id;

   this.popupModal.open();
 }
 public onPostulateResult(res) {
   var result = JSON.parse(res._body);
   var valid:boolean = false;

   this.popupMapHide = true;
   this.popupInfoHide = false;
   this.popupPostulateHide = true;

   if (result.status == "OK") {
     this.MODAL_POPUP.title = "POSTULACION EXITOSA";
     this.MODAL_POPUP.body = "Su postulacion fue realizada exitosamente.";
     this.MODAL_POPUP.btn = "Aceptar";
   } else {
     this.MODAL_POPUP.title = "ERROR";
     this.MODAL_POPUP.body = "La postulacion no pudo ser realizada, por favor intente nuevamente mas tarde.";
     this.MODAL_POPUP.btn = "Aceptar";
   }
   this.popupModal.open();
 }
  public onProcedureClick(id:number) {
    this.popupMapHide = false;
    this.popupInfoHide = true;
    this.popupPostulateHide = true;

    this.MODAL_POPUP.title = "Ubicacion del cliente";
    this.MODAL_POPUP.body = "";
    this.MODAL_POPUP.btn = "Aceptar";

    let procedure:any = this.getProcedure(id)[0];
    let label = procedure.name + " | " + procedure.title + " - " +  procedure.subtitle;

    console.log("id es " + label)
    this.marker = {
        name:label,
        icon:"http://maps.google.com/mapfiles/ms/micons/orange-dot.png",
        lat: procedure.lat,
        lng: procedure.lng
    };
  }

}
