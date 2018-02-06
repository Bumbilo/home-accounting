import { Component, OnInit } from '@angular/core';
import {BillService} from "../shared/services/bill.service";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
  }

}
