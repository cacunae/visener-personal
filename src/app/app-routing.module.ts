import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { PatientComponent } from './patient/patient.component';
import { ProfessionalComponent } from './professional/professional.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ViewPostsComponent } from './professional/view-posts/view-posts.component';
import { PatientsComponent } from './administrator/patients/patients.component';
import { AddPatientComponent } from './administrator/patients/add-patient.component';
import { ProfessionalsComponent } from './administrator/professionals/professionals.component';
import { AddProfessionalComponent } from './administrator/professionals/add-professional.component';
import { InteractionsComponent } from './administrator/interactions/interactions.component';
import { AddInteractionComponent } from './administrator/interactions/add-interaction.component';
import { AttachmentsComponent } from './administrator/attachments/attachments.component';
import { AddAttachmentComponent } from './administrator/attachments/add-attachment.component';
import { PostsComponent } from './administrator/posts/posts.component';
import { AddPostComponent } from './administrator/posts/add-post.component';
import { ViewPostsAssociateComponent } from './professional/view-posts/view-posts-associate.component';
import { TreatmentsComponent } from './administrator/treatments/treatments.component';
import { AddTreatmentComponent } from './administrator/treatments/add-treatment.component';
import { ViewTreatmentsComponent } from './professional/view-treatments/view-treatments.component';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "*", component: PatientComponent, pathMatch: "full" },
  { path: "*", component: ProfessionalComponent, pathMatch: "full" },
  { path: "*", component: AdministratorComponent, pathMatch: "full" },
  { path: "administrator", component: AdministratorComponent, children:
    [
      { path: "patients", component: PatientsComponent},
      { path: "add-patient", component: AddPatientComponent},
      { path: "upd-patient/:id", component: AddPatientComponent},
      { path: "professionals", component: ProfessionalsComponent},
      { path: "add-professional", component: AddProfessionalComponent},
      { path: "upd-professional/:id", component: AddProfessionalComponent},
      { path: "interactions", component: InteractionsComponent},
      { path: "add-interaction", component: AddInteractionComponent},
      { path: "upd-interaction/:id", component: AddInteractionComponent},
      { path: "attachments", component: AttachmentsComponent},
      { path: "add-attachment", component: AddAttachmentComponent},
      { path: "upd-attachment/:id", component: AddAttachmentComponent},
      { path: "posts", component: PostsComponent},
      { path: "add-post", component: AddPostComponent},
      { path: "upd-post/:id", component: AddPostComponent},
      { path: "treatments", component: TreatmentsComponent},
      { path: "add-treatments", component: AddTreatmentComponent},
      { path: "upd-treatments/:id", component: AddTreatmentComponent}
    ]
  },
  { path: "professional", component: ProfessionalComponent, children: 
    [
      { path: "view-posts", component: ViewPostsAssociateComponent},
      { path: "view-treatments", component: ViewTreatmentsComponent},
    ]
  },
  { path: "patient", component: PatientComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "patient", loadChildren: () => import('./patient/patient.component').then(m => m.PatientComponent)},
  { path: "professional", loadChildren: () => import('./professional/professional.component').then(m => m.ProfessionalComponent)},
  { path: "administrator", loadChildren: () => import('./administrator/administrator.component').then(m => m.AdministratorComponent)},
  
  { path: "login", loadChildren: () => import('./login/login.component').then(m => m.LoginComponent)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, paramsInheritanceStrategy: 'always', useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
