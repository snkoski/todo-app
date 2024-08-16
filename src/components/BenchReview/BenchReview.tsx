import { useLoaderData } from 'react-router-dom';
import { BenchReview as IBenchReview } from '../../types';
import type { Params } from 'react-router-dom';

export async function loader({ params }: { params: Params<'reviewId'> }) {
  const review = {
    id: params.reviewId,
    benchId: params.reviewId,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: 'This is a great bench!'
  };
  return { review };
}

function BenchReview() {
  const { review } = useLoaderData() as { review: IBenchReview };

  function getStarRating(rating: number) {
    const fullStars = Math.floor(rating); // Get the full number of stars
    return '⭐'.repeat(fullStars); // Repeat the star emoji for the fullStars count
  }

  return (
    <div>
      <h1>Bench Review {review.id}</h1>
      <p>Rating: {getStarRating(review.rating)}</p>
      <p>Comment: {review.comment}</p>
    </div>
  );
}

export default BenchReview;
