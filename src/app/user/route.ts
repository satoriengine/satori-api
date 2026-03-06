import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/db/prisma';

// ユーザー作成時のバリデーション
export const CreateUserSchema = z.object({
  email: z.email('メールアドレスの形式が正しくありません'),
  name: z.string().min(2, '名前は2文字以上必要です').optional(),
});

// 型を抽出してエクスポート（便利です）
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export async function GET() {
  const user = await prisma.user.findMany({
    select: { name: true, email: true },
  });
  return NextResponse.json(user);
}
