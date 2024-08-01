import React from 'react';
import { useRouter } from 'next/router';
import MovieContainer from '../../components/MovieContainer';

const VideoPage = () => {
  const router = useRouter();
  const { year, movieId, videoId } = router.query;

  return (
    <div>
      {year && movieId ? (
        <MovieContainer 
          initialYear={year as string} 
          initialMovieId={parseInt(movieId as string)} 
          initialVideoId={videoId ? videoId as string : null} 
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VideoPage;
