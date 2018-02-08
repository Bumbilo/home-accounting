import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UserService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  // get user information by ID
  getUserByEmail(email: string): Observable<User> {
    return this.get(`user/${email}`);
  }

  // create new user
  createNewUser(user: User): Observable<User> {
    return this.post('user', user);
  }

}
