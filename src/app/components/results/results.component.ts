import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {ApiService} from '../../services/api.service';
import {Team} from '../../models/team';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ResultsItem>;
  teams: Team[];

  constructor(private apiService: ApiService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['time', 'result', 'location'];
  dataSources = EXAMPLE_DATA;

  ngOnInit(): void {
    // Example
    this.apiService.getTeams().subscribe(
      (res: Team[]) => {
        this.teams = res;
        console.log(this.teams);
        this.teams.forEach(
          (team: Team) => {
            console.log(team.id);
          }
        );

        // Example 2 (here to be called after the previous one)
        this.apiService.getTeamsFiltered().subscribe(
          (res: Team[]) => {
            this.teams = res;
            console.log(this.teams);
            this.teams.forEach(
              (team: Team) => {
                console.log(team.id);
              }
            );
          },
          (error: any) => {
            console.log('Error trying to retrieve the teams at ResultsComponent: ' + error);
          }
        );
        // End example 2
      },
      (error: any) => {
        console.log('Error trying to retrieve the teams at ResultsComponent: ' + error);
      }
    );
  }

}


interface ResultsItem {
  date: string;
  data: MatchResultItem[];
}

interface TeamResult {
  id: number;
  name: string;
  logo: string;
  score: number;
}
interface MatchResultItem {
  time: string;
  team1: TeamResult;
  team2: TeamResult;
  winningTeam: number;
  location: string;
}

const result1: MatchResultItem[] = [
  {
    time: '13:30',
    team1: {
      id: 1,
      name: 'Totem Ham',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
      score: 2
    },
    team2: {
      id: 2,
      name: 'Arsenal',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
      score: 1
    },
    winningTeam: 1,
    location: 'London Stadium, London'
  }, {
    time: '13:30',
    team1: {
      id: 1,
      name: 'Totem Ham',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
      score: 2
    },
    team2: {
      id: 2,
      name: 'Arsenal',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
      score: 1
    },
    winningTeam: 1,
    location: 'London Stadium, London'
  }, {
    time: '13:30',
    team1: {
      id: 1,
      name: 'Totem Ham',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
      score: 2
    },
    team2: {
      id: 2,
      name: 'Arsenal',
      logo: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
      score: 1
    },
    winningTeam: 1,
    location: 'London Stadium, London'
  },
];

const EXAMPLE_DATA: ResultsItem[] = [
  { date: '2019-12-04', data: result1 },
  { date: '2019-12-14', data: result1 },
  { date: '2019-12-16', data: result1 },
  { date: '2019-12-21', data: result1 },
];
