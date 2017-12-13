import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { LaddaModule } from 'angular2-ladda';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProtectedComponent } from './protected/protected.component';
import { MakersComponent } from './dashboard/makers/makers.component';
import { SignupComponent } from './dashboard/signup/signup.component';
import { LoginComponent } from './dashboard/login/login.component';
import { EmailComponent } from './dashboard/email/email.component';

import { AuthGuard } from './auth.guard';
import { LengthPipe } from './shared/length.pipe';
import { PostService } from './shared/post.service';
import { AuthService } from './shared/node.service';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBjefjJRGjquf5Qb7Eg-DqlcDRLZAE0pxs',
  authDomain: 'pyauth-19403.firebaseapp.com',
  databaseURL: 'https://pyauth-19403.firebaseio.com',
  storageBucket: 'pyauth-19403.appspot.com',
  messagingSenderId: '261918014934'
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProtectedComponent,
    MakersComponent,
    SignupComponent,
    LoginComponent,
    EmailComponent,
    LengthPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    LaddaModule
    .forRoot({
            style: "expand-right"
        })
  ],
  providers: [AuthGuard, PostService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
