import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { MovieDetails, Video } from '@/types/movie';

interface MovieDetailProps {
  movieId: number;
  selectedVideoId?: string | null;
  onVideoSelect?: (videoId: string) => void;
}

const MovieDetail = ({ movieId, selectedVideoId, onVideoSelect }: MovieDetailProps) => {
  const { movie, videos, loading } = useMovieDetails(movieId);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(selectedVideoId || null);

  useEffect(() => {
    if (selectedVideoId) {
      setPlayingVideoId(selectedVideoId);
    }
  }, [selectedVideoId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!movie) {
    return <div className="not-found">Movie not found</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-header">
        <Image
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <p className="movie-release-date"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="movie-runtime"><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p className="movie-genres"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      {videos.length > 0 && (
        <div className="movie-videos">
          <h2>Videos</h2>
          <div className="video-list">
            {videos.map((video) => (
              <div key={video.key} className="video-item" onClick={() => onVideoSelect && onVideoSelect(video.key)}>
                <iframe
                  width="300"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.key}${playingVideoId === video.key ? '?autoplay=1' : ''}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                ></iframe>
                <p className="video-name">{video.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr style={{'width':' 2px', 'border': '1px solid black'}}></hr>
    </div>
  );
};

export default MovieDetail;
