// app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Race, Upgrade, SavedDetail } from '@/types';
import { raceSchedule } from '@/data/raceSchedule';
import { upgradeData } from '@/data/upgradeData';

// Import Components
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import RaceSelector from '@/components/RaceSelector';
import DetailsCard from '@/components/DetailsCard';
import SavedDetails from '@/components/SavedDetails';

/**
 * A custom hook for managing state in localStorage.
 * This makes the user's saved details persist across browser sessions.
 * @param key The key to use in localStorage.
 * @param initialValue The initial value if nothing is in localStorage.
 * @returns A stateful value, and a function to update it.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Prevent build errors during server-side rendering
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}


export default function Home() {
  // ======== STATE MANAGEMENT ========
  const [selectedRaceName, setSelectedRaceName] = useState('');
  const [selectedConstructor, setSelectedConstructor] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [view, setView] = useState<'main' | 'saved'>('main');
  const [savedDetails, setSavedDetails] = useLocalStorage<SavedDetail[]>('savedRaceDetails', []);
  const [alert, setAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });


  // ======== MEMOIZED DERIVED STATE ========
  // These values are re-calculated only when their dependencies change, improving performance.
  const constructorsForSelectedRace = useMemo(() => {
    if (!selectedRaceName) return [];
    const filtered = upgradeData.filter(item => item.RaceName === selectedRaceName);
    return [...new Set(filtered.map(item => item.Constructor))];
  }, [selectedRaceName]);

  const componentsForSelectedTeam = useMemo(() => {
    if (!selectedRaceName || !selectedConstructor) return [];
    const filtered = upgradeData.filter(item => item.RaceName === selectedRaceName && item.Constructor === selectedConstructor);
    return [...new Set(filtered.map(item => item.UpdatedComponent))];
  }, [selectedRaceName, selectedConstructor]);

  const selectedDetail = useMemo(() => {
    if (!selectedRaceName || !selectedConstructor || !selectedComponent) return null;
    return upgradeData.find(item =>
      item.RaceName === selectedRaceName &&
      item.Constructor === selectedConstructor &&
      item.UpdatedComponent === selectedComponent
    ) || null;
  }, [selectedRaceName, selectedConstructor, selectedComponent]);

  const selectedRaceData = useMemo(() => {
     return raceSchedule.find(r => r.name === selectedRaceName) || null;
  }, [selectedRaceName]);


  // ======== EVENT HANDLERS ========
  const handleRaceChange = (raceName: string) => {
    setSelectedRaceName(raceName);
    setSelectedConstructor('');
    setSelectedComponent('');
  };

  const handleConstructorChange = (constructorName: string) => {
    setSelectedConstructor(constructorName);
    setSelectedComponent('');
  };

  const handleSaveDetail = () => {
    if (!selectedDetail) return;

    const isDuplicate = savedDetails.some(item =>
        item.raceName === selectedDetail.RaceName &&
        item.constructor === selectedDetail.Constructor &&
        item.updatedComponent === selectedDetail.UpdatedComponent
    );

    if (isDuplicate) {
        showAlert("This detail card is already saved!");
        return;
    }

    const newSavedDetail: SavedDetail = {
      id: Date.now(),
      raceName: selectedDetail.RaceName,
      constructor: selectedDetail.Constructor,
      updatedComponent: selectedDetail.UpdatedComponent,
      description: selectedDetail.Description,
    };
    setSavedDetails([...savedDetails, newSavedDetail]);
    showAlert("Detail saved successfully!");
  };

  const handleRemoveSaved = (id: number) => {
    setSavedDetails(savedDetails.filter(item => item.id !== id));
  };

  const handleViewSavedItem = (item: SavedDetail) => {
      setSelectedRaceName(item.raceName);
      // Using timeouts to ensure state updates propagate before setting the next dropdown.
      // This helps dependent dropdowns populate correctly.
      setTimeout(() => {
        setSelectedConstructor(item.constructor);
        setTimeout(() => {
            setSelectedComponent(item.updatedComponent);
        }, 0)
      }, 0);
      setView('main');
  };
  
  const showAlert = (message: string) => {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: '' }), 3000);
  };

  // ======== RENDER LOGIC ========
  return (
    <div className="p-4 font-inter text-gray-200 flex items-start justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <Header savedCount={savedDetails.length} onShowSaved={() => setView('saved')} />
        
        {view === 'main' ? (
          // Main View: Shows countdown and selectors
          <div className="container mx-auto p-4 sm:p-8 bg-zinc-900 rounded-xl shadow-2xl border-t-4 border-blue-600">
            <Countdown />
            
            <div className="space-y-4">
                <RaceSelector 
                    selectedRace={selectedRaceName}
                    onRaceChange={handleRaceChange}
                    upgradeData={upgradeData}
                />

                {selectedRaceName && (
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                        <label htmlFor="teamNamesSelect" className="block text-lg font-bold text-blue-400 mb-2">Team Name</label>
                        <select id="teamNamesSelect" value={selectedConstructor} onChange={(e) => handleConstructorChange(e.target.value)} className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled>Select a Team Name</option>
                            {constructorsForSelectedRace.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                )}

                {selectedConstructor && (
                     <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                        <label htmlFor="upgradesNameSelect" className="block text-lg font-bold text-blue-400 mb-2">Upgrade Name</label>
                        <select id="upgradesNameSelect" value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)} className="w-full bg-gray-900 text-gray-200 border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                           <option value="" disabled>Select an Upgrade</option>
                           {componentsForSelectedTeam.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {selectedDetail && (
                <DetailsCard detail={selectedDetail} selectedRace={selectedRaceData} onSave={handleSaveDetail} />
            )}

          </div>
        ) : (
          // Saved View: Shows the list of saved detail cards
          <SavedDetails 
            savedItems={savedDetails}
            onView={handleViewSavedItem}
            onRemove={handleRemoveSaved}
            onBack={() => setView('main')}
          />
        )}
      </div>

      {/* Custom Alert Modal using Tailwind CSS for smooth animation */}
      <div className={`fixed top-5 right-5 z-50 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ${alert.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
          {alert.message}
      </div>
    </div>
  );
}
