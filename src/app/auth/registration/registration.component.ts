import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

   form: FormGroup

  constructor(
     private userService: UserService,
     private router: Router,
  ) { }

  ngOnInit() {
     this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'name': new FormControl(null, [Validators.required]),
        'agree': new FormControl(false, [Validators.requiredTrue]),
     })
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    console.log(user);
    this.userService.createNewUser(user)
        .subscribe((user: User) => {
          this.router.navigate(['/login'], {
            queryParams: { nowCanLogin: true }
          });
        });
  }

}
