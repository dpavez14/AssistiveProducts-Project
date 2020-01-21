import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/team';
import {MatDialog} from '@angular/material/dialog';
import {TeamComponent, TeamSquad} from '../team/team.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSources = [];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private titleService: Title,
    private renderer: Renderer2,
    private elem: ElementRef
  ) {
    titleService.setTitle('Scottish Premiership - Standings');
    apiService.getStandings((standings: Standing[]) => {
      this.dataSources = standings;
    });
  }

  displayedColumns = [
    'position',
    'team',
    'recentForm',
    'played',
    'won',
    'drawn',
    'lost',
    'gf',
    'ga',
    'gd',
    'points'
  ];

  ngAfterViewInit(): void {
    const elements = this.elem.nativeElement.querySelectorAll('.mat-tooltip-panel');
    elements.forEach(e => {
      e.setAttribute('role', 'tooltip');
    });
  }

  public openTeamModal(id: number) {
    let squad: TeamSquad;
    this.apiService.getTeam(id).subscribe(res => {
      squad = res;
      const dialogRef = this.dialog.open(TeamComponent, {
        minWidth: '100vw',
        width: '100vw',
        minHeight: '100vh',
        height: '100vh',
        data: {id},
        ariaLabel: squad.name + ' squad'
      });
    });
  }
}
