import { prisma } from '@/db/prisma';

import type {
  UserCreateInput,
  UserUpdateInput,
} from '@/lib/schema/generated/prisma/models';

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: {
      id: 'asc',
    },
  });
  return users;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    select: { id: true, name: true, email: true },
    where: { id },
  });
  return user;
}

export async function createUser(data: UserCreateInput) {
  const newUser = await prisma.user.create({
    data,
  });
  return newUser;
}

export async function updateUser(id: number, data: UserUpdateInput) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });
}
