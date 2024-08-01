import React from 'react';
import { useRouter } from 'next/router';
import MovieContainer from '../../components/MovieContainer';

const MoviePage = () => {
  const router = useRouter();
  const { year, movieId } = router.query;


  return (
    <div>
      {year && movieId ? (
        <MovieContainer initialYear={year as string} initialMovieId={parseInt(movieId as string)} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MoviePage;
