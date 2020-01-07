import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TeamResponse, Team } from "../models/team";
import { Results, Result } from '../models/results';
import { Venues, Venue } from "../models/venues";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private API_KEY = "tkCmhuDCZekEZwSwdhPEjwP3Akj8nlQPaslco1kGXLrsjOhuyC6lcbleUEE9";

  private endpointFor(endpoint: string) {
    return `${endpoint}${this.API_KEY}`;
  }

  getTeams(callback: (teams: Team[]) => any) {
    this.http
      .get<TeamResponse>(this.endpointFor(K.teams))
      .subscribe(res => callback(res.data));
  }

  getResults(teams: Team[], venues: Venue[], callback: (results: Result[]) => any) {
    this.http
      .get<Results>(this.endpointFor(K.results))
      .subscribe(res => {

        const results = res.data.results.data;
        results.forEach(result => {
          updateMissingInfoFor(result, teams, venues);
        })

        callback(results.sort(resultsByDate));
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
    .subscribe(res => callback(res.data[0].standings.data))
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
  const venue = venues.filter(venue => venue.id === team1.venue_id)[0];
  result.location = team1.venue_id ? venue.name : K.St_Mirren_Park;
}

const resultsByDate = (resultA: Result, resultB: Result): number => {
    const resATimestamp = resultA.time.starting_at.timestamp;
    const resBTimestamp = resultB.time.starting_at.timestamp;
    return resBTimestamp - resATimestamp;
};

const K = {
  results: "https://soccer.sportmonks.com/api/v2.0/seasons/16222?include=results,fixtures&api_token=",
  teams: "https://soccer.sportmonks.com/api/v2.0/teams/season/16222?api_token=",
  venues: "https://soccer.sportmonks.com/api/v2.0/venues/season/16222?api_token=",
  standings: "https://soccer.sportmonks.com/api/v2.0/standings/season/16222?api_token="
  St_Mirren_Park: "St. Mirren Park"
};