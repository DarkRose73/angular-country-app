import {Component, effect, input, output, signal} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  value = output<string>();
  placeholder = input<string>('Buscar');

  inputValue = signal<string>('');

  onSearch(val: string): void {
    this.value.emit(val);
  }

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanUp(() => {
      clearTimeout(timeout)
    });
  });
}

