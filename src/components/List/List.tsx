interface Todo {
  id: number;
  message: string;
}

function List({ className = '', todos = [] }: { className?: string; todos: Todo[] }): JSX.Element {
  return (
    <ul className={`${className} `}>
      {todos.map(({ id, message }: { id: number; message: string }) => {
        return (
          <li key={id}>
            {message}: {votes}
          </li>
        );
      })}
    </ul>
  );
}

export default List;
