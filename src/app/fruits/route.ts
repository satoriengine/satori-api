// 文字列を改行区切りで返す
// JSONではなく、テキストを返すことに注意
export async function GET() {
  const colors = ['apple', 'orange', 'melon', 'banana'];
  return new Response(colors.join('/'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
