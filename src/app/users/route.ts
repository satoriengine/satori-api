import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/db/prisma';
import { UserCreateInputObjectSchema } from '@/lib/schema/generated/zod/schemas';

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
  const result = UserCreateInputObjectSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: z.treeifyError(result.error),
      },
      { status: 400 },
    );
  }

  // unique check
  const exists = await prisma.user.findFirst({
    where: { email: result.data.email },
  });
  if (exists) {
    return NextResponse.json(
      {
        message: 'validation error',
        errors: {
          properties: {
            email: {
              errors: ['mail already exists'],
            },
          },
        },
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
