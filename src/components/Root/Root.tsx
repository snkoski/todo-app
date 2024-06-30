import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <h1 className="text-center text-2xl">Root Layout</h1>
      <div className="flex">
        <nav>
          <ul className="flex-col gap-3 pl-5">
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`todo`}>Todo List</Link>
            </li>
            <li>
              <Link to={`recipes`}>Recipes</Link>
            </li>
          </ul>
        </nav>
        <main className="text-center mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
