import React from 'react';
import TodoComposer from '../TodoComposer';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  const response = await fetch('http://localhost:3000/todos');
  const savedTodos = await response.json();
  return { savedTodos };
}

function TodoList() {
  const { savedTodos } = useLoaderData() as { savedTodos: Todo[] };
  console.log('savedTodos', savedTodos);

  const [todos, setTodos] = React.useState<Todo[]>(savedTodos || []);
  const [shawnPoints, setShawnPoints] = React.useState<number>(0);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    let newTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    setTodos(newTodos);
  };

  const handleRemoveTodo = (id: string) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
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
      <TodoComposer handleAddTodo={handleAddTodo} />
      {todos.map((todo) => (
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
