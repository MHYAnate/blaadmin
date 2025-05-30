// "use client";

import { Storage } from "@/lib/utils";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { getCookie } from "cookies-next";

export type AxiosConfig = Partial<AxiosRequestConfig> & {
  url?: string;
  method: string;
  data?: any;
  params?: Record<string, unknown>;
  error?: (error?: any) => void;
  success?: (data?: any) => void;
};

export function useRequest(): AxiosInstance {
  const token = getCookie("token");

  const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 25000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token as string}`,
      }),
    },
  });

  request.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = await Storage.get("token-refresh");

      if (
        error.response &&
        error.response.status === 401 &&
        refreshToken &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        originalRequest._isRetry = true;

        try {
          const refreshedResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
            { refresh: await Storage.get("token-refresh") },
            {
              headers: {
                Authorization: `Bearer ${await Storage.get("token-refresh")}`,
              },
            }
          );

          await Storage.set("token", refreshedResponse.data?.access);
          await Storage.set("token-refresh", refreshedResponse.data?.refresh);

          return await request.request(originalRequest);
        } catch (err) {
          console.error(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return request;
}