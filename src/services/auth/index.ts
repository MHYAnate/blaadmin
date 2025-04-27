// "use client";

// import { routes } from "../api-routes";
// import httpService from "../httpService";
// import { ErrorHandler } from "../errorHandler";
// import useMutateItem from "../useMutateItem";
// import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

// interface HandleSuccess {
//   (resData: any): void;
// }

// interface ErrorResponse {
//   response?: {
//     data?: {
//       errorMessages?: string[];
//     };
//   };
//   message?: string;
// }

// interface UseLoginResponse {
//   loginData: any;
//   loginDataError: string;
//   loginIsLoading: boolean;
//   loginPayload: (requestPayload: any) => Promise<void>;
// }

// interface UseForgotPasswordResponse {
//   forgotPasswordData: any;
//   forgotPasswordDataError: string;
//   forgotPasswordIsLoading: boolean;
//   forgotPasswordPayload: (requestPayload: any) => Promise<void>;
// }

// interface UseResetPasswordResponse {
//   resetPasswordData: any;
//   resetPasswordDataError: string;
//   resetPasswordIsLoading: boolean;
//   resetPasswordPayload: (requestPayload: any) => Promise<void>;
// }

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

// export const useForgotPassword = (
//   handleSuccess: HandleSuccess
// ): UseForgotPasswordResponse => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: (payload: any) =>
//       httpService.postDataWithoutToken(payload, routes.forgotPassword()),
//     queryKeys: ["forgot"],
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
//     forgotPasswordData: data,
//     forgotPasswordDataError: ErrorHandler(error) || "An error occcured!",
//     forgotPasswordIsLoading: isPending,
//     forgotPasswordPayload: async (requestPayload: any): Promise<void> => {
//       await mutateAsync(requestPayload);
//     },
//   };
// };

// export const useResetPassword = (
//   handleSuccess: HandleSuccess
// ): UseResetPasswordResponse => {
//   const { data, error, isPending, mutateAsync } = useMutateItem({
//     mutationFn: (payload: any) =>
//       httpService.postDataWithoutToken(payload, routes.resetPassword()),
//     queryKeys: ["reset"],
//     onSuccess: (requestParams: any) => {
//       const resData = requestParams?.data?.result || {};
//       handleSuccess(resData);
//     },
//     onError: (error: any) => {
//       showErrorAlert(error?.response?.data?.error || "Something went wrong!");
//     },
//   });

//   return {
//     resetPasswordData: data,
//     resetPasswordDataError: ErrorHandler(error) || "An error occured!",
//     resetPasswordIsLoading: isPending,
//     resetPasswordPayload: async (requestPayload: any): Promise<void> => {
//       await mutateAsync(requestPayload);
//     },
//   };
// };

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Storage } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const useLogin = (p0: (res: any) => void) => {
  const router = useRouter();

  const { mutate: loginPayload, isPending } = useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await axios.post<LoginResponse>(
        'https://buylocalapi-staging.up.railway.app/api/auth/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    },

    onSuccess: (data) => {
      toast.success('Login successful');
      Storage.set('token', data.token);
      Storage.set('user', JSON.stringify(data.user));
      router.push('/admin');
    },

    onError: (err: any) => {
      const message = err?.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });

  return {
    loginPayload,
    loginIsLoading: isPending,
  };
};

 interface HandleSuccess {
    (resData: any): void;
  }

  import { routes } from "../api-routes";
import httpService from "../httpService";
import { ErrorHandler } from "../errorHandler";
import useMutateItem from "../useMutateItem";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
  
  interface ErrorResponse {
    response?: {
      data?: {
        errorMessages?: string[];
      };
    };
    message?: string;
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