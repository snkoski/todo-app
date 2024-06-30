import React from 'react';
import { Todo } from '../../types';
import { useFetcher } from 'react-router-dom';

type TodoItemProps = {
  todo: Todo;
  handleUpdateShawnPoints: (operation: 'add' | 'subtract', points: number) => void;
};

function TodoItem({ todo, handleUpdateShawnPoints }: TodoItemProps) {
  const FINISHED_TODO_POINTS = 2;
  const fetcher = useFetcher();
  const [title, setTitle] = React.useState(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setIsEditing(false);
  }, [todo]);

  function handleIsEditing() {
    let lastIsEditing = isEditing;
    setIsEditing(!lastIsEditing);
    if (!lastIsEditing) {
      setTitle(todo.title);
    }
  }

  function handleToggleDone() {
    let newTodo = { ...todo, done: !todo.done };
    if (newTodo.done) {
      handleUpdateShawnPoints('add', FINISHED_TODO_POINTS);
    } else {
      handleUpdateShawnPoints('subtract', FINISHED_TODO_POINTS);
    }
  }

  return (
    <li className="flex py-3 px-2 bg-slate-600 justify-between text-white text-lg">
      <div className="flex gap-1">
        {isEditing ? (
          <fetcher.Form method="post" className="flex gap-1">
            <input type="hidden" name="id" value={todo.id} />
            <input
              name="title"
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-red-600 border text-black"
            />
            <button type="submit" name="intent" value="edit">
              Submit
            </button>
          </fetcher.Form>
        ) : (
          <fetcher.Form method="post" action="/todo">
            <input type="hidden" name="id" value={todo.id} />
            <input type="hidden" name="done" value={todo.done ? 'false' : 'true'} />
            <button
              name="intent"
              value="edit"
              type="submit"
              onClick={() => handleToggleDone()}
              className="w-5"
              id={`done-checkbox-${todo.id}`}
            >
              {todo.done ? '✅' : '⬜️'}
            </button>
            <label
              htmlFor={`done-checkbox-${todo.id}`}
              className={`${todo.done ? 'line-through' : ''}`}
            >
              {todo.title}
            </label>
          </fetcher.Form>
        )}
      </div>
      <fetcher.Form className="flex gap-1" method="post" action="/todo">
        <input type="hidden" name="id" value={todo.id} />
        <button onClick={() => handleIsEditing()} className="text-yellow-500" type="button">
          Edit
        </button>
        <button className="w-5 bg-white" type="submit" name="intent" value="delete">
          🗑️
        </button>
      </fetcher.Form>
    </li>
  );
}

export default TodoItem;
