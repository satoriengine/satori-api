import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CreateUserSchema } from '@/app/users/route';
import { prisma } from '@/db/prisma';

// パラメータの型定義
type RouteParams = { params: Promise<{ id: string }> };

// get one user
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

// update user
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const result = CreateUserSchema.partial().safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: z.treeifyError(result.error),
      },
      { status: 400 },
    );
  }

  // update user
  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: result.data,
  });
  return NextResponse.json(updatedUser);
}

// delete user
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'User failed to delete' },
      { status: 500 },
    );
  }
}
