import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { WFMEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category;

  public currentCategory;
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Expenditure'},
  ];
  sub1: Subscription;
  sub2: Subscription;
  message: Message;

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.currentCategory = this.categories[0];
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }

    this.sub1 = this.billService.getBill().subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          // Error
          this.showMessage(`There are not enough funds on the account. You need ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }
      this.sub2 = this.billService.updateBill({value, currency: bill.currency}, bill['_id'])
        .mergeMap(() => this.eventsService.addEvent(event))
        .subscribe(() => {
          form.setValue({
            amount: 0,
            description: '',
            category: this.currentCategory,
            type: 'outcome'
          });
        });
    });
    const event = new WFMEvent(type, moment().format('DD.MM.YYYY HH:mm:ss'), amount, +category, description);
  }


  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
