import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CountrySearchInputComponent} from "../../components/country-search-input/country-search-input.component";
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {CountryService} from '../../services/country.service';
import {ICountry} from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  private readonly countryService = inject(CountryService);

  isLoading = signal<boolean>(false);
  isError = signal<string | null>(null);
  countries = signal<ICountry[]>([]);

  onSearch(query: string): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCaptial(query)
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(err);
        }
      })
  }
}
