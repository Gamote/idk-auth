import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.create({
      data: {
        email: 'contact@gamote.ro',
        password: '123456',
        firstName: null,
        lastName: 'Gamote',
      },
    });

    await prisma.user.create({
      data: {
        email: 'john@doe.com',
        password: '123456',
        firstName: 'John',
        lastName: 'Doe',
      },
    });

    console.log('Seeding Users complete.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void main();
