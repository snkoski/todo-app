import React from 'react';
import { Todo } from '../../types';

function TodoItem({
  todo,
  toggleDone,
  setTodos
}: {
  todo: Todo;
  toggleDone: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const [message, setMessage] = React.useState(todo.message);
  const [isEditing, setIsEditing] = React.useState(false);
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
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => (prevTodo.id === todo.id ? { ...prevTodo, message } : prevTodo))
    );
    setIsEditing(false);
  }
  function handleIsEditing() {
    let prevIsEditing = isEditing;
    setIsEditing(!prevIsEditing);
    if (!prevIsEditing) {
      setMessage(todo.message);
    }
  }

  function handleDelete(id: string) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
              onChange={() => toggleDone(todo.id)}
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
