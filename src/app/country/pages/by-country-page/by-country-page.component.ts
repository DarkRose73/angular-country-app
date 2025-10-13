import {Component, inject, resource, signal} from '@angular/core';
import {CountrySearchInputComponent} from "../../components/country-search-input/country-search-input.component";
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {CountryService} from '../../services/country.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private readonly countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async ({request}) => {
      if (request.query === '' || !request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  })


}
