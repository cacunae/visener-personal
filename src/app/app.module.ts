import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { ChartComponent } from './pages/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { PatientComponent } from './patient/patient.component';
import { PopupComponent } from './pages/popup/popup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { ChecklistModule } from 'angular-checklist';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { fechaFormateada, weekDays, tagFilter, postFilter, interactionFilter, image, video, featuresPipe, postnamePipe, interactionnamePipe, programFilter, fechaFormateadaCorta, treatmentActivePipe } from './services/data.service';
import { PostComponent } from './pages/posts/post.component';
import { InteractionComponent } from './pages/interactions/interaction.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';

import { PatientsComponent } from './pages/patients/patients.component';
import { AddPatientComponent } from './pages/patients/add-patient.component';
import { AssociatedPatientsComponent } from './pages/patients/asc-patients.component';
import { DialogDelPatientsComponent } from './pages/patients/dialog-del-patients.component';
import { DetPatientComponent } from './pages/patients/det-patient.component';
import { ViewPatientsComponent } from './pages/patients/view-patients.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { AddProfessionalComponent } from './pages/professionals/add-professional.component';
import { InteractionsComponent } from './pages/interactions/interactions.component';
import { AddInteractionComponent } from './pages/interactions/add-interaction.component';
import { AttachmentsComponent } from './pages/attachments/attachments.component';
import { AddAttachmentComponent } from './pages/attachments/add-attachment.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AddPostComponent } from './pages/posts/add-post.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AddProgramComponent } from './pages/programs/add-program.component';
import { AscProgramComponent } from './pages/programs/asc-program.component';
import { DialogProgramComponent} from './pages/programs/dialog-program.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/roles/add-role.component'
import { DialogAddRelationComponent } from './pages/dialog-add-relation/dialog-add-relation.component';
import { DialogAttachmentComponent } from './pages/dialog-attachment/dialog-attachment.component'; 
import { DialogInteractionComponent } from './pages/dialog-interaction/dialog-interaction.component';
import { CommentComponent } from './pages/dialog-comment/comment.component';
import { PasswordComponent } from './pages/dialog-password/password.component';
import { DisableComponent } from './pages/dialog-disable/disable.component';
import { WeblogComponent } from './pages/dialog-weblog/weblog.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';


import { ProfessionalComponent } from './professional/professional.component';
import { PdfComponent } from './old-professional/pdf/pdf.component';

import { ViewPostsComponent } from './pages/posts/view-posts.component';
import { HeaderComponent } from './header/header.component';
import { AssociateComponent } from './pages/posts/associate.component';
import { PatientTreatmentComponent } from './old-professional/patient-treatment/patient-treatment.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { AddCompanyComponent } from './pages/companies/add-company.component';
import { AddTreatmentComponent } from './pages/treatment/add-treatment.component';
import { ChartPatientProgramsComponent } from './pages/patients/chart-patient-programs.component';
import { ViewTreatmentsComponent } from './old-professional/view-treatments/view-treatments.component';
import { ViewInteractionComponent } from './pages/dialog-interaction/view-interaction.component';
import { EnableComponent } from './patient/enable.component';
import { GetInformationComponent } from './pages/patients/get-information.component';
import { DialogReAsingComponent } from './pages/dialog-re-asing/dialog-re-asing.component';
import { GroupsComponent } from './patient/groups/groups.component';
import { AddGroupComponent } from './patient/groups/add-group.component';
import { MentionModule } from 'angular-mentions';
import { NgMentionModule } from 'angular-mention';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    PasswordComponent,
    DialogAttachmentComponent,
    DialogInteractionComponent,
    LoginComponent,
    WeblogComponent,
    AddPostComponent,
    PatientComponent,
    ProfessionalComponent,
    PatientsComponent,
    AddPatientComponent,
    DetPatientComponent,
    AssociatedPatientsComponent,
    ProfessionalsComponent,
    AddProfessionalComponent,
    InteractionsComponent,
    AddInteractionComponent,
    RolesComponent,
    AddRoleComponent,
    fechaFormateada,
    fechaFormateadaCorta,
    treatmentActivePipe,
    weekDays, tagFilter, programFilter, postFilter, interactionFilter, image, video, featuresPipe, postnamePipe, interactionnamePipe,
    PopupComponent,
    AddProgramComponent,
    AscProgramComponent,
    DialogProgramComponent,
    PdfComponent,
    ChartComponent,
    PostComponent,
    InteractionComponent,
    TreatmentComponent,
    AttachmentsComponent,
    AddAttachmentComponent,
    DialogAddRelationComponent,
    ProgramsComponent,
    ViewPostsComponent,
    HeaderComponent,
    PostsComponent,
    AssociateComponent,
    PatientTreatmentComponent,
    GraphicsComponent,
    CompaniesComponent,
    AddCompanyComponent,
    AddTreatmentComponent,
    ChartPatientProgramsComponent,
    ViewTreatmentsComponent,
    DisableComponent,
    EnableComponent,
    ViewInteractionComponent,
    DialogDelPatientsComponent,
    ViewPatientsComponent,
    GetInformationComponent,
    DialogReAsingComponent,
    GroupsComponent,
    AddGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatSliderModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,  
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ChecklistModule,
    MatListModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    DragDropModule,
    ChartsModule,
    MentionModule,
    NgMentionModule
  ],
  providers: [CookieService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
