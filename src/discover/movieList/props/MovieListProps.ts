import { Movie } from "../../../detail/types/movie";

export interface MovieListProps {
    loading: boolean;
    movies: Movie[];
    rating: number;
}