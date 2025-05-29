// import axios from "axios";
// import { useRequest } from "@/hooks/use-request";
// import dotenv from 'dotenv';
// dotenv.config();

// class HttpService {
//   constructor() {
//     this.request = useRequest();
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   }
//   // constructor() {
//   //   this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   //   this.instance = axios.create({
//   //     baseURL: this.baseUrl,
//   //     timeout: 30000, // 30s timeout
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     }
//   //   });
//   // }
//   getServiceUrl(url) {
//     return `${this.baseUrl}${url}`;
//     // return `${this.baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
//   }

//   // httpService.js
// // getServiceUrl(url) {
// //   // Ensure base URL ends with a slash
// //   const base = this.baseUrl.endsWith('/') 
// //     ? this.baseUrl 
// //     : this.baseUrl + '/';
  
// //   // Remove leading slash from endpoint if present
// //   const endpoint = url.startsWith('/') 
// //     ? url.substring(1) 
// //     : url;
    
// //   return base + endpoint;
// // }

// // getServiceUrl(url) {
// //   // Ensure base URL ends with a slash
// //   const base = this.baseUrl.endsWith('/') 
// //     ? this.baseUrl 
// //     : this.baseUrl + '/';
  
// //   // Remove leading slash from endpoint
// //   const endpoint = url.startsWith('/') 
// //     ? url.substring(1) 
// //     : url;
  
// //   return base + endpoint;
// // }
//   // async postData(payload, url) {
//   //   return this.request.post(this.getServiceUrl(url), payload);
//   // }

//   // async postDataWithoutToken(payload, url) {
//   //   return axios.post(this.getServiceUrl(url), payload);
//   // }

//   // async getData(url) {
//   //   return this.request.get(this.getServiceUrl(url));
//   // }

//   // async getDataWithoutToken(url) {
//   //   return axios.get(this.getServiceUrl(service, url));
//   // }

//   // async postData(payload, url) {
//   //   return this.instance.post(url, payload);
//   // }

//   // async postDataWithoutToken(payload, url) {
//   //   return axios.post(`${this.baseUrl}${url}`, payload, {
//   //     timeout: 30000
//   //   });
//   // }

//   // async postDataWithoutToken(payload, url) {
//   //   try {
//   //     const fullUrl = this.getServiceUrl(url);
//   //     console.log("Request URL:", fullUrl); // For debugging
//   //     return await axios.post(fullUrl, payload, {
//   //       timeout: 30000,
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       }
//   //     });
//   //   } catch (error) {
//   //     console.error("Request failed:", error);
//   //     throw error;
//   //   }
//   // }

//   async postData(payload, url) {
//     return this.request.post(this.getServiceUrl(url), payload);
//   }
//   async postDataWithoutToken(payload, url) {
//     return axios.post(this.getServiceUrl(url), payload);
//   }
//   async getData(url) {
//     return this.request.get(this.getServiceUrl(url));
//   }
//   async getDataWithoutToken(url) {
//     return axios.get(this.getServiceUrl(url));  // Fixed parameter usage
//   }

//   async putData(payload, url) {
//     return this.request.put(this.getServiceUrl(url), payload);
//   }

//   async putDataWithoutToken(payload, url) {
//     return axios.put(this.getServiceUrl(url), payload);
//   }

//   async patchData(payload, url) {
//     return this.request.patch(this.getServiceUrl(url), payload);
//   }

//   async patchDataWithoutToken(payload, url) {
//     return axios.patch(this.getServiceUrl(url), payload);
//   }

//   async deleteData(url) {
//     return this.request.delete(this.getServiceUrl(url));
//   }
// }

// export default new HttpService();

import axios from "axios";
// import { getAccessToken, getRefreshToken, storeTokens } from "@/lib/auth";
import dotenv from 'dotenv';
dotenv.config();

const storeTokens = (token, refreshToken) => {
  if (typeof window === "undefined") return;
  
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
};


class HttpService {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Create authenticated instance
    this.authAxios = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });
    
    // Add request interceptor for auth
    this.authAxios.interceptors.request.use(config => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    
    // Add response interceptor for token refresh
    this.authAxios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // If 401 error and not a refresh request
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) throw new Error("No refresh token");
            
            // Refresh tokens
            const { data } = await axios.post(
              `${this.baseUrl}/api/auth/refresh`,
              { refreshToken }
            );
            
            // Store new tokens
            storeTokens(data.token, data.refreshToken);
            
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            return this.authAxios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // Redirect to login
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  getServiceUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  // Authenticated methods
  async getData(url) {
    return this.authAxios.get(this.getServiceUrl(url));
  }

  async postData(payload, url) {
    return this.authAxios.post(this.getServiceUrl(url), payload);
  }

  async putData(payload, url) {
    return this.authAxios.put(this.getServiceUrl(url), payload);
  }

  async patchData(payload, url) {
    return this.authAxios.patch(this.getServiceUrl(url), payload);
  }

  async deleteData(url) {
    return this.authAxios.delete(this.getServiceUrl(url));
  }

  // Unauthenticated methods
  async postDataWithoutToken(payload, url) {
    return axios.post(this.getServiceUrl(url), payload);
  }

  async getDataWithoutToken(url) {
    return axios.get(this.getServiceUrl(url));
  }

  async putDataWithoutToken(payload, url) {
    return axios.put(this.getServiceUrl(url), payload);
  }

  async patchDataWithoutToken(payload, url) {
    return axios.patch(this.getServiceUrl(url), payload);
  }
}

export default new HttpService();