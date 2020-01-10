import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Results, Result } from '../../models/results';
import { TeamResponse } from 'src/app/models/team';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  results: ResultsItem[];
  dataSources = this.results;

  displayedColumns = ["time", "result", "location"]

  constructor(private apiService: ApiService) {
    apiService.getVenues(venues => {
      apiService.getTeams(teams => {
        apiService.getResults(teams, venues, results => {

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

          this.dataSources = resultsItem;
        });
      });
    });
  }

  public ariaText(row: any): string {
    return 'Time: ' + row.time.starting_at.time.split(':').slice(0, -1).join(':') + '. ' +
      row.localteam_name + ' ' + row.scores.localteam_score + ' ' + this.goals(row.scores.localteam_score) + '. ' +
      row.visitorteam_name + ' ' + row.scores.visitorteam_score + ' ' + this.goals(row.scores.visitorteam_score) + '. ' +
      'Location: ' + row.location + '.';
  }

  private goals(g: number): string {
    return g.toString() + (g !== 1 ? ' goals' : ' goal');
  }
}

const newItem = (date: string, data: Result[]) => {
  return { date, data };
};

export interface ResultsItem {
  date: string;
  data: Result[];
}
