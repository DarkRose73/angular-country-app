import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = "https://restcountries.com/v3.1"

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly http = inject(HttpClient);

  searchByCaptial(query: string) {
    query = query.toLowerCase();

    return this.http.get(`${API_URL}/capital/${query}`);
  }

}
