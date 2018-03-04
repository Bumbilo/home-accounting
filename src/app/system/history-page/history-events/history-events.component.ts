import { Component, Input, OnInit } from '@angular/core';
import { Category } from "../../shared/models/category.model";
import { WFMEvent } from "../../shared/models/event.model";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: WFMEvent[] = [];

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((event: WFMEvent) => {
      event.catName = this.categories.find(c => c._id === event.category)['name'];
    });
  }

  getEventClass(event: WFMEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income'
    };
  }

}
