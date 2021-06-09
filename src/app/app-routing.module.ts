import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { PatientComponent } from './patient/patient.component';
import { ViewPostsComponent } from './old-professional/view-posts/view-posts.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AddPatientComponent } from './pages/patients/add-patient.component';
import { AssociatedPatientsComponent } from './pages/patients/asc-patients.component';
import { DetPatientComponent } from './pages/patients/det-patient.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { AddProfessionalComponent } from './pages/professionals/add-professional.component';
import { InteractionsComponent } from './pages/interactions/interactions.component';
import { AddInteractionComponent } from './pages/interactions/add-interaction.component';
import { AttachmentsComponent } from './pages/attachments/attachments.component';
import { AddAttachmentComponent } from './pages/attachments/add-attachment.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AddPostComponent } from './pages/posts/add-post.component';
import { ViewPostsAssociateComponent } from './old-professional/view-posts/view-posts-associate.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { AddTreatmentComponent } from './pages/treatments/add-treatment.component';
import { ViewTreatmentsComponent } from './old-professional/view-treatments/view-treatments.component';
import { PatientTreatmentComponent } from './old-professional/patient-treatment/patient-treatment.component';
import { ProfessionalComponent } from './professional/professional.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/roles/add-role.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "*", component: PatientComponent, pathMatch: "full" },
  { path: "*", component: ProfessionalComponent, pathMatch: "full" },
  { path: "professional", component: ProfessionalComponent, children:
    [
      { path: "patients", component: PatientsComponent, canActivate: [RoleGuard]},
      { path: "add-patient", component: AddPatientComponent, canActivate: [RoleGuard]},
      { path: "upd-patient/:id", component: AddPatientComponent, canActivate: [RoleGuard]},
      { path: "asc-patients", component: AssociatedPatientsComponent, canActivate: [RoleGuard]},
      { path: "det-patient/:id", component: DetPatientComponent, canActivate: [RoleGuard]},
      { path: "professionals", component: ProfessionalsComponent, canActivate: [RoleGuard]},
      { path: "add-professional", component: AddProfessionalComponent, canActivate: [RoleGuard]},
      { path: "upd-professional/:id", component: AddProfessionalComponent, canActivate: [RoleGuard]},
      { path: "interactions", component: InteractionsComponent, canActivate: [RoleGuard]},
      { path: "add-interaction", component: AddInteractionComponent, canActivate: [RoleGuard]},
      { path: "upd-interaction/:id", component: AddInteractionComponent, canActivate: [RoleGuard]},
      { path: "attachments", component: AttachmentsComponent, canActivate: [RoleGuard]},
      { path: "add-attachment", component: AddAttachmentComponent, canActivate: [RoleGuard]},
      { path: "upd-attachment/:id", component: AddAttachmentComponent, canActivate: [RoleGuard]},
      { path: "posts", component: PostsComponent, canActivate: [RoleGuard]},
      { path: "add-post", component: AddPostComponent, canActivate: [RoleGuard]},
      { path: "upd-post/:id", component: AddPostComponent, canActivate: [RoleGuard]},
      { path: "treatments", component: TreatmentsComponent, canActivate: [RoleGuard]},
      { path: "add-treatment", component: AddTreatmentComponent, canActivate: [RoleGuard]},
      { path: "upd-treatment/:id", component: AddTreatmentComponent, canActivate: [RoleGuard]},
      { path: "roles", component: RolesComponent, canActivate: [RoleGuard]},
      { path: "add-role", component: AddRoleComponent, canActivate: [RoleGuard]},
      { path: "upd-role/:id", component: AddRoleComponent, canActivate: [RoleGuard]}
    ]
  },
  { path: "old-professional", component: ProfessionalComponent, children: 
    [
      { path: "patients", component: PatientsComponent},
      { path: "posts", component: ViewPostsAssociateComponent},
      { path: "treatments", component: PatientTreatmentComponent},
      { path: "add-treatments", component: ViewTreatmentsComponent},
    ]
  },
  { path: "patient", component: PatientComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "patient", loadChildren: () => import('./patient/patient.component').then(m => m.PatientComponent)},
  { path: "professional", loadChildren: () => import('./professional/professional.component').then(m => m.ProfessionalComponent)},
  
  { path: "login", loadChildren: () => import('./login/login.component').then(m => m.LoginComponent)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, paramsInheritanceStrategy: 'always', useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
