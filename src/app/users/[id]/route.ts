import { NextResponse } from 'next/server';
import { z } from 'zod';

import { deleteUser, getUserById, updateUser } from '@/db/user';
import { UserUpdateInputObjectSchema } from '@/lib/schema/generated/zod/schemas';

import type { RouteParams } from '@/types/page';

// get one user
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUserById(Number(id));
  // check user exists
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

// update user
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const result = UserUpdateInputObjectSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: z.treeifyError(result.error),
      },
      { status: 400 },
    );
  }

  // check if exists
  const user = await getUserById(Number(id));
  if (!user) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: {
          properties: {
            email: {
              errors: ['user does not exist'],
            },
          },
        },
      },
      { status: 400 },
    );
  }

  // update user
  const updatedUser = await updateUser(user.id, result.data);
  return NextResponse.json(updatedUser);
}

// delete user
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await deleteUser(Number(id));
    return new NextResponse(null, { status: 204 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'User failed to delete' },
      { status: 500 },
    );
  }
}
