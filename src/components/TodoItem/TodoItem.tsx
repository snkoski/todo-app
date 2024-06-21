import React from 'react';
import { Todo } from '../../types';

function TodoItem({
  todo,
  handleUpdateTodo,
  handleRemoveTodo,
  handleUpdateShawnPoints
}: {
  todo: Todo;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  handleRemoveTodo: (id: string) => void;
  handleUpdateShawnPoints: (operation: 'add' | 'subtract', points: number) => void;
}) {
  const FINISHED_TODO_POINTS = 2;
  const [title, setTitle] = React.useState(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleEditTodo(e: React.FormEvent) {
    e.preventDefault();
    let newTodo = { ...todo, title };
    handleUpdateTodo(newTodo);
    setIsEditing(false);
  }

  function handleIsEditing() {
    let lastIsEditing = isEditing;
    setIsEditing(!lastIsEditing);
    if (!lastIsEditing) {
      setTitle(todo.title);
    }
  }

  function handleToggleDone() {
    let newTodo = { ...todo, done: !todo.done };
    handleUpdateTodo(newTodo);
    if (newTodo.done) {
      handleUpdateShawnPoints('add', FINISHED_TODO_POINTS);
    } else {
      handleUpdateShawnPoints('subtract', FINISHED_TODO_POINTS);
    }
  }

  function handleDelete(id: string) {
    handleRemoveTodo(id);
  }

  return (
    <li className="flex py-3 px-2 bg-slate-600 justify-between text-white text-lg">
      <div className="flex gap-1">
        {isEditing ? (
          <form onSubmit={(e) => handleEditTodo(e)} className="flex gap-1">
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-red-600 border text-black"
            />
            <button>Submit</button>
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone()}
              className="w-5"
              id={`done-checkbox-${todo.id}`}
            />
            <label
              htmlFor={`done-checkbox-${todo.id}`}
              className={`${todo.done ? 'line-through' : ''}`}
            >
              {todo.title}
            </label>
          </>
        )}
      </div>
      <div className="flex gap-1">
        <button onClick={() => handleIsEditing()} className="text-yellow-500">
          Edit
        </button>
        <button className="w-5 bg-white" onClick={() => handleDelete(todo.id)}>
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
