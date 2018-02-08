import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent {
  @Input() currency: any;
  currentcies: string[] = ['RUB', 'EUR'];


}
