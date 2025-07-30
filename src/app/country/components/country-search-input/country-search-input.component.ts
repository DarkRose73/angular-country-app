import { Component, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  onSearch = output<string>();

  search(val: string): void {
    this.onSearch.emit(val);
  }
}
