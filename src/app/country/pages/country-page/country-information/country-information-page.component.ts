import {Component, input} from '@angular/core';
import {ICountry} from '../../../interfaces/country.interface';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information-page.component.html'
})
export class CountryInformationPageComponent {

  country = input.required<ICountry>();
}
