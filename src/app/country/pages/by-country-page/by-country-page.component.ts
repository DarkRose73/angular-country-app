import {Component, inject, signal} from '@angular/core';
import {CountrySearchInputComponent} from "../../components/country-search-input/country-search-input.component";
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {CountryService} from '../../services/country.service';
import {of} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private readonly countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if (request.query === '' || !request.query) return of([]);
      return this.countryService.searchByCountry(request.query)
    },
  })

  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async ({request}) => {
  //     if (request.query === '' || !request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // })
}
