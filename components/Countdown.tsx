'use client';

import { useEffect, useState } from 'react';
import { raceSchedule } from '@/data/raceSchedule';
import { Race } from '@/types';

const Countdown = () => {
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const upcomingRace = raceSchedule.find(
      (race) => new Date(race.raceDate) > now
    );
    setNextRace(upcomingRace || null);

    if (upcomingRace) {
      const interval = setInterval(() => {
        const distance = new Date(upcomingRace.raceDate).getTime() - new Date().getTime();
        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          });
        } else {
          setCountdown(null);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="mb-10 text-center md:text-left">
      <p className="text-2xl text-gray-100">
        Next Race:{' '}
        <span className="text-orange-500 font-bold">{nextRace?.name}</span> In{' '}
        <span className="text-red-500 font-extrabold">
          {countdown?.days ?? 0}
        </span>{' '}
        days,{' '}
        <span className="text-red-500 font-extrabold">
          {countdown?.hours ?? 0}
        </span>{' '}
        hours,{' '}
        <span className="text-red-500 font-extrabold">
          {countdown?.minutes ?? 0}
        </span>{' '}
        minutes
      </p>
      <p className="text-lg text-gray-300">
        Circuit: <span id="nextRaceCircuit">{nextRace?.circuit}</span>
      </p>
    </div>
  );
};

export default Countdown;
