export interface TeamResponse {
  data: Team[]
}

export interface Team {
  id: number;
  name: string;
  logo_path: string;
  venue_id: string;
}
