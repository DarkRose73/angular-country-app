import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {RESTCountry} from '../interfaces/rest-country.interface';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {CountryMapper} from '../mapper/country.mapper';
import {ICountry} from '../interfaces/country.interface';
import {Region} from '../interfaces/region.type';

const API_URL = "https://restcountries.com/v3.1"

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, ICountry[]>();
  private readonly queryCacheCountry = new Map<string, ICountry[]>();
  private readonly queryCacheRegion = new Map<Region, ICountry[]>();

  searchByCapital(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<ICountry[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
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
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises con ese codigo: ${code}`));
        })
      );
  }

  searchByRegion(region: Region): Observable<ICountry[]> {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map((res) => CountryMapper.mapRestCountryArrayToICountryArray(res)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError((error) => {
          console.log("Error fetching ", error);
          return throwError(() => new Error(`No se pudo obtener paises dentro de esa region: ${region}`));
        })
      );
  }
}
