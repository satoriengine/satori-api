// 文字列を改行区切りで返す
export async function GET() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return new Response(colors.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
