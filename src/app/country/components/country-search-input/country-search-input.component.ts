import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  search = output<string>();
  placeholder = input<string>('Buscar');

  onSearch(val: string): void {
    this.search.emit(val);
  }
}
