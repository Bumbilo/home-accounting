import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.sass']
})
export class RecordsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newCategoryAdded(category: Category) {
    console.log(category);
  }

}
