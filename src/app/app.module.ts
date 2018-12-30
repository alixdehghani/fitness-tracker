import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainigComponent } from './training/current-trainig/current-trainig.component';
import { NewTrainigComponent } from './training/new-trainig/new-trainig.component';
import { PastTrainigComponent } from './training/past-trainig/past-trainig.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenaveListComponent } from './navigation/sidenave-list/sidenave-list.component';
import { StopCurrentTrainingComponent } from './training/current-trainig/stop-current-training/stop-current-training.component';
import { AuthService } from './auth/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainigComponent,
    NewTrainigComponent,
    PastTrainigComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenaveListComponent,
    StopCurrentTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [AuthService ],
  bootstrap: [AppComponent],
  entryComponents: [StopCurrentTrainingComponent]
})
export class AppModule { }
