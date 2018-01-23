import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  // validation response
  getResponse(response: Response) {
   if (response._body) {
      return response.json();
   }
   return null;
 }

  // get user information by ID
  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:8000/user/${email}`)
    .map((response: Response) => this.getResponse(response));
  }
}
