import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ModalModule } from 'ng2-modal';
import { AgmCoreModule } from '@agm/core';

import { RoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { ClientaccountComponent } from './components/client/clientaccount/clientaccount.component';
import { ClientproceduresComponent } from './components/client/clientprocedures/clientprocedures.component';
import { ClientregistComponent } from './components/client/clientregist/clientregist.component';
import { NewrequestComponent } from './components/client/newrequest/newrequest.component';
import { Newrequeststep1Component } from './components/client/newrequeststep1/newrequeststep1.component';
import { FormcancelComponent } from './components/client/widgets/formcancel/formcancel.component';
import { FormqualifyComponent } from './components/client/widgets/formqualify/formqualify.component';
import { FormpostulationsComponent } from './components/client/widgets/formpostulations/formpostulations.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninsuccessComponent } from './components/signinsuccess/signinsuccess.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PartneraccountComponent } from './components/partner/partneraccount/partneraccount.component';
import { PartnerlistrequestsComponent } from './components/partner/partnerlistrequests/partnerlistrequests.component';
import { PartnerproceduresComponent } from './components/partner/partnerprocedures/partnerprocedures.component';
import { PartnerregistComponent } from './components/partner/partnerregist/partnerregist.component';
import { HomeComponent } from './components/home/home.component';

import { RegistService } from './services/regist.service';
import { LoginService } from './services/login.service';

import { ModifyaccountService } from './services/modifyaccount.service';
import { RemoveaddressService } from './services/removeaddress.service';

import { NewprocedureService } from './services/newprocedure.service';
import { ProceduresService } from './services/procedures.service';
import { SignedComponent } from './components/signed/signed.component';

import { CancelprocedureService } from './services/cancelprocedure.service';
import { QualifyprocedureService } from './services/qualifyprocedure.service';
import { ContactComponent } from './components/contact/contact.component';
import { AccountComponent } from './components/account/account.component';

import { FormupdateComponent } from './components/partner/widgets/formupdate/formupdate.component';
import { PformqualifyComponent } from './components/partner/widgets/pformqualify/pformqualify.component';
import { FormpostulationComponent } from './components/partner/widgets/formpostulation/formpostulation.component';
import { ConfirmsuccessComponent } from './components/client/confirmsuccess/confirmsuccess.component';
import { AddaddressComponent } from './components/widgets/addaddress/addaddress.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientaccountComponent,
    ClientproceduresComponent,
    ClientregistComponent,
    NewrequestComponent,
    Newrequeststep1Component,
    FormcancelComponent,
    FormqualifyComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SigninsuccessComponent,
    PartnerComponent,
    PartneraccountComponent,
    PartnerlistrequestsComponent,
    PartnerproceduresComponent,
    PartnerregistComponent,
    HomeComponent,
    SignedComponent,
    FormpostulationsComponent,
    ContactComponent,
    AccountComponent,
    FormupdateComponent,
    PformqualifyComponent,
    FormpostulationComponent,
    ConfirmsuccessComponent,
    AddaddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUEZtKFF4YhRmJQ3qL_vE7SzY5BmIE-Pw'
    })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    RegistService,
    LoginService,
    ModifyaccountService,
    RemoveaddressService,
    NewprocedureService,
    ProceduresService,
    CancelprocedureService,
    QualifyprocedureService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
