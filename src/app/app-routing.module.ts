import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AddPatientComponent } from './pages/patients/add-patient.component';
import { AssociatedPatientsComponent } from './pages/patients/asc-patients.component';
import { DetPatientComponent } from './pages/patients/det-patient.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { AddProfessionalComponent } from './pages/professionals/add-professional.component';
import { InteractionsComponent } from './pages/interactions/interactions.component';
import { AttachmentsComponent } from './pages/attachments/attachments.component';
import { AddAttachmentComponent } from './pages/attachments/add-attachment.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AddPostComponent } from './pages/posts/add-post.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { ProfessionalComponent } from './professional/professional.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/roles/add-role.component';
import { RoleGuard } from './role.guard';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { AscProgramComponent } from './pages/programs/asc-program.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { AddCompanyComponent } from './pages/companies/add-company.component';
import { AddTreatmentComponent } from './pages/treatment/add-treatment.component';
import { AddInteractionComponent } from './pages/interactions/add-interaction.component';
import { AddProgramComponent } from './pages/programs/add-program.component';
import { GetInformationComponent } from './pages/patients/get-information.component';
import { ViewPatientsComponent } from './pages/patients/view-patients.component';
import { ViewPostsComponent } from './pages/posts/view-posts.component';
import { GroupsComponent } from './patient/groups/groups.component';
import { ViewChallengesComponent } from './pages/challenges/view-challenges.component';
import { FavouritesComponent } from './pages/posts/favourites/favourites.component';
import { ViewFavouritesComponent } from './pages/posts/view-favourites/view-favourites.component';
import { SegmentosComponent } from './pages/patients/segmentos/segmentos.component';
import { ReportsComponent } from './pages/reports/reports.component';


const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "*", component: PatientComponent, pathMatch: "full" },
  { path: "*", component: ProfessionalComponent, pathMatch: "full" },
  { path: "professional", component: ProfessionalComponent, children:
    [
      { path: "notifications", component: GetInformationComponent},
      { path: "patients", component: PatientsComponent, canActivate: [RoleGuard]},
      { path: "add-patient", component: AddPatientComponent, canActivate: [RoleGuard]},
      { path: "upd-patient/:id", component: AddPatientComponent, canActivate: [RoleGuard]},
      { path: "asc-patients", component: AssociatedPatientsComponent, canActivate: [RoleGuard]},
      { path: "view-patient/:id", component: ViewPatientsComponent},
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
      { path: "view-posts/:id", component: ViewPostsComponent, canActivate: [RoleGuard]},
      { path: "programs", component: ProgramsComponent, canActivate: [RoleGuard]},
      { path: "add-program", component: AddProgramComponent, canActivate: [RoleGuard]},
      { path: "upd-program/:id", component: AddProgramComponent, canActivate: [RoleGuard]},
      { path: "upd-treatment/:id", component: AddTreatmentComponent},
      { path: "asc-program/:patient", component: AscProgramComponent, canActivate: [RoleGuard]},
      { path: "asc-program/:patient/:id", component: AscProgramComponent, canActivate: [RoleGuard]},
      { path: "roles", component: RolesComponent, canActivate: [RoleGuard]},
      { path: "add-role", component: AddRoleComponent, canActivate: [RoleGuard]},
      { path: "upd-role/:id", component: AddRoleComponent, canActivate: [RoleGuard]},
      { path: "graphics", component: GraphicsComponent},
      { path: "companies", component: CompaniesComponent},
      { path: "add-company", component: AddCompanyComponent},
      { path: "upd-company/:id", component: AddCompanyComponent},
      {path: "reportes", component: ReportsComponent, canActivate: [RoleGuard]}
    ]
  },
  { path: "segments", component: SegmentosComponent},
  { path: "patient", component: PatientComponent, pathMatch: "full"},
  { path: "favourites", component: ViewFavouritesComponent},
  { path: "patient/groups", component: GroupsComponent, pathMatch: "full" },
  { path: "patient/groups/:id", component: GroupsComponent, pathMatch: "full" },
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
