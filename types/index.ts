export interface Race {
  name: string;
  circuit: string;
  location: string;
  raceDate: Date;
}

export interface Upgrade {
  Year: number;
  RaceNo: number;
  RaceName: string;
  Constructor: string;
  RequiredEventDisplay: string;
  ComponentNo: number;
  UpdatedComponent: string;
  PrimaryReason: string;
  GeometricDifferences: string;
  Description: string;
}

export interface SavedDetail {
  id: number;
  raceName: string;
  constructor: string;
  updatedComponent: string;
  description: string;
}
export interface RaceSelector {
  name: string;
  circuit: string;
  location: string;
  raceDate: Date;
}
