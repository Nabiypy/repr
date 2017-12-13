import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/node.service';
import { User } from '../../shared/user.model';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {
  myForm: FormGroup;
  error: any;
  isLoading: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('call isLoggedIn method >>>');
      this.router.navigate(['/makers']);
    }
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    console.log('user login');
    const user = new User(this.myForm.value.username, this.myForm.value.password);
    this.authService.signIn(user)
      .subscribe(
        data => {
          this.isLoading = true;
          console.log('login response data >>>', data)
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user);
          if(data.role == '4') {
             this.router.navigateByUrl('/authorizer');
             this.isLoading = true;
          }else{
            this.router.navigateByUrl('/makers');
            this.isLoading = true;
          }
          
        },
        error => {this.error = 'Oops! an error occured...'; console.log('login error', this.error)}
      );
    this.myForm.reset();
  }

}
