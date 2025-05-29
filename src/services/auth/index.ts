"use client";

import { routes } from "../api-routes";
import httpService from "../httpService";
import { ErrorHandler } from "../errorHandler";
import useMutateItem from "../useMutateItem";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

interface HandleSuccess {
  (resData: any): void;
}

interface ErrorResponse {
  response?: {
    data?: {
      errorMessages?: string[];
    };
  };
  message?: string;
}

interface UseLoginResponse {
  loginData: any;
  loginDataError:any;
  loginIsLoading: boolean;
  loginPayload: (requestPayload: any) => Promise<void>;
}

interface UseForgotPasswordResponse {
  forgotPasswordData: any;
  forgotPasswordDataError: string;
  forgotPasswordIsLoading: boolean;
  forgotPasswordPayload: (requestPayload: any) => Promise<void>;
}

interface UseResetPasswordResponse {
  resetPasswordData: any;
  resetPasswordDataError: string;
  resetPasswordIsLoading: boolean;
  resetPasswordPayload: (requestPayload: any) => Promise<void>;
}

// export const useLogin = (handleSuccess: HandleSuccess): UseLoginResponse => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: (payload: any) =>
//       httpService.postDataWithoutToken(payload, routes.login()),
//     queryKeys: ["login"],
//     onSuccess: (requestParams: any) => {
//       const resData = requestParams?.data || {};
//       handleSuccess(resData);
//       showSuccessAlert(resData?.message);
//     },
//     onError: (error: any) => {
//       showErrorAlert(error?.response?.data?.error || "Something went wrong!");
//     },
//   });

//   return {
//     loginData: data,
//     loginDataError: ErrorHandler(error) || "An error occured",
//     loginIsLoading: isPending,
//     loginPayload: async (requestPayload: any): Promise<void> => {
//       await mutateAsync(requestPayload);
//     },
//   };
// };
// Secure token storage
export const storeTokens = (token: string, refreshToken: string) => {
  if (typeof window === "undefined") return;
  
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const useLogin = (handleSuccess: HandleSuccess): UseLoginResponse => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload: any) =>
      httpService.postDataWithoutToken(payload, routes.login()),
    queryKeys: ["login"],
    onSuccess: (response: { data: { token: any; refreshToken: any; user: any; }; }) => {
      const { token, refreshToken, user } = response.data;
      
      // Store tokens
      storeTokens(token, refreshToken);
      
      // Store user data
      localStorage.setItem("user", JSON.stringify(user));
      
      handleSuccess(response.data);
      showSuccessAlert("Login successful!");
    },
    onError: (error: any) => {
      let errorMessage = "Login failed";
      
      if (error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showErrorAlert(errorMessage);
    },
  });

  return {
    loginData: data,
    loginDataError: error ? ErrorHandler(error) : "",
    loginIsLoading: isPending,
    loginPayload: async (requestPayload: any): Promise<void> => {
      await mutateAsync(requestPayload);
    },
  };
};

export const useForgotPassword = (
  handleSuccess: HandleSuccess
): UseForgotPasswordResponse => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload: any) =>
      httpService.postDataWithoutToken(payload, routes.forgotPassword()),
    queryKeys: ["forgot"],
    onSuccess: (requestParams: any) => {
      const resData = requestParams?.data || {};
      handleSuccess(resData);
      showSuccessAlert(resData?.message);
    },
    onError: (error: any) => {
      showErrorAlert(error?.response?.data?.error || "Something went wrong!");
    },
  });

  return {
    forgotPasswordData: data,
    forgotPasswordDataError: ErrorHandler(error) || "An error occcured!",
    forgotPasswordIsLoading: isPending,
    forgotPasswordPayload: async (requestPayload: any): Promise<void> => {
      await mutateAsync(requestPayload);
    },
  };
};

export const useResetPassword = (
  handleSuccess: HandleSuccess
): UseResetPasswordResponse => {
  const { data, error, isPending, mutateAsync } = useMutateItem({
    mutationFn: (payload: any) =>
      httpService.postDataWithoutToken(payload, routes.resetPassword()),
    queryKeys: ["reset"],
    onSuccess: (requestParams: any) => {
      const resData = requestParams?.data?.result || {};
      handleSuccess(resData);
    },
    onError: (error: any) => {
      showErrorAlert(error?.response?.data?.error || "Something went wrong!");
    },
  });

  return {
    resetPasswordData: data,
    resetPasswordDataError: ErrorHandler(error) || "An error occured!",
    resetPasswordIsLoading: isPending,
    resetPasswordPayload: async (requestPayload: any): Promise<void> => {
      await mutateAsync(requestPayload);
    },
  };
};
