import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ApiService } from "../../services/api.service";
import { Team } from "../../models/team";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"]
})
export class PositionsComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSources = [];

  constructor(private apiService: ApiService) {
    apiService.getStandings((standings: Standing[]) => {
      this.dataSources = standings;
    });
  }

  displayedColumns = [
    "position",
    "team",
    "recentForm",
    "played",
    "won",
    "drawn",
    "lost",
    "gf",
    "ga",
    "gd",
    "points"
  ];
}
