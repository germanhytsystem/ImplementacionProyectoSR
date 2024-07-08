import { API_BASE_URL } from "@/core/constants/env";
import RatingRequest from "../../domain/RatingRequest";
import { RatingResponseMap } from "../model/RatingResponseMap";
import axios, { AxiosResponse } from "axios";
import { Rating } from "../../domain/Rating";

export const create = async (hilado: RatingRequest): Promise<Rating> => {
  const ratingRequestMap: RatingResponseMap = {
    userId: hilado.userId,
    movieId: hilado.movieId,
    rating: hilado.rating,
  };
  const response: AxiosResponse<RatingResponseMap> = await axios.post(
    `${API_BASE_URL}/ratings`,
    ratingRequestMap
  );

  const ratingResponseMap: RatingResponseMap = response.data;

  const newRating: Rating = {
    userId: ratingResponseMap.userId,
    movieId: ratingResponseMap.movieId,
    rating: ratingResponseMap.rating,
  };

  return newRating;
};
