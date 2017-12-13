import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from './maker.model';
import { AuthService } from './node.service';

@Injectable()
export class PostService {
  result: any;
  userId: any;
  constructor(private _http: Http, private authService: AuthService) { }
  getPosts() {
    return this._http.get('/api/makers')
      .map(result => this.result = result.json());
  }
  getPost(id) {
    return this._http.get('/api/details/' + id)
      .map(result => this.result = result.json());
  }
  insertPost(post: Post) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    post.userId = this.authService.getUser();
    return this._http.post('/api/repr', JSON.stringify(post), options)
      .map(result => this.result = result.json());
  }
  sendPost(repr: Post) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this._http.post('/api/authorize', JSON.stringify(repr), options)
      .map(result => this.result = result.json());
  }

  declinePost(repr: Post) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this._http.post('/api/authorize', JSON.stringify(repr), options)
      .map(result => this.result = result.json());
  }
}
