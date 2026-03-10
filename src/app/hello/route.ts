// シンプルなHTMLを返す
import { NextResponse } from 'next/server';

const html = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Hello, World</title>
  </head>
  <body>
    <h1>Hello</h1>
    <h2>This site is API service</h2>
    <ul>
      <li>Name: Bob</li>
      <li>Age: 18</li>
      <li>Hobby: Tennis</li>
    </ul>
  </body>
</html>
`;

export async function GET() {
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
