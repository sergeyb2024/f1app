import React from 'react';
import { raceSchedule } from '@/data/raceSchedule';
import { Upgrade } from '@/types';

interface RaceSelectorProps {
  selectedRace: string;
  onRaceChange: (raceName: string) => void;
  upgradeData: Upgrade[];
}

const RaceSelector: React.FC<RaceSelectorProps> = ({ selectedRace, onRaceChange, upgradeData }) => {
  const availableRaces = raceSchedule.filter(race =>
    upgradeData.some(upgrade => upgrade.RaceName === race.name)
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
      <label htmlFor="raceNameSelect" className="block text-lg font-bold text-blue-400 mb-2">
        Race Name
      </label>
      <select
        id="raceNameSelect"
        value={selectedRace}
        onChange={(e) => onRaceChange(e.target.value)}
        className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="" disabled>Select a Race with Upgrades</option>
        {availableRaces.map((race) => (
          <option key={race.name} value={race.name}>
            {race.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RaceSelector;
