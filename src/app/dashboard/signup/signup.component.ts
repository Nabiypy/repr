import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/node.service';
import { User } from '../../shared/user.model';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  error: any;
  constructor(public authService: AuthService, private router: Router) {}
  onSubmit() {
    const user = new User(
      this.myForm.value.username,
      this.myForm.value.password,
      this.myForm.value.email
    );
    this.authService.signUp(user)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('login');
        },
        error => { this.error = error; console.error(error)}
      );
    this.myForm.reset();
  }
  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

}

