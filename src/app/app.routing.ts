import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { PartnerregistComponent } from './components/partner/partnerregist/partnerregist.component';
import { ClientregistComponent } from './components/client/clientregist/clientregist.component';

import { PartnerComponent } from './components/partner/partner.component';
import { ClientComponent } from './components/client/client.component';

import { NewrequestComponent } from './components/client/newrequest/newrequest.component';
import { Newrequeststep1Component } from './components/client/newrequeststep1/newrequeststep1.component';
import { ClientproceduresComponent } from './components/client/clientprocedures/clientprocedures.component';
import { ClientaccountComponent } from './components/client/clientaccount/clientaccount.component';

import { PartnerlistrequestsComponent } from './components/partner/partnerlistrequests/partnerlistrequests.component';
import { PartnerproceduresComponent } from './components/partner/partnerprocedures/partnerprocedures.component';
import { PartneraccountComponent } from './components/partner/partneraccount/partneraccount.component';

import { SigninsuccessComponent } from './components/signinsuccess/signinsuccess.component';
import { ContactComponent } from './components/contact/contact.component';
import { AccountComponent } from './components/account/account.component';
import { ConfirmsuccessComponent } from './components/client/confirmsuccess/confirmsuccess.component';

const APP_ROUTES:Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'registpartner',
    component: PartnerregistComponent
  },
  {
    path: 'registclient',
    component: ClientregistComponent
  },
  {
    path: 'signinsuccess',
    component: SigninsuccessComponent
  },

  {
    path: 'partner',
    component: PartnerComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },

  {
    path: 'partnerlistrequests',
    component: PartnerlistrequestsComponent
  },
  {
    path: 'partnerprocedures',
    component: PartnerproceduresComponent
  },
  {
    path: 'partneraccount',
    component: AccountComponent
    //component: PartneraccountComponent
  },

  {
    path: 'newrequest',
    component: NewrequestComponent
  },
  {
    path: 'newrequeststep1',
    component: Newrequeststep1Component
  },
  {
    path: 'clientprocedures',
    component: ClientproceduresComponent
  },
  {
    path: 'clientaccount',
    component: AccountComponent
    //component: ClientaccountComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'confirmsuccess',
    component: ConfirmsuccessComponent
  }

];
export const RoutingModule = RouterModule.forRoot(APP_ROUTES, {useHash: true});
