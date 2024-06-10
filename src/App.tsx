import { useState } from 'react';
import './App.css';

interface Todo {
  id: string;
  message: string;
  done: boolean;
}

function App() {
  const [todoMessage, setTodoMessage] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(DATA);

  function handleTodoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let newTodo = { message: todoMessage, id: crypto.randomUUID(), done: false };
    let nextTodos = [...todos, newTodo];
    setTodos(nextTodos);
    setTodoMessage('');
  }

  function deleteTodo(id: string) {
    let nextTodos = todos.filter((todo) => todo.id !== id);
    setTodos(nextTodos);
  }

  function handleDone(id: string) {
    let nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: true };
      }
      return todo;
    });
    setTodos(nextTodos);
  }

  function toggleDone(id: string) {
    let nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(nextTodos);
  }

  return (
    <div className="flex flex-row">
      {todoMessage && <p>Todo: {todoMessage}</p>}
      <form onSubmit={handleTodoSubmit}>
        <label htmlFor="todo-input" className="text-xl font-bold underline">
          Add a todo:
        </label>
        <input
          id="todo-input"
          className="border-2 border-gray-500 rounded-md p-1 m-1 w-1/2 text-xl font-bold underline"
          type="text"
          value={todoMessage}
          onChange={(event) => setTodoMessage(event.target.value)}
        />{' '}
      </form>
      <ul className="">
        {todos.map(({ id, message, done }: { id: string; message: string; done: boolean }) => {
          return (
            <li key={id} className={`${done ? 'line-through' : ''}`}>
              {message} <button onMouseDown={() => toggleDone(id)}>Finished</button>
              <button onClick={() => deleteTodo(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const DATA: Todo[] = [
  { id: '0000-0000-0000-0000-0001', message: 'Learn React', done: false },
  { id: '0000-0000-0000-0000-0002', message: 'Learn TypeScript', done: false },
  { id: '0000-0000-0000-0000-0003', message: 'buy groceries', done: false }
];
export default App;
