import React from 'react';
import TodoComposer from '../TodoComposer';
import TodoItem from '../TodoItem';
import { Todo } from '../../types';

function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    let newTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    setTodos(newTodos);
  };

  const handleRemoveTodo = (id: string) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-96 flex flex-col gap-1">
      <TodoComposer setTodos={setTodos} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleRemoveTodo={handleRemoveTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
