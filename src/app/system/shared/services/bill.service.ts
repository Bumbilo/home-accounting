import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: Http) {
  }

  // Get the amount of money on the account
  getBill(): Observable<Bill> {
    return this.http.get('http://localhost:8000/bill')
      .map((response: Response) => response.json());
  }

  // Get currency from other API
  getCurrency(base: string = 'USD'): Observable<any> {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`)
      .map((response: Response) => response.json());
  }

}
