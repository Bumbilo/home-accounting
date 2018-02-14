import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() newCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = '5a834936734d1d1523daef08';
  currentCategory: Category;


  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.onCategoryChange();
  }


  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c._id === this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, this.currentCategoryId);

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
      console.log(category);
    });
  }

}
