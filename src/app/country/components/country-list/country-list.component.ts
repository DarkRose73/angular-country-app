import { Component, input } from '@angular/core';
import { ICountry } from '../../interfaces/country.interface';
import {DecimalPipe} from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [
    DecimalPipe,
    RouterModule,
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries = input.required<ICountry[]>();
}
