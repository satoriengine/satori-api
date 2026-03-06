// 文字列を返すのみ
export async function GET() {
  const text = 'Hello, Bob';
  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
