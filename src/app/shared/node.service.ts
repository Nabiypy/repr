import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class AuthService {
  result: any;
  constructor(private http: Http) {}

  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/signup', body, {headers: headers})
      .map((response: Response) => this.result = response.json());
  }
  signIn(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/authenticate', body, {headers: headers})
      .map((response: Response) => this.result = response.json());
  }
  getUser(){
    return localStorage.getItem('userId');
  }
  logout() {
    localStorage.clear();
  }
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
