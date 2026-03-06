import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/db/prisma';

// ユーザー作成時のバリデーション
export const CreateUserSchema = z.object({
  email: z.email('メールアドレスの形式が正しくありません'),
  name: z.string().min(2, '名前は2文字以上必要です').optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// get all users
export async function GET() {
  const user = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  return NextResponse.json(user);
}

// create new user
export async function POST(request: Request) {
  const body = await request.json();
  const result = CreateUserSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: z.treeifyError(result.error),
      },
      { status: 400 },
    );
  }
  // create user
  const newUser = await prisma.user.create({
    data: result.data,
  });
  return NextResponse.json(newUser, { status: 201 });
}
