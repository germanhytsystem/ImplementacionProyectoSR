import MoviesContext from "@/core/hooks/MoviesContext";
import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import MoviesFilter from "./MoviesFilter";
import MovieSingle from "./MovieSingle";
import { Link } from "react-router-dom";

interface IProps {
  page: any;
}

const MoviesGrid = ({ page }: IProps) => {
  const {
    movies,
    searchMovie,
    setSearchMovie,
    selectedGenre,
    setSelectedGenre,
    searchMovieByTitle,
    sectectMovieByGenre,
  } = useContext(MoviesContext);

  return (
    <>
      <section className="container mx-auto my-8 sm:my-10">
        <div className="mt-2">
          <h3
            className="font-general-regular 
                        text-start 
                        text-secondary-dark
                        text-base
                        font-semibold
                        sm:text-xl
                        mb-3
                        "
          >
            Filtros por titulo y género
          </h3>
          <div
            className="
                        flex
						flex-col
						sm:flex-row						
                        justify-between
                        border-b 
                        border-secondary-light
                        pb-3
                        gap-3
                        "
          >
            <div className="flex justify-between gap-2">
              <span
                className="
                        hidden
                        sm:block
                        bg-primary-light
                        p-2.5
                        border-2
                        border-gray-200
                        shadow-lg
                        rounded-xl
                        cursor-pointer
                        "
              >
                <FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5"></FiSearch>
              </span>
              <input
                onChange={(e) => {
                  setSearchMovie(e.target.value);
                }}
                className=" 
                        pl-3
                        pr-1
                        sm:px-4
                        py-2
                        border-2 
                        border-gray-200
                        rounded-lg
                        text-sm
                        sm:text-base
                        font-semibold
                        bg-primary-light
                        text-primary-dark
                        w-full
                        sm:w-fit
                        "
                id="name"
                name="name"
                type="search"
                placeholder="Buscar Película"
                aria-label="Name"
              />
            </div>

            <MoviesFilter setSelectedGenre={setSelectedGenre} movies={movies} />
          </div>
        </div>
      </section>

      <section className="container mx-auto my-10">
        {movies !== undefined && movies.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
            {selectedGenre
              ? sectectMovieByGenre.map((movie) => (
                  <MovieSingle
                    title={movie.title}
                    genres={movie.genres}
                    numbermovie={movie.movieId}
                    key={movie.movieId}
                  />
                ))
              : searchMovie
              ? searchMovieByTitle.map((movie) => (
                  <MovieSingle
                    title={movie.title}
                    genres={movie.genres}
                    numbermovie={movie.movieId}
                    key={movie.movieId}
                  />
                ))
              : page === "home"
              ? movies
                  .filter((_p, index) => index < 6)
                  .map((movie) => (
                    <MovieSingle
                      title={movie.title}
                      genres={movie.genres}
                      numbermovie={movie.movieId}
                      key={movie.movieId}
                    />
                  ))
              : movies.map((movie) => (
                  <MovieSingle
                    title={movie.title}
                    genres={movie.genres}
                    numbermovie={movie.movieId}
                    key={movie.movieId}
                  />
                ))}
          </div>
        ) : (
          <div className="w-full mx-auto min-h-[300px] my-20 ">
            <div className="text-center font-bold">Loading...</div>
          </div>
        )}
      </section>
      <Link to="/peliculas">
        <div className="w-full flex items-center justify-center my-10">
          <button className="bg-primary-dark px-4 py-2 rounded-sm text-primary-light">
            Ver más
          </button>
        </div>
      </Link>
    </>
  );
};

export default MoviesGrid;
