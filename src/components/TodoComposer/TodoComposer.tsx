import React from 'react';
import { Todo } from '../../types';

function createTodo(message: string): Todo {
  return {
    id: Math.floor(Math.random() * 100000).toString(),
    message,
    done: false
  };
}

function TodoComposer({ setTodos }: { setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const [message, setMessage] = React.useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = createTodo(message);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setMessage('');
  };
  return (
    <form onSubmit={(e) => handleAddTodo(e)}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-black border"
      ></input>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoComposer;
