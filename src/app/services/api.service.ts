import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/team';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly season: string;

  constructor(private http: HttpClient) {
    this.apiKey = '?api_token='; // Put your API key here
    this.baseUrl = 'https://soccer.sportmonks.com/api/v2.0/';
    this.season = '16222';
  }

  getTeams(): Observable<Team[]> {
    return this.http.get(this.baseUrl + 'teams/season/' + this.season + this.apiKey)
      .pipe(
        map((res: any) => res.data),
        take(1)
      );
  }

  getTeamsFiltered(): Observable<Team[]> {
    return this.http.get(this.baseUrl + 'teams/season/' + this.season + this.apiKey)
      .pipe(
        map((res: any) => {
          const teams: Team[] = [];
          res.data.forEach((team) => {
            teams.push({
              id: team.id,
              founded: team.founded,
              logo_path: team.logo_path,
              name: team.name,
              short_code: team.short_code,
              venue_id: team.venue_id
            });
          });
          return teams;
        }),
        take(1)
      );
  }

}
