"use client"
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetCustomers = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchCustomers"],
    queryFn: (queryParams) =>
      httpService.getData(routes.customers(queryParams)),
    // enabled,
    retry: 2,
  });

  return {
    getCustomersIsLoading: isLoading,
    getCustomersData: data?.data || [],
    getCustomersError: ErrorHandler(error),
    refetchCustomers: refetch,
    setCustomersFilter: setFilter,
  };
};

export const useGetCustomerInfo = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchCustomerInfo"],
    queryFn: (id) => httpService.getData(routes.getCustomerInfo(id)),
    retry: 2,
  });

  return {
    getCustomerInfoIsLoading: isLoading,
    getCustomerInfoData: data?.data?.data || {},
    getCustomerInfoError: ErrorHandler(error),
    refetchCustomerInfo: refetch,
    setCustomerInfoFilter: setFilter,
  };
};

export const useGetCustomerOrderHistory = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchCustomerOrderHistory"],
    queryFn: (id) => httpService.getData(routes.getCustomerOrderHistory(id)),
    retry: 2,
  });

  return {
    getCustomerOrderHistoryIsLoading: isLoading,
    getCustomerOrderHistoryData: data?.data?.data || {},
    getCustomerOrderHistoryError: ErrorHandler(error),
    refetchCustomerOrderHistoryInfo: refetch,
    setCustomerOrderHistoryFilter: setFilter,
  };
};
export const useDeleteCustomer = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (customerId) => {
      const response = await apiClient.delete(`/admin/customers/${customerId}`);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['customerStats']);
      queryClient.invalidateQueries(['customer', variables]);
      
      toast.success(data.message || 'Customer deleted successfully!');
      
      if (options.onSuccess) {
        options.onSuccess(data, variables);
      }
    },
    onError: (error) => {
      console.error('Customer deletion failed:', error);
      
      let errorMessage = 'Failed to delete customer';
      const backendError = error.response?.data?.error;
      
      if (backendError) {
        errorMessage = backendError;
        
        // Add contextual info if available
        if (error.response.data.orderCount) {
          errorMessage += ` (${error.response.data.orderCount} orders)`;
        }
        if (error.response.data.transactionCount) {
          errorMessage += ` (${error.response.data.transactionCount} transactions)`;
        }
      } else if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      }
      
      toast.error(errorMessage);
      
      if (options.onError) {
        options.onError(error);
      }
    }
  });
};

// export const useDeleteCustomer = (onSuccess) => {
//   const queryClient = useQueryClient();
  
//   const deleteCustomerMutation = useMutation({
//     mutationFn: async (customerId) => {
//       // Ensure ID is stringified if it's a number
//       const idToSend = typeof customerId === 'number' 
//         ? customerId.toString()
//         : customerId;

//       const response = await httpService.deleteData(
//         `admin/customers/${idToSend}`
//       );
//       return response.data;
//     },
//     onSuccess: (data, variables) => {
//       // Invalidate relevant queries
//       queryClient.invalidateQueries(['customers']);
//       queryClient.invalidateQueries(['customerStats']);
      
//       toast.success(data.message || 'Customer deleted successfully!');
      
//       if (onSuccess) {
//         onSuccess(data, variables);
//       }
//     },
//     onError: (error) => {
//       console.error('Customer deletion failed:', error);
      
//       let errorMessage = 'Failed to delete customer';
      
//       // Handle specific backend errors
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
        
//         // Add contextual info if available
//         if (error.response.data.orderCount) {
//           errorMessage += ` (${error.response.data.orderCount} orders exist)`;
//         }
//         if (error.response.data.transactionCount) {
//           errorMessage += ` (${error.response.data.transactionCount} transactions exist)`;
//         }
//       }
      
//       toast.error(errorMessage);
//     }
//   });

//   return {
//     deleteCustomer: deleteCustomerMutation.mutate,
//     isLoading: deleteCustomerMutation.isLoading,
//     error: deleteCustomerMutation.error,
//     data: deleteCustomerMutation.data
//   };
// };
// export const useDeleteCustomer = ({ onSuccess }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const deleteCustomer = async (customerId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await httpService.deleteData(
//         `admin/customers/${customerId}`
//       );
      
//       if (onSuccess) {
//         onSuccess();
//       }
      
//       toast.success('Customer deleted successfully!');
//       return response.data;
//     } catch (error) {
//       let errorMessage = 'Failed to delete customer';
      
//       // Handle specific backend errors
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
        
//         // Add contextual info if available
//         if (error.response.data.orderCount) {
//           errorMessage += ` (${error.response.data.orderCount} orders exist)`;
//         }
//         if (error.response.data.transactionCount) {
//           errorMessage += ` (${error.response.data.transactionCount} transactions exist)`;
//         }
//       }
      
//       toast.error(errorMessage);
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { deleteCustomer, isLoading, error };
// };

// export const useSuspendUser = (handleSuccess) => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: ({ email }) =>
//       httpService.postData({}, routes.suspendUser(email)),
//     onSuccess: (requestParams) => {
//       const resData = requestParams?.data?.result || {};
//       console.log(resData);
//       handleSuccess(resData);
//       showSuccessAlert(resData);
//     },
//     onError: (error) => {
//       showErrorAlert(error?.response?.data?.errorMessages[0]);
//     },
//   });

//   return {
//     suspendUserData: data,
//     suspendUserDataError: ErrorHandler(error),
//     suspendUserIsLoading: isPending,
//     suspendUserPayload: (requestPayload) => mutateAsync(requestPayload),
//   };
// };

// export const useUnsuspendUser = (handleSuccess) => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: ({ email }) =>
//       httpService.postData({}, routes.unSuspendUser(email)),
//     onSuccess: (requestParams) => {
//       const resData = requestParams?.data?.result || {};
//       console.log(resData);
//       handleSuccess(resData);
//       showSuccessAlert(resData);
//     },
//     onError: (error) => {
//       showErrorAlert(error?.response?.data?.errorMessages[0]);
//     },
//   });

//   return {
//     unSuspendUserData: data,
//     unSuspendUserDataError: ErrorHandler(error),
//     unSuspendUserIsLoading: isPending,
//     unSuspendUserPayload: (requestPayload) => mutateAsync(requestPayload),
//   };
// };

// export const useDeleteUser = (handleSuccess) => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: (email) => httpService.deleteData(routes.deleteUser(email)),
//     onSuccess: (requestParams) => {
//       const resData = requestParams?.data?.result || {};
//       handleSuccess(resData);
//       showSuccessAlert(resData);
//     },
//     onError: (error) => {
//       showErrorAlert(error?.response?.data?.errorMessages[0]);
//     },
//   });

//   return {
//     deleteUserData: data,
//     deleteUserDataError: ErrorHandler(error),
//     deleteUserIsLoading: isPending,
//     deleteUserPayload: (requestPayload) => mutateAsync(requestPayload),
//   };
// };

