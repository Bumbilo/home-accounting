import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  // Get the amount of money on the account
  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  // Get currency from other API
  getCurrency(base: string = 'USD'): Observable<any> {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`)
      .map((response: Response) => response.json());
  }

  updateBill(bill: Bill, url): Observable<Bill> {
    return this.put(`bill/${url}`, bill);
  }

}
