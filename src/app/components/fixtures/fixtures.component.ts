import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

interface DataSource {
  date: string;
  data: ScheduleItem[];
}
interface ScheduleItem {
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  location: string;
}

const schedule1: ScheduleItem[] = [
  {time: '13:30',
    team1: 'Totem Ham', logo1: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
    team2: 'Arsenal', logo2: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
    location: 'London Stadium, London'},
  {time: '14:30',
    team1: 'Totem Ham', logo1: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
    team2: 'Arsenal', logo2: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
    location: 'London Stadium, London'},
  {time: '15:00',
    team1: 'Totem Ham', logo1: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
    team2: 'Arsenal', logo2: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
    location: 'London Stadium, London'},
  {time: '18:30',
    team1: 'Totem Ham', logo1: 'http://ssl.gstatic.com/onebox/media/sports/logos/bXkiyIzsbDip3x2FFcUU3A_96x96.png',
    team2: 'Arsenal', logo2: 'http://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png',
    location: 'London Stadium, London'},
];

const EXAMPLE_DATA: DataSource[] = [
  { date: '2019-12-04', data: schedule1 },
  { date: '2019-12-14', data: schedule1 },
  { date: '2019-12-16', data: schedule1 },
  { date: '2019-12-21', data: schedule1 },
  ];



@Component({
  selector: 'app-schedule',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ScheduleItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['time', 'match',  'location'];
  dataSources = EXAMPLE_DATA;

}
