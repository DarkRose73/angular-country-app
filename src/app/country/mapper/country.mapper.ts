import { ICountry } from "../interfaces/country.interface";
import { RESTCountry } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static mapRestCountryToICountry(item: RESTCountry): ICountry {
    return {
      capital: item.capital.join(','),
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.translations['spa'].common ?? 'No spanish name',
      population: item.population,
    }
  }

  static mapRestCountryArrayToICountryArray(items: RESTCountry[]): ICountry[] {
    // Ambas formas sirven
    // return items.map(this.mapRestCountryToICountry);
    return items.map((item) => this.mapRestCountryToICountry(item));
  }
}
