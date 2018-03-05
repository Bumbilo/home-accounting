import { Component, HostBinding } from '@angular/core';
import { fadeStateTriger } from '../shared/animations/fade.amination';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTriger]
})

export class SystemComponent {
  @HostBinding('@fade') a = true;
}
