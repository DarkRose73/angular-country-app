import {Component, effect, input, linkedSignal, output} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  value = output<string>();
  placeholder = input<string>('Buscar');
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

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

