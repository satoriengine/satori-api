import { NextResponse } from 'next/server';

// JSONを返す
export async function GET() {
  const players = [
    { name: 'Bob', age: 18, hobby: 'Tennis' },
    { name: 'Alice', age: 17, hobby: 'Cooking' },
  ];
  return NextResponse.json(players, { status: 200 });
}
