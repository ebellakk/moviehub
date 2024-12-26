export interface MovieFilter {
    page: number;
    query: string;
    rating: number | undefined;
    setPage: (page: number) => void;
    setQuery: (query: string) => void;
    setRating: (number: number) => void;
}