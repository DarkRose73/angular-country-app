import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {CountryService} from '../../services/country.service';
import {NotFoundComponent} from '../../../shared/components/not-found/not-found.component';
import {CountryInformationPageComponent} from './country-information/country-information-page.component';

@Component({
  selector: 'app-country-page',
  imports: [
    NotFoundComponent,
    CountryInformationPageComponent
  ],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private readonly countryService = inject(CountryService);
  /**
   * params se asocia directamente con las rutas de la aplicacion, por eso en este caso se utiliza 'code'
   * @see country.routes.ts
   */
  countryCode: string = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({request}) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  })

}
