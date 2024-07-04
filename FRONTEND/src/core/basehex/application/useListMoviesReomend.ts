import { useQuery, UseQueryResult } from "@tanstack/react-query";
import MoviesRecomend from "../domain/MoviesRecomend";
import { LIST_MOVIES_RECOMEND } from "./QueryKeys";
import { movieRepository } from "../infrastructure";

export const useListMoviesRecomend = (
  userId: number
): UseQueryResult<MoviesRecomend[], Error> => {
  const response = useQuery({
    queryKey: [LIST_MOVIES_RECOMEND, userId],
    queryFn: async () => await movieRepository.moviesRecomendByUserId(userId),
    enabled: userId !== 0,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return response;
};
