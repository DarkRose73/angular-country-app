import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  private readonly countryService = inject(CountryService);

  onSearch(query: string): void {
    this.countryService.searchByCaptial(query)
      .subscribe((res) => {
        console.log(res);
      })
  }
}
