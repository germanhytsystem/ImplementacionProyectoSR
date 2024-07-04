import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type Movie from "../domain/Movie";
import { LIST_MOVIES_ALL } from "./QueryKeys";

import { movieRepository } from "../infrastructure";

const useListMoviesAll = (): UseQueryResult<Movie[], Error> => {
  const response = useQuery({
    queryKey: [LIST_MOVIES_ALL],
    queryFn: async () => await movieRepository.MoviesListAll(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return response;
};

export default useListMoviesAll;
