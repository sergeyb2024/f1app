// types/index.ts

/**
 * Represents a single race in the schedule.
 */
export interface Race {
  name: string;
  circuit: string;
  location: string;
  raceDate: Date;
}

/**
 * Represents a single upgrade component for a constructor.
 */
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

/**
 * Represents a detail card that the user has saved.
 */
export interface SavedDetail {
  id: number;
  raceName: string;
  constructor: string;
  updatedComponent: string;
  description: string;
}
