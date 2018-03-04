import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.sass']
})
export class HistoryChartComponent implements OnInit {
  @Input() data;

  constructor() {
  }

  ngOnInit() {
  }
}
