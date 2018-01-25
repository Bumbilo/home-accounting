import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

   form: FormGroup;
   message: Message;

  constructor(
     private userService: UserService,
     private authService: AuthService,
     private router: Router,
     private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params)
      if(params['nowCanLogin']) {
        console.log('true', this)
        this.showMessage('Invalid password !!!', 'danger');
        this.showMessage('Now you can enter to system !!!', 'success')
      }
    });

  // vsalidation form before send form
   this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  // show error messege if auth invalid
  private showMessage(text: string, type: string ) {
    this.message = new Message(type , text);
    // hide message after 5 second
    window.setTimeout(() => {
      this.message = new Message('danger', '');
    }, 5000);
  }

  // send form for auth
  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password == formData.password) {
           window.localStorage.setItem('user', JSON.stringify(user));
           this.authService.login();
           // this.router.navigate([''])
        } else {
          this.showMessage('Invalid password !!!', 'danger');
        }
      } else {
        this.showMessage('User is not found !!!', 'danger');
      }
    });
  }

}
