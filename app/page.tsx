'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import RaceSelector from '@/components/RaceSelector';
// ... import other components

export default function Home() {
  const [savedCount, setSavedCount] = useState(0);
  const [showSaved, setShowSaved] = useState(false);
  // ... other state variables

  const handleShowSaved = () => {
    setShowSaved(true);
  };

  return (
    <main className="container mx-auto p-4 sm:p-8 bg-zinc-900 rounded-xl shadow-2xl border-t-4 border-blue-600 max-w-4xl">
      <Header savedCount={savedCount} onShowSaved={handleShowSaved} />
      <Countdown />
      <RaceSelector/>
      <DetailsCard/>
      <SavedDetails/>
      <Spoiler/>
    </main>
  );
}
