import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await db.user.create({
    data: {
      name: 'Burt',
      email: '2902978956@qq.com',
      passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u', //twixrox
    }
  });
}

seed();
