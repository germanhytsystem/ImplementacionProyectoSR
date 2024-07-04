import Movie from "@/core/basehex/domain/Movie";
import MovieResponseMap from "@/core/basehex/infrastructure/model/MovieResponseMap";
import { API_BASE_URL } from "@/core/constants/env";
import axios, { AxiosResponse } from "axios";
import MoviesRecomend from "../../domain/MoviesRecomend";
import MoviesRecomendResponseMap from "../model/MoviesRecomendResponseMap";

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

export const moviesRecomendByUserId = async (
  userId: number
): Promise<MoviesRecomend[]> => {
  const response: AxiosResponse<MoviesRecomendResponseMap[]> = await axios.get(
    `${API_BASE_URL}/peliculas/recomendar/${userId}`
  );

  const movies = response.data.map((item) => {
    const movie: MoviesRecomend = {
      movieId: item.movieId,
      title: item.title,
      genres: item.genres,
      predictions: item.predictions,
    };
    return movie;
  });

  return movies;
};
