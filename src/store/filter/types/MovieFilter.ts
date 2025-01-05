export interface MovieFilter {
    page: number;
    previousPage: number;
    query: string;
    rating: number | undefined;
    setPage: (page: number) => void;
    setPreviousPage: (page: number) => void;
    setQuery: (query: string) => void;
    setRating: (number: number) => void;
}