// components/DetailsCard.tsx
import React from 'react';
import { Upgrade, Race } from '@/types';
import Spoiler from './Spoiler';

interface DetailsCardProps {
  detail: Upgrade | null;
  selectedRace: Race | null;
  onSave: () => void;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ detail, selectedRace, onSave }) => {
  if (!detail) {
    return null;
  }

  const isPastRace = selectedRace ? new Date(selectedRace.raceDate) < new Date() : false;

  return (
    <div className="relative flex-1 bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg mt-6">
      <h3 className="font-bold text-2xl mb-4 text-white">Details</h3>
      <p className="mb-3 text-gray-300"><span className="font-semibold text-white">Part Name:</span> {detail.UpdatedComponent}</p>
      <p className="mb-3 text-gray-300"><span className="font-semibold text-white">Reason for upgrade:</span> {detail.PrimaryReason}</p>
      <p className="mb-3 text-gray-300"><span className="font-semibold text-white">Geometric Differences:</span> {detail.GeometricDifferences}</p>
      <p className="text-gray-300"><span className="font-semibold text-white">Description:</span> {detail.Description}</p>
      
      {isPastRace && selectedRace && (
         <Spoiler location={selectedRace.location} raceDate={selectedRace.raceDate} />
      )}

      <button
        onClick={onSave}
        className="mt-8 w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-xl font-bold tracking-wide flex items-center justify-center"
      >
        Save Detail Card <span className="ml-2">&#10003;</span>
      </button>
    </div>
  );
};

export default DetailsCard;
