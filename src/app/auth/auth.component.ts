import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeStateTriger } from "../shared/animations/fade.amination";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTriger]
})

export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.navigate(['/login']);
  }

}
