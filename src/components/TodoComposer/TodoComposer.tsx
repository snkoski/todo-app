import React from 'react';
import { Form } from 'react-router-dom';

function TodoComposer() {
  const [title, setTitle] = React.useState('');

  return (
    <Form method="post">
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-black border"
      />
      <button type="submit" name="intent" value="create">
        Add Todo
      </button>
    </Form>
  );
}

export default TodoComposer;
