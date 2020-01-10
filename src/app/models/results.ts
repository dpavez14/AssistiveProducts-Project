export interface Results {
  data: ResponseData;
}

interface ResponseData {
  results: Data;
}

interface Data {
  data: Result[];
}

export interface Result {
  // local team
  localteam_id: number;
  localteam_name: string;
  localteam_logo: string;
  // visitor team
  visitorteam_id: number;
  visitorteam_name: string;
  visitorteam_logo: string;

  time: Time;
  scores: Scores;
  location: string;
}

interface Time {
  starting_at: StartTime;
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
