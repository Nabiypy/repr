import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';
import {Post} from '../../shared/maker.model';
import {PostService} from '../../shared/post.service';
import {AuthService} from '../../shared/node.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html',
  styleUrls: ['./makers.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MakersComponent implements OnInit {
  name: any;
  userId: any;
  error: any;
  state = '';
  isLoading: boolean = false;
  postForm: FormGroup;
    constructor(
      private _postService: PostService,
      private authService: AuthService,
      fb: FormBuilder,
      public afAuth: AngularFireAuth,
      private router: Router) {
      this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.userId = auth.uid;
        console.log('user user id ~ ', this.userId);
      }
    });

    this.postForm = fb.group({
      'account' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      'reference' : [null, Validators.required],
      'product' : [null, Validators.required],
      'amountPaid' : [null, Validators.required],
      'bug' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(100)])]
    });
    this.userId = this.authService.getUser();
  }
  ngOnInit() {}
  addPost(post: Post) {
    this._postService.insertPost(post)
      .subscribe(
        newPost => {
        // this.router.navigateByUrl('/makers');
        console.log('newPost >>>', newPost);
        },
        error => { this.error = error; console.log('new post error >>>',error); }
      );
      this.postForm.reset();
     
  }
  isLoggedIn() {
    console.log('current user logged in.');
    return this.authService.isLoggedIn();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    console.log('Goodbye... :)');
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
    console.log('logout now');
  }
}
