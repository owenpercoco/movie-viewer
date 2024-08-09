import { useState, useEffect } from 'react';
import { Video, MovieDetails } from '@/types/movie'

const API_KEY = "never work again";


export const useMovieDetails = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState<{ [key: string]: { movie: MovieDetails; videos: Video[] } }>({});

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const cacheKey = `movieDetail-${movieId}`;
      if (cache[cacheKey]) {
        setMovie(cache[cacheKey].movie);
        setVideos(cache[cacheKey].videos);
        setLoading(false);
      } else {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const movieData = await movieResponse.json();
        
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videoData = await videoResponse.json();
        const filteredVideos = videoData.results.filter((video: Video) => video.site === 'YouTube').slice(0, 3);

        setMovie(movieData);
        setVideos(filteredVideos);
        setCache((prevCache) => ({ ...prevCache, [cacheKey]: { movie: movieData, videos: filteredVideos } }));
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, cache]);

  return { movie, videos, loading }
}
