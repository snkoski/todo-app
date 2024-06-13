import React from 'react';
import { Todo } from '../../types';

function createTodo(message: string): Todo {
  return {
    id: Math.floor(Math.random() * 100000).toString(),
    message,
    done: false
  };
}

function TodoComposer({ handleAddTodo }: { handleAddTodo: (newTodo: Todo) => void }) {
  const [message, setMessage] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = createTodo(message);
    handleAddTodo(newTodo);
    setMessage('');
  };
  return (
    <form onSubmit={(e) => handleAdd(e)}>
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
