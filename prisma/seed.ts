import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const todo1 = await prisma.todo.create({
    data: {
      title: 'Buy milk',
      completed: false,
    },
  });

  const todo2 = await prisma.todo.create({
    data: {
      title: 'Buy eggs',
      completed: false,
    },
  });

  console.log({ todo1, todo2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
