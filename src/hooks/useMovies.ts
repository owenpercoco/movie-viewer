import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

const API_KEY = "never work again";

const useMovies = (year: string, sortOrder: string, textStuff: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState<{ [key: string]: Movie[]}>({});

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      // const cacheKey = `moviesReleased-${year}`;
      // if (cacheKey in cache) {
      //   setMovies(cache[cacheKey]);
      //   setLoading(false);
      //   return;
      // };
      console.log("here we are in the api ", year, textStuff)
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${textStuff}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31&page=1`
      );
      
      const data = await response.json();
      if (data.results.length === 0) throw new Error("you dont have any movies")
      const topTenMovies = data.results.slice(0, 10); // Limit to top 10 movies

      // setCache((prevCache) => ({ ...prevCache, [cacheKey]: topTenMovies }));
      setMovies(topTenMovies);
      setLoading(false);
    };

    fetchMovies();
  }, [year, textStuff]);

  const sortedMovies = sortOrder === 'ascending' ? [...movies].reverse() : movies;

  return { movies: sortedMovies, loading };
};

export default useMovies;
