import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamResponse, Team } from '../models/team';
import { Results, Result } from '../models/results';
import { Venues, Venue } from '../models/venues';
import { Comment } from '../components/comments/comments.component';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import { ResultsItem } from '../components/results/results.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  comments: {[id: number]: Comment[]} = {};

  private API_KEY = 'tkCmhuDCZekEZwSwdhPEjwP3Akj8nlQPaslco1kGXLrsjOhuyC6lcbleUEE9';

  private endpointFor(endpoint: string) {
    return `${endpoint}${this.API_KEY}`;
  }

  getTeams(callback: (teams: Team[]) => any) {
    this.http
      .get<TeamResponse>(this.endpointFor(K.teams))
      .subscribe(res => callback(res.data));
  }

  getResults(__this: ApiService, teams: Team[], venues: Venue[], callback: (results: Result[]) => any) {
    __this.http
      .get<Results>(__this.endpointFor(K.results))
      .subscribe(res => {

        const results = res.data.results.data;
        results.forEach(result => {
          updateMissingInfoFor(result, teams, venues);
        });

        callback(results.sort(resultsByDate));
      });
  }

  getFixtures(__this: ApiService, teams: Team[], venues: Venue[], callback: (fixtures: any) => any) {
    __this.http
      .get<any>(__this.endpointFor(K.fixtures))
      .subscribe(res => {
        let fixtures = res.data.fixtures.data;
        fixtures.forEach(fixture => {
          updateMissingInfoFor(fixture, teams, venues);
        });
        callback(fixtures.filter(fixture => fixture.time.status !== "FT"))
      });
  }

  getVenues(callback: (venues: Venue[]) => any) {
    this.http
      .get<Venues>(this.endpointFor(K.venues))
      .subscribe(res => callback(res.data));
  }

  getStandings(callback: (standings: Standing[]) => any) {
    this.http
    .get<StandingsResponse>(this.endpointFor(K.standings))
    .subscribe(res => callback(res.data[0].standings.data));
  }

  getMatches(type: MatchType, callback: (items: ResultsItem[]) => any) {
    this.getVenues(venues => {
      this.getTeams(teams => {
        const endpoint = type === MatchType.Results ? this.getResults : this.getFixtures;
        endpoint(this, teams, venues, results => {
          const resultsItem: ResultsItem[] = [];
          results.forEach(result => {
            const resultDate = result.time.starting_at.date;
            const dateForCurrentResult = resultsItem.filter(item => item.date === resultDate);
            if (dateForCurrentResult.length === 0) {
              resultsItem.push(newItem(result.time.starting_at.date, [result]));
            } else {
              const data: Result[] = dateForCurrentResult[0].data;
              dateForCurrentResult[0].data = [...data, result];
            }
          });
          callback(resultsItem);
        });
      });
    });
  }

  getTeam(id: number): Observable<any> {
    return this.http.get(K.team + id.toString() + '?api_token=' + this.API_KEY + '&include=squad.player.position');
  }

  loadComments(id: number) {
    return this.comments[id] == null ? [] : this.comments[id];
  }

  saveComments(id: number, comments: Comment[]) {
    this.comments[id] = comments;
  }
}

const updateMissingInfoFor = (result: Result, teams: Team[], venues: Venue[]) => {
  // team information
  const team1 = teams.filter(team => team.id === result.localteam_id)[0];
  const team2 = teams.filter(team => team.id === result.visitorteam_id)[0];
  result.localteam_name = team1.name;
  result.localteam_logo = team1.logo_path;
  result.visitorteam_name = team2.name;
  result.visitorteam_logo = team2.logo_path;

  // location information
  const venue = venues.filter(v => v.id === team1.venue_id)[0];
  result.location = team1.venue_id ? venue.name : K.St_Mirren_Park;
};

const resultsByDate = (resultA: Result, resultB: Result): number => {
    const resATimestamp = resultA.time.starting_at.timestamp;
    const resBTimestamp = resultB.time.starting_at.timestamp;
    return resBTimestamp - resATimestamp;
};

const newItem = (date: string, data: Result[]) => {
  return { date, data };
};

export enum MatchType {
  Fixtures = "fixtures",
  Results = "results"
}

const K = {
  results: 'https://soccer.sportmonks.com/api/v2.0/seasons/16222?include=results&api_token=',
  teams: 'https://soccer.sportmonks.com/api/v2.0/teams/season/16222?api_token=',
  venues: 'https://soccer.sportmonks.com/api/v2.0/venues/season/16222?api_token=',
  standings: 'https://soccer.sportmonks.com/api/v2.0/standings/season/16222?api_token=',
  team: 'https://soccer.sportmonks.com/api/v2.0/teams/',
  fixtures: 'https://soccer.sportmonks.com/api/v2.0/seasons/16222?include=fixtures&api_token=',
  St_Mirren_Park: 'St. Mirren Park'
};
