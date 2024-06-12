import React from 'react';
import { Todo } from '../../types';

function TodoItem({
  todo,
  handleUpdateTodo,
  handleRemoveTodo
}: {
  todo: Todo;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  handleRemoveTodo: (id: string) => void;
}) {
  const [message, setMessage] = React.useState(todo.message);
  const [isEditing, setIsEditing] = React.useState(false);
  // const [complete, setComplete] = React.useState(todo.done);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      console.log('useEffect');
      console.log(inputRef.current);
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleEditTodo(e: React.FormEvent) {
    e.preventDefault();
    let newTodo = { ...todo, message };
    handleUpdateTodo(newTodo);
    setIsEditing(false);
  }

  function handleIsEditing() {
    let prevIsEditing = isEditing;
    setIsEditing(!prevIsEditing);
    if (!prevIsEditing) {
      setMessage(todo.message);
    }
  }

  function handleToggleDone() {
    let newTodo = { ...todo, done: !todo.done };
    handleUpdateTodo(newTodo);
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              {todo.message}
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
