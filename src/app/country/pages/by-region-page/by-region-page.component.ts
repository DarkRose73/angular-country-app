import {Component, inject, linkedSignal} from '@angular/core';
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {Region} from '../../interfaces/region.type';
import {CountryService} from '../../services/country.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  private readonly countryService = inject(CountryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  readonly selectedRegion = linkedSignal<Region | null>(() => this.queryParam as Region);

  countryResource = rxResource({
    request: () => ({region: this.selectedRegion()}),
    loader: ({request}) => {
      if (!request.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: `${request.region}`
        }
      });
      return this.countryService.searchByRegion(request.region);
    },
  })

  selectRegion(region: Region): void {
    if (this.selectedRegion() === region) {
      this.selectedRegion.set(null)
      return;
    }
    this.selectedRegion.set(region);
  }
}
