import { Component, ViewChild } from '@angular/core';
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

export class ResultsComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ResultsItem>;
  team: any;

  constructor(private apiService: ApiService) {
    apiService.getTeam().subscribe((res: Team) => {
      this.team = res;
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['time', 'result', 'location'];
  dataSources = EXAMPLE_DATA;
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
