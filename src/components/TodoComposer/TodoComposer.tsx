import React from 'react';
import { useFetcher } from 'react-router-dom';

function TodoComposer() {
  const fetcher = useFetcher();
  const [title, setTitle] = React.useState('');

  return (
    <fetcher.Form method="post" onSubmit={() => setTitle('')}>
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
    </fetcher.Form>
  );
}

export default TodoComposer;
