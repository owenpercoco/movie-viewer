import React, { useState } from 'react';
import Image from 'next/image';
import useMovies from '@/hooks/useMovies';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  year: string;
  sortOrder: string;
  sortText: string;
  onMovieSelect: (movieId: number) => void;
}

const MovieList = ({ year, sortOrder, sortText, onMovieSelect }: MovieListProps) => {
  const { movies, loading } = useMovies(year, sortOrder, sortText);
  const [rightPage, setRightPage] = useState(3);
  const [leftPage, setLeftPage] = useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div>No movies found for the year {year}</div>;
  }

  return (
    <div className='extra-wrapper'>
        {leftPage > 0 && (
            <span className="page-button left" onClick={() => {
                if (leftPage === 0) return;
                setRightPage(prev => prev - 3);
                setLeftPage(prev => prev - 3);
            }}>&lt;</span>
        )}
        <div className='movie-list-container'>
        {movies.slice(leftPage, rightPage).map((movie: Movie) => (
            <div key={movie.id} className='movie-wrapper' onClick={() => onMovieSelect(movie.id)}>
              <div className="movie-container">
                  <Image
                  className='list-image'
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  />
                  <div className="movie-text">
                    <h2>{movie.title}</h2>
                  </div>
              </div>
            </div>
        ))}
        </div>
        {rightPage < movies.length && (
            <span className="page-button right" onClick={() => {
                if (rightPage === movies.length) return;
                setRightPage(prev => prev + 3);
                setLeftPage(prev => prev + 3);
            }}>&gt;</span>
        )}
    </div>
  );
};

export default MovieList;
