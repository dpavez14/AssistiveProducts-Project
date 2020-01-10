import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiService, MatchType } from '../../services/api.service';
import { Result } from '../../models/results';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ResultsItem>;
  results: ResultsItem[];
  dialogRef: MatDialogRef<CommentsComponent>;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    titleService: Title,
  ) {
    titleService.setTitle('Scottish Premiership - Results');
    apiService.getMatches(MatchType.Results, (items) => {
      this.dataSources = items;
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['time', 'match', 'location', 'comments'];
  dataSources = this.results;

  public ariaText(row: any): string {
    return 'Time: ' + row.time.starting_at.time.split(':').slice(0, -1).join(':') + '. ' +
      row.localteam_name + ' ' + row.scores.localteam_score + ' ' + this.goals(row.scores.localteam_score) + '. ' +
      row.visitorteam_name + ' ' + row.scores.visitorteam_score + ' ' + this.goals(row.scores.visitorteam_score) + '. ' +
      'Location: ' + row.location + '.';
  }

  private goals(g: number): string {
    return g.toString() + (g !== 1 ? ' goals' : ' goal');
  }

  public openCommentsModal(id: number, localTeam: string, visitorTeam: string, date: string) {
    this.dialogRef = this.dialog.open(CommentsComponent, {
      minWidth: '100vw',
      width: '100vw',
      minHeight: '100vh',
      height: '100vh',
      data: {id, localTeam, visitorTeam, date},
      ariaLabel: 'Comments section'
    });
  }
}

export interface ResultsItem {
  date: string;
  data: Result[];
}
