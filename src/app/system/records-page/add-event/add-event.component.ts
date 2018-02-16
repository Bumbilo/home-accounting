import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit {
  @Input() categories: Category
  constructor() { }

  ngOnInit() {
  }

}
