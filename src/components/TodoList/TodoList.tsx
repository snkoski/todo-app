import React from 'react';
import TodoComposer from '../TodoComposer';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';

function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  function toggleDone(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  }

  return (
    <div className="max-w-96 flex flex-col gap-1">
      <TodoComposer setTodos={setTodos} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} setTodos={setTodos} />
      ))}
    </div>
  );
}

export default TodoList;
