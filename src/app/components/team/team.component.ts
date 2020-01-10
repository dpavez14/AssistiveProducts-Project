import {Component, Inject, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface TeamDialogData {
  id: number;
}

export interface TeamSquad {
  name: string;
  logo_path: string;
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  attackers: Player[];
}

export interface Player {
  firstname: string;
  lastname: string;
  position: string;
  number?: number;
  nationality: string;
  birthdate: string;
  height: string;
  appearences: number;
  redcards: number;
  yellowcards: number;
  image_path: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  squad: TeamSquad;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<TeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamDialogData
  ) { }

  ngOnInit() {
    this.apiService.getTeam(this.data.id).subscribe(res => {
      this.squad = res;
    });
  }

}
