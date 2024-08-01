export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres: { id: number; name: string }[];
    runtime: number;
  }

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres: { id: number; name: string }[];
    runtime: number;
}

export interface Video {
    key: string;
    name: string;
    site: string;
    type: string;
}
