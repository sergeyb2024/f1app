// components/Spoiler.tsx
import React, { useState, useEffect } from 'react';

interface SpoilerProps {
  location: string;
  raceDate: Date;
}

interface Finisher {
  position: number;
  name: string;
  points: number | string;
}

interface SpoilerData {
  poleSitter: { name: string };
  finishers: Finisher[];
}

const Spoiler: React.FC<SpoilerProps> = ({ location, raceDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SpoilerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This effect will fetch the spoiler data when the toggle is flipped on.
  useEffect(() => {
    // Only fetch if the spoiler is open, data hasn't been fetched yet, and a location is provided.
    if (isOpen && !results && location) {
      const fetchSpoilers = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // We use an internal API route. This is a best practice in Next.js
          // to avoid exposing external API endpoints or keys to the client.
          const response = await fetch(`/api/race-results?location=${location}&raceDate=${raceDate.toISOString()}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch race results.');
          }
          const data = await response.json();
          setResults(data);
        } catch (err: any) {
          setError(err.message || 'Could not load spoiler data.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSpoilers();
    }
  }, [isOpen, results, location, raceDate]);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="mt-6 pt-6 border-t border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-red-400">Spoilers</h3>
        <label htmlFor="spoilerToggle" className="flex items-center cursor-pointer">
          <span className="mr-3 text-gray-300">Show Results</span>
          <div className="relative">
            <input
              type="checkbox"
              id="spoilerToggle"
              className="sr-only"
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
            />
            {/* The visual part of the toggle switch */}
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isOpen ? 'translate-x-full bg-green-400' : ''}`}></div>
          </div>
        </label>
      </div>
      {/* The content that expands/collapses */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        {isLoading && <p className="text-gray-300 animate-pulse">Loading spoiler data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Top Qualifier</p>
              <p className="text-lg font-bold text-red-400">{results.poleSitter.name}</p>
            </div>
            {results.finishers.length > 0 ? (
              <div>
                <p className="text-sm text-gray-400">Podium Finishers</p>
                <ul className="space-y-2 mt-2">
                  {results.finishers.map((f) => (
                    <li key={f.position} className="flex justify-between items-center bg-gray-900 p-2 rounded-md">
                      <div>
                        <span className="text-xl w-8 inline-block">{medals[f.position - 1]}</span>
                        <span className="font-semibold">{f.name}</span>
                      </div>
                      <span className="text-blue-400 font-bold">{f.points} pts</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
                 <p className="text-gray-400">Podium data is not yet available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spoiler;
