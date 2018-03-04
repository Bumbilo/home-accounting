import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from "../shared/services/categories.service";
import { EventsService } from "../shared/services/events.service";
import { Observable } from "rxjs/Observable";
import { Category } from "../shared/models/category.model";
import { WFMEvent } from "../shared/models/event.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  chartData = []

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.categories.forEach((cat: Category) => {
      const catEvents = this.events.filter((event: WFMEvent) => event.category === cat._id && event.type === 'outcome');
      this.chartData.push({
        name: cat.name, value: catEvents.reduce((acc, current) => {
          acc += current.amount;
          return acc;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
