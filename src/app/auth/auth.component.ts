import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {

  constructor(private _router: Router) {

  }

  ngOnInit() {
    this._router.navigate(['/login']);
  }

}
