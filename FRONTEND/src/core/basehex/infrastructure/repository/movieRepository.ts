import Movie from "@/core/basehex/domain/Movie";
import MovieResponseMap from "@/core/basehex/infrastructure/model/MovieResponseMap";
import { API_BASE_URL } from "@/core/constants/env";
import axios, { AxiosResponse } from "axios";

export const MoviesListAll = async (): Promise<Movie[]> => {
  const response: AxiosResponse<MovieResponseMap[]> = await axios.get(
    `${API_BASE_URL}/peliculas`
  );

  const movies = response.data.map((item) => {
    const movie: Movie = {
      movieId: item.movieId,
      title: item.title,
      genres: item.genres,
    };
    return movie;
  });

  return movies;
};
