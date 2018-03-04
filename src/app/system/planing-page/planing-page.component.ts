import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.sass']
})
export class PlaningPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(private billService: BillService,
              private categoryService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });

  }

  getCategoryCost(cat: Category) {
    return this.events
      .filter(event => event.category === cat._id && event.type === 'outcome')
      .reduce((acc, current) => {
        acc += current.amount;
        return acc;
      }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }


  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
