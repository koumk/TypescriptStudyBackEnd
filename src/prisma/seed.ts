import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: '買い物', completed: false, price: '19.99' },
      { title: '洗濯', completed: true, price: '9.99' },
    ],
  });
  console.log('Seeded database with sample todos');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });