import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {Post} from '../shared/maker.model';
import {User} from '../shared/user.model';
import {PostService} from '../shared/post.service';
import {AuthService} from '../shared/node.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ProtectedComponent implements OnInit {
  error: any;
  userId: any;
  posts: Array<Post>;
  repr: Array<Post>;
  isLoading: boolean = false;
  constructor(private _postService: PostService, private authService: AuthService, public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        console.log('user user id ~ ', this.userId);
      }
    });
    this.userId = authService.getUser();
  }
  ngOnInit() {
    this._postService.getPosts()
      .subscribe(res => this.posts = res);
    console.log('all makers post ~', this.posts);
  }
  authorize(repr: Post) {
    console.log('authorize transaction >>' + this.repr);
    this._postService.sendPost(repr)
      .subscribe(
        reprocess => {
          this.router.navigateByUrl('/authorizer');
          console.log('vasgate response waiting... >>>');
          console.log('', reprocess);
        },
        error => { this.error = error; console.log('repr post error >>>', error); }
      );
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
