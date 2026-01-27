import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {RESTCountry} from '../interfaces/rest-country.interface';
import {catchError, delay, map, Observable, throwError} from 'rxjs';
import {CountryMapper} from '../mapper/country.mapper';
import {ICountry} from '../interfaces/country.interface';

const API_URL = "https://restcountries.com/v3.1"

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);

  searchByCapital(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        delay(750),
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        delay(750),
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${query}`));
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        map((countries) => countries.at(0)),
        delay(750),
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises con ese codigo: ${code}`));
        })
      );
  }

}
