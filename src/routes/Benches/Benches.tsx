import BenchCard from '../../components/BenchCard';

function Benches() {
  const benches = [
    {
      name: 'Bench 1',
      description: 'Bench 1 Description',
      location: 'Bench 1 Location',
      latitude: 1,
      longitude: 1,
      ratings: [1, 2, 3]
    },
    {
      name: 'Bench 2',
      description: 'Bench 2 Description',
      location: 'Bench 2 Location',
      latitude: 2,
      longitude: 2,
      ratings: [1, 2, 3]
    },
    {
      name: 'Bench 3',
      description: 'Bench 3 Description',
      location: 'Bench 3 Location',
      latitude: 3,
      longitude: 3,
      ratings: [1, 2, 3]
    },
    {
      name: 'Bench 4',
      description: 'Bench 4 Description',
      location: 'Bench 4 Location',
      latitude: 4,
      longitude: 4,
      ratings: [1, 2, 3]
    },
    {
      name: 'Bench 5',
      description: 'Bench 5 Description',
      location: 'Bench 5 Location',
      latitude: 5,
      longitude: 5,
      ratings: [1, 2, 3]
    }
  ];
  return (
    <>
      <div>Benches</div>
      <div className="flex justify-items-start ">
        <div className="border border-violet-700">
          <h2>Your Reviews</h2>
          <ul className="flex gap-2">
            {benches.map((bench) => (
              <BenchCard key={bench.name} bench={bench} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Benches;
