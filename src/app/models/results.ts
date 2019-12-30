export interface Results {
  data: any
}

interface ResponseData {
  results: Data
}

interface Data {
  data: Result[]
}

export interface Result {
  localteam: Team;
  visitorteam: Team;
  time: Time;
  scores: Scores;
  location: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Time {
  starting_at: StartTime
}

interface StartTime {
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
}

interface Scores {
  localteam_score: number;
  visitorteam_score: number;
}