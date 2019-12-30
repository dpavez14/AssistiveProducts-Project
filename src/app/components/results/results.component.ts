import { Component, ViewChild, SystemJsNgModuleLoader } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ApiService } from "../../services/api.service";
import { Results, Result } from "../../models/results";
import { TeamResponse } from 'src/app/models/team';

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ResultsItem>;
  results: ResultsItem[];

  constructor(private apiService: ApiService) {
    let resultsItem: ResultsItem[] = []
    apiService.getVenues().subscribe((venuesResponse: any)=> {
      apiService.getResults().subscribe((resultsResponse: Results) => {
        apiService.getTeams().subscribe((teamsResponse: TeamResponse) => {
          
          let venues = [];
          venues = venuesResponse.data.map(venue => {
            return {
              id: venue.id,
              name: venue.name,
              city: venue.city
            };
          });

          const results = resultsResponse.data.results.data;
          let resultsData: Result[] = results
            .map(result => objectFor(result))
            .sort(sortByDate);
          // sort the results so they get displayed in the desired order

          resultsData.forEach(result => {
            // team 1
            const team1 = teamsResponse.data.filter(
              team => team.id === result.localteam.id
            )[0];
            result.localteam.name = team1.name;
            result.localteam.logo = team1.logo_path;

            // location
            result.location = team1.venue_id
              ? venues.filter(venue => venue.id === team1.venue_id)[0].name
              : "St. Mirren Park"; // this is St. Mirren team only so it is "safe to do this" r/codegore :)

            // team 2
            const team2 = teamsResponse.data
              .filter(team => team.id === result.visitorteam.id)[0];
            result.visitorteam.name = team2.name;
            result.visitorteam.logo = team2.logo_path;

            // result date
            const dateForCurrentResult = resultsItem.filter(
              item => item.date === result.time.starting_at.date
            );
            if (dateForCurrentResult.length === 0) {
              resultsItem.push({
                date: result.time.starting_at.date,
                data: [result]
              });
            } else {
              const data: Result[] = dateForCurrentResult[0].data;
              dateForCurrentResult[0].data = [...data, result];
            }
          });

          this.dataSources = resultsItem;
        });
      });
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["time", "result", "location"];
  dataSources = this.results
}

export interface ResultsItem {
  date: string;
  data: Result[];
}

const sortByDate = (resultA: Result, resultB: Result): number => {
  const resATimestamp = resultA.time.starting_at.timestamp;
  const resBTimestamp = resultB.time.starting_at.timestamp;
  return resBTimestamp - resATimestamp;
}

const objectFor = (result): Result => {
  return {
    localteam: {
      id: result.localteam_id,
      name: "",
      logo: ""
    },
    visitorteam: {
      id: result.visitorteam_id,
      name: "",
      logo: ""
    },
    time: {
      starting_at: {
        date: result.time.starting_at.date,
        time: result.time.starting_at.time
          .split(":")
          .slice(0, -1)
          .join("h"),
        timestamp: result.time.starting_at.timestamp,
        timezone: result.time.starting_at.timezone
      }
    },
    scores: {
      localteam_score: result.scores.localteam_score,
      visitorteam_score: result.scores.visitorteam_score
    },
    location: ""
  };
}