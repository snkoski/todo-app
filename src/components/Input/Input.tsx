interface Todo {
  id: number;
  message: string;
}

function Input({
  className = '',
  todo,
  setTodo
}: {
  className?: string;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>
}): JSX.Element {
  return (
    <>
      <label htmlFor="todo-input" className="text-xl font-bold underline">
        Add a todo:
      </label>
      <input
        id="todo-input"
        className={`border-2 border-gray-500 rounded-md p-1 m-1 w-1/2 ${className}`}
        type="text"
        value={todo.message}
        onChange={(event) => setTodo({ ...todo, message: event.target.value })}
      />
    </>
  );
}

export default Input;
