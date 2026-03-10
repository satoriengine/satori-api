import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createUser, getUserByEmail, getUsers } from '@/db/user';
import { UserCreateInputObjectSchema } from '@/lib/schema/generated/zod/schemas';

// get all users
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
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
  const user = await getUserByEmail(result.data.email);
  if (user) {
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
  const newUser = await createUser(result.data);
  return NextResponse.json(newUser, { status: 201 });
}
