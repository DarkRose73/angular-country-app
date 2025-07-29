import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
