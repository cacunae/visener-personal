import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAttachmentComponent } from './administrator/dialog-attachment/dialog-attachment.component'; 
import { DialogInteractionComponent } from './dialog-interaction/dialog-interaction.component'; 
import { WeblogComponent } from './dialog-weblog/weblog.component'; 
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
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { PatientComponent } from './patient/patient.component';
import { PopupComponent } from './popup/popup.component';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommentComponent } from './dialog-comment/comment.component';
import { PasswordComponent } from './dialog-password/password.component';
import { fechaFormateada, weekDays, tagFilter, image, video } from './services/data.service';
import { PostComponent } from './post/post.component';

import { AdministratorComponent } from './administrator/administrator.component';
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

import { ProfessionalComponent } from './professional/professional.component';
  import { TreatmentsComponent } from './professional/treatments/treatments.component';
  import { AddTreatmentComponent } from './professional/add-treatment/add-treatment.component';
  import { PdfComponent } from './professional/pdf/pdf.component';

import { DialogAddRelationComponent } from './administrator/dialog-add-relation/dialog-add-relation.component';
import { ViewPostsComponent } from './professional/view-posts/view-posts.component';
import { ViewPostsAssociateComponent } from './professional/view-posts/view-posts-associate.component';
import { HeaderComponent } from './header/header.component';
import { AssociateComponent } from './professional/view-posts/associate.component';

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
    AdministratorComponent,
    AddPatientComponent,
    ProfessionalsComponent,
    AddProfessionalComponent,
    InteractionsComponent,
    AddInteractionComponent,
    fechaFormateada,
    weekDays, tagFilter, image, video,
    PopupComponent,
    AddTreatmentComponent,
    PdfComponent,
    ChartComponent,
    PostComponent,
    AttachmentsComponent,
    AddAttachmentComponent,
    DialogAddRelationComponent,
    TreatmentsComponent,
    ViewPostsComponent,
    PatientsComponent,
    HeaderComponent,
    PostsComponent,
    AssociateComponent,
    ViewPostsAssociateComponent,
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
    MatProgressSpinnerModule,
    MatBadgeModule,
    DragDropModule,
    ChartsModule
  ],
  providers: [CookieService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
