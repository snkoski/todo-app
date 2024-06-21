import React from 'react';
import { Todo } from '../../types';

function createTodo(title: string): Todo {
  return {
    id: Math.floor(Math.random() * 100000).toString(),
    title,
    done: false
  };
}

function TodoComposer({ handleAddTodo }: { handleAddTodo: (newTodo: Todo) => void }) {
  const [title, setTitle] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = createTodo(title);
    handleAddTodo(newTodo);
    setTitle('');
  };
  return (
    <form onSubmit={(e) => handleAdd(e)}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-black border"
      ></input>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoComposer;
