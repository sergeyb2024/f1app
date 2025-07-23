import React from 'react';
import { SavedDetail } from '@/types';

interface SavedDetailsProps {
  savedItems: SavedDetail[];
  onView: (item: SavedDetail) => void;
  onRemove: (id: number) => void;
  onBack: () => void;
}

const SavedDetails: React.FC<SavedDetailsProps> = ({ savedItems, onView, onRemove, onBack }) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
      <h3 className="font-bold text-2xl mb-6 text-white text-center">Your Saved Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">No details saved yet.</p>
        ) : (
          savedItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 border border-gray-600 p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-600 hover:scale-105 transition-all duration-200 ease-in-out relative group"
              onClick={() => onView(item)}
            >
              <p className="font-semibold text-blue-300 text-lg mb-2">{item.updatedComponent}</p>
              <p className="text-sm text-gray-300">Race: {item.raceName}</p>
              <p className="text-sm text-gray-300">Team: {item.constructor}</p>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">{item.description}</p>
              <button
                className="remove-saved-detail-btn absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
      <button onClick={onBack} className="mt-8 px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg font-bold mx-auto block">
        Back to Main
      </button>
    </div>
  );
};

export default SavedDetails;
