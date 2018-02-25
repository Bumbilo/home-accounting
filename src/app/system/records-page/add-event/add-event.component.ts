import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { WFMEvent } from '../../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit {
  @Input() categories: Category;
  public currentCategory;
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Expenditure'},
  ];


  constructor() {
  }

  ngOnInit() {
    this.currentCategory = this.categories[0];
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    let {amount, description, category, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }

    const event = new WFMEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    console.log(event);

  }

}
