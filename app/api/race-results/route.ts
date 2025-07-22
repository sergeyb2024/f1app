import { NextResponse } from 'next/server';

const API_BASE_URL = "https://api.openf1.org/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const year = searchParams.get('year');
  const sessionType = searchParams.get('sessionType');

  if (!location || !year || !sessionType) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    const resp = await fetch(`${API_BASE_URL}/sessions?year=${year}&location=${location}&session_name=${sessionType}`);
    if (!resp.ok) {
      throw new Error(`API error: ${resp.statusText}`);
    }
    const sessions = await resp.json();

    // ... (Add the rest of the logic to fetch and process race results)

    return NextResponse.json(sessions);
  } catch (error) {
    console.error(`Error fetching session for ${location}:`, error);
    return NextResponse.json({ error: 'Failed to fetch race results' }, { status: 500 });
  }
}
