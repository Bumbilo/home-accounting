import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
   this.message = new Message();

  // Validation form before send form
   this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  // Method show error messege if auth invalid
  private showMessage(text: string, type: string ) {
  console.log('arguments ===>', arguments)
    this.message = new Message(type , text);
    window.setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  // Method send form for auth
  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
        } else {
          this.showMessage('Invalid password !!!');
        }
      } else {
        this.showMessage('User is not found !!!');
      }
    });
  }

}
