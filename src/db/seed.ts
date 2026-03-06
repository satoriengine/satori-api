import { prisma } from '@/db/prisma';

// initial data for user table
const userData = [
  { id: 1, name: 'Bob', email: 'bob@example.com' },
  { id: 2, name: 'Alice', email: 'alice@example.com' },
  { id: 3, name: 'Tom', email: 'tom@example.com' },
  { id: 4, name: 'Wendy', email: 'wendy@example.com' },
];

async function main() {
  const promises = userData.map(({ id, name, email }) => {
    return prisma.user.upsert({
      where: { id },
      update: { name, email },
      create: { id, name, email },
    });
  });

  const results = await Promise.all(promises);
  results.forEach((result) => {
    console.log(result);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
