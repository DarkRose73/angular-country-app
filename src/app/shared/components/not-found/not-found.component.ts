import {Component, inject} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'shared-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  location: Location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
