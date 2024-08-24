interface BenchCardProps {
  name: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  ratings: number[];
}

function BenchCard({ bench }: { bench: BenchCardProps }) {
  return (
    <div className="border border-black p-2">
      <h1>{bench.name}</h1>
      <h3>{bench.location}</h3>
    </div>
  );
}

export default BenchCard;
