export interface Movie {
  id: number;
  name: string;
  poster_path: string;
  title: string;
  original_title: string;
  imdb_id: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  production_companies: ProductionCompany[];
  genres: Genre[];
  tagline: string;
  vote_average: number;
  adult: boolean;
  overview: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Genre {
  name: string;
}
