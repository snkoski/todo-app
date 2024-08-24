import { Outlet } from 'react-router-dom';

function BenchMarker() {
  const fakeIds = [1, 2, 3, 4, 5];
  return (
    <>
      <div>BenchMarker</div>
      <div className="flex justify-items-start ">
        <div className="border border-violet-700">
          <h2>Your Reviews</h2>
          <ul>
            {fakeIds.map((id) => (
              <li key={id}>
                <a href={`/benchmarker/${id}`}>BenchMarker {id}</a>
              </li>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default BenchMarker;
