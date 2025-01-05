import { create } from "zustand";
import { MovieFilter } from "./types/MovieFilter";

const useMovieFilterStore = create<MovieFilter>()((set) => ({
  page: 1,
  previousPage: 0,
  query: "",
  rating: 0,
  setPage: (page: number) => set((state: MovieFilter) => ({ ...state, page })),
  setPreviousPage: (previousPage: number) =>
    set((state: MovieFilter) => ({ ...state, previousPage })),
  setQuery: (query: string) =>
    set((state: MovieFilter) => ({ ...state, query })),
  setRating: (rating: number) =>
    set((state: MovieFilter) => ({ ...state, rating })),
}));

export default useMovieFilterStore;
