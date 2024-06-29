import React from 'react';
import TodoComposer from '../TodoComposer';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  console.log('todoList loader');

  const response = await fetch('http://localhost:3000/todos');
  const savedTodos = await response.json();
  return { savedTodos };
}

export async function action({ request }: { request: Request }) {
  console.log('todo POST action - request', request);

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log('todo POST action - data', data);
  if (data.intent === 'create') {
    const title = data.title as string;
    const todo = await createTodo(title);
    return { todo };
  }
  if (data.intent === 'editTitle') {
    const { intent, ...updates } = data;

    const todo = await editTodo(updates);
    return { todo };
  }
  if (data.intent === 'done-checkbox') {
    const { intent, ...updates } = data;
    const todo = await editTodo(updates);
    return { todo };
  }
}

async function editTodo(data: { [k: string]: FormDataEntryValue }): Promise<Todo> {
  console.log('editTodo data', data);

  const response = await fetch('http://localhost:3000/todos/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  });
  if (!response.ok) {
    throw new Error('Failed to edit todo');
  }
  const todo = await response.json();

  return todo;
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

function TodoList() {
  const { savedTodos } = useLoaderData() as { savedTodos: Todo[] };
  console.log('savedTodos', savedTodos);

  const [todos, setTodos] = React.useState<Todo[]>(() => {
    console.log('initializing todos, savedTodos', savedTodos);

    return savedTodos || [];
  });
  const [shawnPoints, setShawnPoints] = React.useState<number>(0);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    let newTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    setTodos(newTodos);
  };

  const handleRemoveTodo = (id: string) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleUpdateShawnPoints = (operation: 'add' | 'subtract', points: number) => {
    if (operation === 'add') {
      setShawnPoints(shawnPoints + points);
    } else if (operation === 'subtract') {
      setShawnPoints(shawnPoints - points);
    } else {
      throw new Error("Invalid operation: must be 'add' or 'subtract'");
    }
  };

  return (
    <div className="max-w-96 flex flex-col gap-1">
      <h1>Shawn Points: {shawnPoints}</h1>
      <TodoComposer />
      {savedTodos
        .sort((a, b) => (Number(a.id) === Number(b.id) ? 0 : Number(a.id) > Number(b.id) ? 1 : -1))
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleUpdateShawnPoints={handleUpdateShawnPoints}
            handleUpdateTodo={handleUpdateTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}
    </div>
  );
}

export default TodoList;
