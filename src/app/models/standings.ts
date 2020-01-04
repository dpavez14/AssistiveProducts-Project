interface StandingsResponse {
  data: Standings[];
}

interface Standings {
  standings: StandingsData;
}

interface StandingsData {
  data: Standing[]
}

interface Standing {
  team_id: number;
  team_name: string;
  position: number;
  recent_form: string;
  total: StandingTotalStats;
  overall: StandingStats;
  
}

interface StandingTotalStats {
  goal_difference: string;
  points: number;
}

interface StandingStats {
  draw: number;
  games_played: number;
  goals_against: number;
  goals_scored: number;
  lost: number;
  won: number;
}