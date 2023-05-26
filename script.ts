import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@gmail.com',
      age: 20,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: { select: { emailUpdates: true } },
    },
  });
  console.log('user ', user);

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Bob',
        email: 'bob@gmail.com',
        age: 21,
      },
      { name: 'Kyle', email: 'kyle@gmail.com', age: 27 },
    ],
  });
  console.log('users ', users);

  const findUnique = await prisma.user.findUnique({
    where: {
      email: 'bob@gmail.com',
    },
  });
  console.log('findUnique ', findUnique);

  const findFirst = await prisma.user.findFirst({
    where: {
      name: 'Bob',
    },
  });
  console.log('findFirst ', findFirst);

  const findMany = await prisma.user.findMany({
    where: {
      name: 'Bob',
    },
    orderBy: {
      age: 'desc',
    },
  });
  console.log('findMany ', findMany);

  const findManyWithPagination = await prisma.user.findMany({
    where: {
      name: 'Bob',
    },
    take: 2,
  });
  console.log('findManyWithPagination ', findManyWithPagination);

  // Advanced filtering
  const findManyWithAdvancedFiltering1 = await prisma.user.findMany({
    where: {
      name: { not: 'Bob' },
    },
  });
  console.log(
    'findManyWithAdvancedFiltering1 ',
    findManyWithAdvancedFiltering1,
  );

  const findManyWithAdvancedFiltering2 = await prisma.user.findMany({
    where: {
      name: { equals: 'Bob' },
    },
  });
  console.log(
    'findManyWithAdvancedFiltering2 ',
    findManyWithAdvancedFiltering2,
  );

  const findManyWithAdvancedFiltering3 = await prisma.user.findMany({
    where: {
      name: { in: ['Bob', 'Kyle'] },
    },
  });
  console.log(
    'findManyWithAdvancedFiltering3 ',
    findManyWithAdvancedFiltering3,
  );

  const findManyWithAdvancedFiltering4 = await prisma.user.findMany({
    where: {
      name: { notIn: ['Bob', 'Kyle'] },
    },
  });
  console.log(
    'findManyWithAdvancedFiltering4 ',
    findManyWithAdvancedFiltering4,
  );

  const findManyWithAdvancedFiltering5 = await prisma.user.findMany({
    where: {
      age: { lt: 27 }, // lt: less than
    },
  });
  console.log(
    'findManyWithAdvancedFiltering5 ',
    findManyWithAdvancedFiltering5,
  );

  const findManyWithAdvancedFiltering6 = await prisma.user.findMany({
    where: {
      email: { contains: '@gmail.com' },
    },
  });
  console.log(
    'findManyWithAdvancedFiltering6 ',
    findManyWithAdvancedFiltering6,
  );

  const findManyWithAdvancedFiltering7 = await prisma.user.findMany({
    where: {
      email: { startsWith: 'b' }, // startsWith, endsWith
      name: 'sally',
    },
  });
  console.log(
    'findManyWithAdvancedFiltering7 ',
    findManyWithAdvancedFiltering7,
  );

  const findManyWithAdvancedFiltering8 = await prisma.user.findMany({
    where: {
      AND: [{ email: { startsWith: 'b' } }, { name: 'sally' }],
    },
  });
  console.log(
    'findManyWithAdvancedFiltering8 ',
    findManyWithAdvancedFiltering8,
  );

  const findManyWithAdvancedFiltering9 = await prisma.user.findMany({
    where: {
      AND: [{ email: { startsWith: 'b' } }, { email: { endsWith: '.com' } }],
    },
  });
  console.log(
    'findManyWithAdvancedFiltering9 ',
    findManyWithAdvancedFiltering9,
  );

  const findManyWithAdvancedFiltering10 = await prisma.user.findMany({
    where: {
      OR: [{ email: { startsWith: 'b' } }, { email: { endsWith: '.com' } }],
    },
  });
  console.log(
    'findManyWithAdvancedFiltering10 ',
    findManyWithAdvancedFiltering10,
  );

  const findManyWithAdvancedFiltering11 = await prisma.user.findMany({
    where: {
      NOT: [{ email: { startsWith: 'b' } }, { email: { endsWith: '.com' } }],
    },
  });
  console.log(
    'findManyWithAdvancedFiltering11 ',
    findManyWithAdvancedFiltering11,
  );

  // Relationship filtering

  // one-to-one relationship
  const relationFiltering1 = await prisma.user.findMany({
    where: {
      userPreference: {
        emailUpdates: true,
      },
    },
  });
  console.log('relationFiltering1 ', relationFiltering1);

  // one-to-many relationship
  const relationFiltering2 = await prisma.user.findMany({
    where: {
      writtenPosts: {
        every: {
          // every, none, some
          createdAt: new Date(),
        },
      },
    },
  });
  console.log('relationFiltering2 ', relationFiltering2);

  const relationFiltering3 = await prisma.post.findMany({
    where: {
      author: {
        is: {
          // is, isNot
          age: 27,
        },
      },
    },
  });
  console.log('relationFiltering3 ', relationFiltering3);

  // Update
  const update1 = await prisma.user.update({
    where: {
      email: 'kyle@gmail.com',
    },
    data: {
      name: 'Kyle02',
      email: 'kyle02@gmail.com',
    },
  });
  console.log('update1 ', update1);

  const update2 = await prisma.user.updateMany({
    where: {
      name: 'kyle',
    },
    data: {
      name: 'Kyle02',
      email: 'kyle02@gmail.com',
    },
  });
  console.log('update2 ', update2);

  const update3 = await prisma.user.update({
    where: {
      email: 'kyle02@gmail.com',
    },
    data: {
      age: {
        increment: 1,
      },
    },
  });
  console.log('update3 ', update3);

  // Connect Existing Relationships

  const connectExistingRelationships01 = await prisma.user.update({
    where: {
      email: 'kyle02@gmail.com',
    },
    data: {
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
  });
  console.log(
    'connectExistingRelationships01 ',
    connectExistingRelationships01,
  );

  const preference = await prisma.userPreference.create({
    data: {
      emailUpdates: true,
    },
    select: {
      id: true,
    },
  });
  console.log('preference ', preference);
  const connectExistingRelationships02 = await prisma.user.update({
    where: {
      email: 'alice@gmail.com',
    },
    data: {
      userPreference: {
        connect: {
          id: preference.id,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });
  console.log(
    'connectExistingRelationships02 ',
    connectExistingRelationships02,
  );

  // Delete
  const delete01 = await prisma.user.delete({
    where: {
      email: 'alice@gmail.com',
    },
  });
  console.log('delete01 ', delete01);

  const delete02 = await prisma.user.deleteMany({
    where: {
      age: { gt: 20 }, // gt: greater than
    },
  });
  console.log('delete02 ', delete02);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
