import { createContext, useEffect, useState } from "react";
import Movie from "../basehex/domain/Movie";
import useListMoviesAll from "../basehex/application/useListMoviesAll";

interface IProps {
  children: React.ReactNode;
  idMovie?: number;
}

export const MoviesContext = createContext<{
  movies: Movie[];
  searchMovie: string;
  setSearchMovie: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string | null;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string | null>>;
  searchMovieByTitle: Movie[];
  sectectMovieByGenre: Movie[];
  idMovie: number | undefined;
}>({
  movies: [],
  searchMovie: "",
  setSearchMovie: () => {},
  selectedGenre: "",
  setSelectedGenre: () => {},
  searchMovieByTitle: [],
  sectectMovieByGenre: [],
  idMovie: undefined,
});

export const MoviesProvider = (props: IProps) => {
  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");

  const { idMovie } = props;

  const { data: movieslist } = useListMoviesAll();

  useEffect(() => {
    console.log("movieslist", movieslist);
    if (movieslist) {
      setMovies(movieslist);
    }
  }, [movieslist]);

  // search
  const searchMovieByTitle = movies.filter((item) => {
    const result = item.title.toLowerCase().includes(searchMovie.toLowerCase())
      ? item // Filtramos los items con coindicencia de lo digitado en el input
      : searchMovie === ""
      ? item // Mostramos todos lo items
      : "";
    return result;
  });

  // Select by genre
  const sectectMovieByGenre = movies.filter((item) => {
    const genre = item.genres.charAt(0).toUpperCase() + item.genres.slice(1);

    return genre.includes(selectedGenre ?? "");
  });

  return (
    <MoviesContext.Provider
      value={{
        movies,
        searchMovie,
        setSearchMovie,
        selectedGenre,
        setSelectedGenre,
        searchMovieByTitle,
        sectectMovieByGenre,
        idMovie,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
