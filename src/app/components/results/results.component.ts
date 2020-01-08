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
    apiService.getVenues(venues => {
      apiService.getTeams(teams => {
        apiService.getResults(teams, venues, results => {

          let resultsItem: ResultsItem[] = [];
          results.forEach(result => {

            const resultDate = result.time.starting_at.date;
            const dateForCurrentResult = resultsItem.filter(item => item.date === resultDate);
            if (dateForCurrentResult.length === 0) {
              resultsItem.push(newItem(result.time.starting_at.date, [result]))
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

const newItem = (date: string, data: Result[]) => {
  return { date, data };
}

export interface ResultsItem {
  date: string;
  data: Result[];
}