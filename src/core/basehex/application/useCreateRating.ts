import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { LIST_MOVIES_ALL, LIST_MOVIES_RECOMEND } from "./QueryKeys";
import { Rating } from "../domain/Rating";
import RatingRequest from "../domain/RatingRequest";
import { ratingRepository } from "../infrastructure";

const useCreateRating = (): UseMutationResult<Rating, Error, RatingRequest> => {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: async (rating: RatingRequest) =>
      await ratingRepository.create(rating),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [LIST_MOVIES_ALL, LIST_MOVIES_RECOMEND],
      });
    },
  });

  return response;
};

export default useCreateRating;
