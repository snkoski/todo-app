import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Hello, world!');
  // const newTodo = await prisma.todos.create({
  //   data: {
  //     title: '***Hello, world!'
  //   }
  // });
  // console.log('newTodo', newTodo);

  const todo = await prisma.todos.update({
    where: { id: 32 },
    data: { done: true, deleted: true }
  });

  console.log('todo', todo);

  const allTodos = await prisma.todos.findMany();
  console.log('after findMany');

  console.log('allTodos', allTodos);
}

await main()
  .then(async () => {
    console.log('done');

    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
