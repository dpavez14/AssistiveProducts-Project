import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../models/team";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private API_KEY = "tkCmhuDCZekEZwSwdhPEjwP3Akj8nlQPaslco1kGXLrsjOhuyC6lcbleUEE9";

  getTeam(): Observable<Team> {
    return this.http.get<Team>('');
  }

  getStandings(callback: (standings: Standing[]) => any) {
    this.http
    .get<StandingsResponse>(this.endpointFor(K.standings))
    .subscribe(res => callback(res.data[0].standings.data))
  }

  private endpointFor(endpoint: string) {
    return `${endpoint}${this.API_KEY}`;
  }
}

const K = {
   standings: "https://soccer.sportmonks.com/api/v2.0/standings/season/16222?api_token="
 };
