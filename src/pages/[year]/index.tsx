import React from 'react';
import { useRouter } from 'next/router';
import MovieContainer from '../components/MovieContainer';

const YearPage = () => {
  const router = useRouter();
  const { year } = router.query;

  return (
    <div>
      {year ? (
        <MovieContainer initialYear={year as string} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default YearPage;
