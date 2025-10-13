import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CountrySearchInputComponent} from "../../components/country-search-input/country-search-input.component";
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {CountryService} from '../../services/country.service';
import {of} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  private readonly countryService = inject(CountryService);
  query = signal<string>('');

  // Resource con Observables
  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if (request.query === '' || !request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    },
  });

  // Resource con Promises
  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async ({request}) => {
  //     if (request.query === '' || !request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCaptial(request.query)
  //     );
  //   },
  // })

  // isLoading = signal<boolean>(false);
  // isError = signal<string | null>(null);
  // countries = signal<ICountry[]>([]);
  //
  // onSearch(query: string): void {
  //   if (this.isLoading()) return;
  //
  //   this.isLoading.set(true);
  //   this.isError.set(null);
  //
  //   this.countryService.searchByCaptial(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.countries.set(countries);
  //         this.isLoading.set(false);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     })
  // }
}
