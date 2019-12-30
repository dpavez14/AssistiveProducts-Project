import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Results} from "../models/results";
import { Team, TeamResponse } from '../models/team';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(`${K.TEAMS_ENDPOINT}${K.API_KEY}`);
  }

  getResults(): Observable<Results> {
    return this.http.get<Results>(`${K.RESULTS_ENDPOINT}${K.API_KEY}`);
  }

  getVenues(): Observable<any> {
    return this.http.get<any>(`${K.VENUE_ENDPOINT}${K.API_KEY}`);
  }
}

const K = {
  API_KEY: "tkCmhuDCZekEZwSwdhPEjwP3Akj8nlQPaslco1kGXLrsjOhuyC6lcbleUEE9",
  RESULTS_ENDPOINT: "https://soccer.sportmonks.com/api/v2.0/seasons/16222?include=results,fixtures&api_token=",
  TEAMS_ENDPOINT: "https://soccer.sportmonks.com/api/v2.0/teams/season/16222?api_token=",
  VENUE_ENDPOINT: "https://soccer.sportmonks.com/api/v2.0/venues/season/16222?api_token="
};