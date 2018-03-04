import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((item) => {
      if (!isNaN(item[field])) {
        item[field] += '';
      }

      if (field === 'category') {
        item[field] = item['catName'];
      }

      return item[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
