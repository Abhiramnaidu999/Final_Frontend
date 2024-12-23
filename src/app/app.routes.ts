import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelpsComponent } from './helps/helps.component';
import { ScholarshipsOfferedComponent } from './scholarships-offered/scholarships-offered.component';
import { WhoareEligibleComponent } from './whoare-eligible/whoare-eligible.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { ReasonsForRejectionComponent } from './reasons-for-rejection/reasons-for-rejection.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { ScholarshipFormComponent } from './scholarship-form/scholarship-form.component';
import { MinistryComponent } from './ministry/ministry.component';
import { MinistryLoginComponent } from './ministry-login/ministry-login.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { InstituteLoginComponent } from './institute-login/institute-login.component';
import { InstituteRegisterComponent } from './institute-register/institute-register.component';
import { InstituteHomeComponent } from './institute-home/institute-home.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';

import { NodalLoginComponent } from './nodal-login/nodal-login.component';
import { NodalHomeComponent } from './nodal-home/nodal-home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';





export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  { path: 'helps', component: HelpsComponent },
  {path:'scholarship',component:ScholarshipsOfferedComponent},
  {path:'WhoareEligible',component:WhoareEligibleComponent},
  {path:'timeline',component:TimeLineComponent},
  {path:'Reasons',component:ReasonsForRejectionComponent},
   {path:'student-home',component:StudentHomeComponent},
  { path: 'apply-scholarship', component: ScholarshipFormComponent },
  {path:'ministry',component:MinistryLoginComponent},
  {path:'MinistryH',component:MinistryComponent},
  {path:'student-application',component:StudentApplicationComponent},
  {path:'about-us',component:AboutusComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'studentL',component:StudentLoginComponent},
  {path:'studentR',component:StudentRegisterComponent},
  {path:'studentH',component:StudentHomeComponent},
  {path:'instituteL',component:InstituteLoginComponent},
  {path:'instituteR',component:InstituteRegisterComponent},
  {path:'instituteH/:instituteCode',component:InstituteHomeComponent},
  {path:'register-success',component:RegisterSuccessComponent},
  {path:'nodal',component:NodalLoginComponent},
  {path:'nodalH',component:NodalHomeComponent},
  {path:'privacypolicy',component:PrivacyPolicyComponent}


];
