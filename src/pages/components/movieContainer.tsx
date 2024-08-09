import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';

interface MovieContainerProps {
  initialYear?: string;
  initialMovieId?: number;
  initialVideoId?: string | null;
}

const MovieContainer = ({ initialYear, initialMovieId, initialVideoId } : MovieContainerProps) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(initialYear || currentYear.toString());
  const [sortOrder, setSortOrder] = useState<string>('popularity.desc');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(initialMovieId || null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(initialVideoId || null);
  const [sortTextField, setSortTextField] = useState<string>('')
  const router = useRouter();

  useEffect(() => {
    console.log(sortTextField)
  }, [sortTextField]);

  useEffect(() => {
    if (year && selectedMovieId !== null) {
      const newUrl = selectedVideoId ? `/${year}/${selectedMovieId}/${selectedVideoId}` : `/${year}/${selectedMovieId}`;
      if (router.asPath !== newUrl) {
        router.push(newUrl, undefined, { shallow: true });
      }
    } else if (year) {
      const newUrl = `/${year}`;
      if (router.asPath !== newUrl) {
        router.push(newUrl, undefined, { shallow: true });
      }
    }
  }, [year, selectedMovieId, selectedVideoId]);

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
    setSelectedMovieId(null);
    setSelectedVideoId(null);
  };

  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const handleMovieSelect = (movieId: number) => {
    setSelectedMovieId(movieId);
    setSelectedVideoId(null);
    window.scrollTo(0, 0);
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className="home-wrapper">
      <div className="select-container">
        <div className="year-container">
            <label htmlFor="year">Most Popular Movies of </label>
            <select id="year" value={year} onChange={handleYearChange}>
            {Array.from({ length: 10 }, (_, i) => currentYear - i).map((yearOption) => (
                <option key={yearOption} value={yearOption.toString()}>
                {yearOption}
                </option>
            ))}
            </select>
        </div>
        <div className='sort-container'>
            <label htmlFor="sortOrder">Sort By: </label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="popularity.desc">Descending</option>
                <option value="popularity.asc">Ascending</option>
            </select>
        </div>
        <div className='text-container'>
            <input type="text" onchange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log("firing change method", e.target)
              setSortTextField(e.target.value)}
              } value={sortTextField} placeholder="arbitrary sort"/>
        </div>
      </div>
      <div className="movie-detail-wrapper">
        {selectedMovieId && <MovieDetail movieId={selectedMovieId} selectedVideoId={selectedVideoId} onVideoSelect={handleVideoSelect} />}
      </div>
      <div className="list-wrapper">
        <MovieList year={year} sortOrder={sortOrder} sortText={sortTextField} onMovieSelect={handleMovieSelect} />
      </div>
    </div>
  );
};

export default MovieContainer;
