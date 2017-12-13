import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;
  state = '';
  error: any;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/makers');
        console.log('auth state ~', auth);
      }
    });
  }

  loginFb() {
    // this.afAuth.auth.login({
    //   provider: AuthProviders.Facebook,
    //   method: AuthMethods.Popup,
    // }).then(
    //   (success) => {
    //        console.log('facebook login >>>',success);
    //     this.router.navigate(['/members']);
    //   }).catch(
    //   (err) => {
    //     this.error = err;
    //   })
    console.log('facebook login >>');
  }

  loginGoogle() {
    // this.afAuth.auth.login({
    //   provider: AuthProviders.Google,
    //   method: AuthMethods.Popup,
    // }).then(
    //   (success) => {
    //     this.router.navigate(['/members']);
    //   }).catch(
    //   (err) => {
    //     this.error = err;
    //   })
    console.log('google login >>');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  login() {
    // this.afAuth.auth.signInAnonymously();
    this.error = 'service available for guest only'
    console.log('login access');
  }
  ngOnInit() {
  }

}
