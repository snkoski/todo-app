import { useLoaderData } from 'react-router-dom';
import { BenchReview as IBenchReview } from '../../types';
import type { Params } from 'react-router-dom';

export async function loader({ params }: { params: Params<'reviewId'> }) {
  const review = {
    id: params.reviewId,
    benchId: 1,
    rating: 4.5,
    comment: 'This is a great bench!'
  };
  return { review };
}

function BenchReview() {
  const { review } = useLoaderData() as { review: IBenchReview };
  return (
    <div>
      <h1>Bench Review {review.id}</h1>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
    </div>
  );
}

export default BenchReview;
