import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserMainViewComponent } from './pages/user-main-view/user-main-view.component';
import { AdminMainViewComponent } from './pages/admin-main-view/admin-main-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule} from '@angular/material/core';
import { UserFormDialogboxComponent } from './pages/user-form-dialogbox/user-form-dialogbox.component';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserProgramPresentationComponent } from './pages/user-program-presentation/user-program-presentation.component';
import { UserStepperMainComponent } from './pages/user-stepper-main/user-stepper-main.component';
import { UserLandingPageComponent } from './pages/user-landing-page/user-landing-page.component';
import { UserDiskSideAComponent } from './pages/user-disk-side-a/user-disk-side-a.component';
import { UserDiskSideBComponent } from './pages/user-disk-side-b/user-disk-side-b.component';
import { AnimatedArrowComponent } from './pages/animated-arrow/animated-arrow.component';
import { UserPrintLayoutComponent } from './pages/user-print-layout/user-print-layout.component';
import { AdminMainPanelComponent } from './pages/admin-main-panel/admin-main-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    UserMainViewComponent,
    AdminMainViewComponent,
    UserFormDialogboxComponent,
    UserProgramPresentationComponent,
    UserStepperMainComponent,
    UserLandingPageComponent,
    UserDiskSideAComponent,
    UserDiskSideBComponent,
    AnimatedArrowComponent,
    UserPrintLayoutComponent,
    AdminMainPanelComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [
    provideClientHydration(),
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
