import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  isLoaded = false;
  euro: number;
  rub: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency
    this.rub = rates['RUB'] * this.bill.value;
    this.euro = rates['EUR'] * this.bill.value;

    console.log(this.currency);
  }

}
