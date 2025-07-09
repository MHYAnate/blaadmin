"use client"
import { showErrorAlert } from "@/lib/utils";
import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";
import useMutateItem from "../useMutateItem";
import { useState } from "react";
import apiClient from "./apiclient";

export const useGetManufacturers = () => {
  const { isLoading, error, data, refetch, setFilter } = useFetchItem({
    queryKey: ["fetchManufacturers"],
    queryFn: (queryParams) =>
      httpService.getData(routes.manufacturers(queryParams)),
    // enabled,
    retry: 2,
  });

  return {
    getManufacturersIsLoading: isLoading,
    getManufacturersData: data?.data || [],
    getManufacturersError: ErrorHandler(error),
    refetchManufacturers: refetch,
    setManufacturersFilter: setFilter,
  };
};

export const useGetManufacturerInfo = () => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchManufacturerInfo"],
    queryFn: (id) => httpService.getData(routes.getManufacturerInfo(id)),
    retry: 2,
  });

  return {
    getManufacturerInfoIsLoading: isLoading,
    getManufacturerInfoData: data?.data?.data || {},
    getManufacturerInfoError: ErrorHandler(error),
    refetchManufacturerInfo: refetch,
    setManufacturerInfoFilter: setFilter,
  };
};

export const useGetManufacturerProducts = () => {
  const { isLoading, error, data, refetch, setFilter } = useFetchItem({
    queryKey: ["fetchProducts"],
    queryFn: ({ manufacturerId, data }) =>
      httpService.getData(
        routes.manufacturerProducts({ manufacturerId, data })
      ),
    // enabled,
    retry: 2,
  });

  return {
    getManufacturerProductsIsLoading: isLoading,
    getManufacturerProductsData: data?.data || [],
    getManufacturerProductsError: ErrorHandler(error),
    refetchManufacturerProducts: refetch,
    setManufacturerProductsFilter: setFilter,
  };
};

export const useDeleteManufacturerProduct = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (id) =>
      httpService.deleteData(routes.deleteManufacturerProduct(id)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      console.log(requestParams);
      handleSuccess(resData);
        showSuccessAlert(resData);
    },
    onError: (error) => {
      showErrorAlert("An error occured");
    },
  });

  return {
    deleteProductData: data,
    deleteProductDataError: ErrorHandler(error),
    deleteProductIsLoading: isPending,
    deleteProductPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};

export const useUpdateManufacturerStatus = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: ({ payload, id }) =>
      httpService.patchData(payload, routes.updateManufacturerStatus(id)),
    onSuccess: (requestParams) => {
      const resData = requestParams?.data?.result || {};
      console.log(requestParams);
      handleSuccess(resData);
      //   showSuccessAlert(resData);
    },
    onError: (error) => {
      showErrorAlert("An error occured");
    },
  });

;

  return {
    updateManufacturerStatusData: data,
    updateManufacturerStatusError: ErrorHandler(error),
    updateManufacturerStatusIsLoading: isPending,
    updateManufacturerStatusPayload: ({ payload, id }) =>
      mutateAsync({ payload, id }),
  };
};
import { useMutation } from "@tanstack/react-query";
// export const useDeleteManufacturer = (options) => {
//   const mutation = useMutation({
//     mutationFn: (id) => {
//       return httpService.delete(routes.deleteManufacturer(id));
//     },
//     ...options
//   });

//   return {
//     deleteManufacturer: mutation.mutate,
//     isLoading: mutation.isLoading,
//     isError: mutation.isError,
//     error: mutation.error,
//     data: mutation.data,
//   };
// };

// export const useDeleteManufacturer = (options = {}) => {
//   const mutation = useMutation({
//     mutationFn: (id) => {
//       return httpService.delete(routes.deleteManufacturer(id));
//     },
//     ...options
//   });

//   return {
//     deleteManufacturer: mutation.mutate,
//     isLoading: mutation.isLoading,
//     isError: mutation.isError,
//     error: mutation.error,
//     data: mutation.data?.data,
//   };
// };

// export const useDeleteManufacturer = (onSuccess) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const deleteManufacturer = async (manufacturerId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await httpService.deleteData(
//         routes.deleteManufacturer(manufacturerId)
//       );
//       setData(response.data);
//       if (onSuccess) onSuccess(response.data);
//       return response.data;
//     } catch (error) {
//       setError(error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     deleteManufacturer,
//     isLoading,
//     error,
//     data
//   };
// };

// export const useDeleteManufacturer = (onSuccess) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const deleteManufacturer = async (manufacturerId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Validate manufacturer ID
//       if (!manufacturerId || isNaN(manufacturerId)) {
//         throw new Error("Invalid manufacturer ID");
//       }

//       const response = await httpService.delete(
//         routes.deleteManufacturer(manufacturerId)
//       );
      
//       if (!response.data.success) {
//         throw new Error(response.data.error || "Deletion failed");
//       }

//       setData(response.data);
//       if (onSuccess) onSuccess(response.data);
//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 
//                           error.message || 
//                           "Failed to delete manufacturer";
      
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     deleteManufacturer,
//     isLoading,
//     error,
//     data
//   };
// };

import { toast } from "sonner";

export const useDeleteManufacturer = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteManufacturer = async (manufacturerId) => {
    // Ensure ID is stringified if it's a number
    const idToSend = typeof manufacturerId === 'number' 
      ? manufacturerId.toString()
      : manufacturerId;

    try {
      const response = await httpService.deleteData(
        `admin/manufacturers/${manufacturerId}`
      );
      // ... rest of success handling
      console.log(manufacturerId, "manufacId")
    } catch (error) {
      // Enhanced error parsing
      let errorMessage = 'Failed to delete manufacturer';
      toast.error(errorMessage);
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data.error || errorMessage;
        if (error.response.data.receivedValue) {
          errorMessage += ` (Received: ${error.response.data.receivedValue})`;
        }
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteManufacturer, isLoading, error };
};

// export function useCreateManufacturer({ onSuccess } = {}) {
//   // State to track if the API request is in progress
//   const [isLoading, setIsLoading] = useState(false);
//   // State to store any error messages from the API
//   const [error, setError] = useState(null);
//   // State to store the successfully created manufacturer data
//   const [data, setData] = useState(null);

//   /**
//    * Sends the manufacturer creation payload to the backend API.
//    * This function assumes that the logo has already been uploaded and a URL is provided.
//    *
//    * @param {object} payload - The data for the new manufacturer.
//    * @returns {Promise<object|undefined>} The created manufacturer data from the server, or undefined on failure.
//    */
//   const createManufacturer = async (payload) => {
//     // Map form field names to the names expected by the backend API
//     const apiPayload = {
//       name: payload.manufacturername,
//       country: payload.country,
//       logo: payload.image, // The hook expects `payload.image` to be the URL of the logo
//       email: payload.email,
//       phone: payload.phonenumber,
//       contactPerson: payload.contactperson,
//     };

//     // Basic client-side validation to catch errors early
//     if (!apiPayload.name || !apiPayload.country || !apiPayload.logo || !apiPayload.email || !apiPayload.contactPerson) {
//       setError('Missing required fields. Please ensure all fields are filled correctly.');
//       return;
//     }

//     // Reset state before making the new request
//     setIsLoading(true);
//     setError(null);
//     setData(null);

//     try {
//       // Define the API endpoint for creating a manufacturer
//       const endpoint = 'admin/manufacturers'; 
      
//       // Make the POST request using the httpService
//       const response = await httpService.postData(apiPayload, endpoint);

//       // Check the response for a success flag
//       if (!response.success) {
//         // Throw an error with the message from the backend if available
//         throw new Error(response.error || 'An unknown error occurred.');
//       }

//       // Store the returned data
//       setData(response.data);
//       // Execute the onSuccess callback if it was provided
//       if (onSuccess) {
//         onSuccess(response.data);
//       }

//       return response.data;

//     } catch (err) {
//       // Catch any errors (from network or thrown above) and store the message
//       setError(err.message || 'An unexpected error occurred.');
//       // Re-throw the error if you need to handle it further up the component tree
//       throw err;
//     } finally {
//       // Ensure loading state is turned off regardless of success or failure
//       setIsLoading(false);
//     }
//   };

//   // Return the handler function and state variables for the component to use
//   return { createManufacturer, isLoading, error, data };
// }

// export const useCreateManufacturer = (handleSuccess) => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     // The mutation function now posts FormData.
//     // Ensure your httpService.postData can handle FormData
//     // by not setting the 'Content-Type' header, allowing the browser to set it automatically.
//     mutationFn: (payload) =>
//       httpService.postData(payload, routes.createManufacturer()),
//     onSuccess: (response) => {
//       const resData = response?.data || {};
//       if (handleSuccess) {
//         handleSuccess(resData);
//       }
//     },
//     onError: (error) => {
//       // Use a more specific error message from the backend if available
//       const errorMessage = error?.response?.data?.error || "An error occurred while creating the manufacturer.";
//       showErrorAlert(errorMessage);
//     },
//   });

//   return {
//     createManufacturerData: data,
//     createManufacturerError: ErrorHandler(error),
//     createManufacturerIsLoading: isPending,
//     // This function will be called with the FormData object from the form.
//     createManufacturerPayload: (requestPayload) => mutateAsync(requestPayload),
//   };
// };

export const useCreateManufacturer = (handleSuccess) => {
  const { mutateAsync, isPending, error, data } = useMutation({
    /**
     * The mutation function now uses the apiClient.
     * The interceptor will automatically add the Authorization header.
     * The browser will correctly set the 'Content-Type' for FormData.
     */
    mutationFn: (payload) =>
      apiClient.post(routes.createManufacturer(), payload),

    onSuccess: (response) => {
      const resData = response?.data || {};
      if (handleSuccess) {
        handleSuccess(resData);
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        "An error occurred while creating the manufacturer.";
      toast.error(errorMessage);
    },
  });

  return {
    createManufacturerPayload: (requestPayload) => mutateAsync(requestPayload),
    createManufacturerIsLoading: isPending,
    createManufacturerError: error, // Consider using an ErrorHandler here
    createManufacturerData: data,
  };
};

export const useCreateManufacturer1 = (handleSuccess) => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    /**
     * The mutation function posts FormData.
     * CRITICAL: Ensure your httpService.postData does NOT set a 'Content-Type' header
     * when the payload is FormData. The browser MUST set this header automatically
     * to include the multipart boundary. If you manually set 'Content-Type': 'application/json',
     * the file upload will fail and the backend will not see req.file.
     */
    mutationFn: (payload) =>
      httpService.postData(payload, routes.createManufacturer()),
    onSuccess: (response) => {
      const resData = response?.data || {};
      if (handleSuccess) {
        handleSuccess(resData);
      }
    },
    onError: (error) => {
      // Use a more specific error message from the backend if available
      const errorMessage = error?.response?.data?.error || "An error occurred while creating the manufacturer.";
      showErrorAlert(errorMessage);
    },
  });

  return {
    createManufacturerData: data,
    createManufacturerError: ErrorHandler(error),
    createManufacturerIsLoading: isPending,
    // This function will be called with the FormData object from the form.
    createManufacturerPayload: (requestPayload) => mutateAsync(requestPayload),
  };
};
