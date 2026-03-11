import { NextResponse } from 'next/server';

// JSONを返す
export async function GET() {
  const songs = [
    { title: 'Spring Love', artist: 'Bob', category: 'Pop' },
    { title: 'Mighty sky', artist: 'Tom', category: 'Rock' },
    { title: 'You and I', artist: 'Alice', category: 'R&B' },
  ];
  return NextResponse.json(songs, { status: 200 });
}
