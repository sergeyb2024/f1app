// app/api/race-results/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = "https://api.openf1.org/v1";
const YEAR = 2025; // Using a fixed year as per test data

// Helper to fetch a session and cache it in memory for the duration of the server request.
async function getSession(location: string, sessionType: string) {
  try {
    const resp = await fetch(`${API_BASE_URL}/sessions?year=${YEAR}&location=${location}&session_name=${sessionType}`);
    if (!resp.ok) return null;
    const sessions = await resp.json();
    if (sessions.length > 0) {
      sessions.sort((a: any, b: any) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());
      return sessions[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${sessionType} session for ${location}:`, error);
    return null;
  }
}

async function getDriverDetails(driverNumber: number) {
  try {
    const resp = await fetch(`${API_BASE_URL}/drivers?driver_number=${driverNumber}&session_key=latest`);
    if (!resp.ok) return { name: 'Unknown Driver' };
    const data = await resp.json();
    return data[0] ? { name: data[0].full_name } : { name: 'Unknown Driver' };
  } catch (error) {
    console.error(`Error fetching details for driver ${driverNumber}:`, error);
    return { name: 'Unknown Driver' };
  }
}

async function getCumulativePoints(driverNumber: number, raceDate: string) {
    try {
        const resp = await fetch(`${API_BASE_URL}/standings?year=${YEAR}&driver_number=${driverNumber}`);
        if (!resp.ok) return 'N/A';
        const standings = await resp.json();
        const relevantStandings = standings.filter((s: any) => new Date(s.date) <= new Date(raceDate));
        if (relevantStandings.length > 0) {
            relevantStandings.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return relevantStandings[0].points;
        }
        return 0;
    } catch (error) {
        console.error(`Error fetching points for driver ${driverNumber}:`, error);
        return 'N/A';
    }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const raceDate = searchParams.get('raceDate');

  if (!location || !raceDate) {
    return NextResponse.json({ error: 'Missing location or raceDate parameter' }, { status: 400 });
  }

  const raceSession = await getSession(location, "Race");
  const qualiSession = await getSession(location, "Qualifying");

  if (!raceSession) {
    return NextResponse.json({ error: `Race results not yet available for ${location}.` }, { status: 404 });
  }

  let poleSitter = { name: "N/A" };
  if (qualiSession) {
    const qualiResults = await fetch(`${API_BASE_URL}/position?session_key=${qualiSession.session_key}&position=1`).then(r => r.json());
    if (qualiResults.length > 0) {
      poleSitter = await getDriverDetails(qualiResults[0].driver_number);
    }
  }

  let finishers = [];
  const raceResults = await fetch(`${API_BASE_URL}/position?session_key=${raceSession.session_key}`).then(r => r.json());
  const topThree = raceResults.filter((d: any) => d.position >= 1 && d.position <= 3).sort((a: any, b: any) => a.position - b.position);

  for (const driver of topThree) {
    const details = await getDriverDetails(driver.driver_number);
    const points = await getCumulativePoints(driver.driver_number, raceDate);
    finishers.push({
      position: driver.position,
      name: details.name,
      points: points
    });
  }

  return NextResponse.json({ poleSitter, finishers });
}
