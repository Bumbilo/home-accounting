import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';

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
  filteredEvents: WFMEvent[] = [];
  chartData = [];
  isFilterVisible = false;

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

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.categories.forEach((cat: Category) => {
      const catEvents = this.filteredEvents.filter((event: WFMEvent) => event.category === cat._id && event.type === 'outcome');
      this.chartData.push({
        name: cat.name, value: catEvents.reduce((acc, current) => {
          acc += current.amount;
          return acc;
        }, 0)
      });
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private toggleFilterVisibility(dir: boolean): void {
    this.isFilterVisible = dir;
  }

  openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((event) => {
        return filterData.types.indexOf(event.type) !== -1;
      })
      .filter((event) => {
        return filterData.categories.indexOf(event.category) !== -1;
      })
      .filter((event) => {
        const momentDate = moment(event.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterCancel(): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
