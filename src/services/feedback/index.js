
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";

// Hook for fetching feedback by user
export const useGetFeedbackByUser = () => {
  const { 
    isLoading, 
    error, 
    data, 
    refetch, 
    setFilter 
  } = useFetchItem({
    queryKey: ["fetchFeedbackByUser"],
    queryFn: (userId) => httpService.getData(routes.getFeedbackByUser(userId)),
    retry: 2,
  });

  return {
    getFeedbackByUserIsLoading: isLoading,
    getFeedbackByUserData: data?.data || [],
    getFeedbackByUserError: ErrorHandler(error),
    refetchFeedbackByUser: refetch,
    setFeedbackByUserFilter: setFilter,
  };
};

// Hook for fetching all feedback
export const useGetAllFeedback = () => {
  const { 
    isLoading, 
    error, 
    data, 
    refetch, 
    setFilter 
  } = useFetchItem({
    queryKey: ["fetchAllFeedback"],
    queryFn: (filterParams) => httpService.getData(routes.getAllFeedback(filterParams)),
    retry: 2,
  });

  return {
    getAllFeedbackIsLoading: isLoading,
    getAllFeedbackData: data?.data || [],
    getAllFeedbackCount: data?.count || 0,
    getAllFeedbackError: ErrorHandler(error),
    refetchAllFeedback: refetch,
    setAllFeedbackFilter: setFilter,
  };
};