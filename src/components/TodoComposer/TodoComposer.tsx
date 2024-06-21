import React from 'react';
import { Todo } from '../../types';
import { Form } from 'react-router-dom';

export async function action({ request }: { request: Request }) {
  console.log('todo POST action - request', request);

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const title = data.title as string;
  const todo = await createTodo(title);
  return { todo };
}

async function createTodo(title: string): Promise<Todo> {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  const todo = await response.json();
  return todo;
}

function TodoComposer() {
  const [title, setTitle] = React.useState('');

  return (
    <Form method="post">
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-black border"
      />
      <button type="submit">Add Todo</button>
    </Form>
  );
}

export default TodoComposer;
