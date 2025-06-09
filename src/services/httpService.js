import axios from "axios";
import { useRequest } from "@/hooks/use-request";
import dotenv from 'dotenv';
dotenv.config();

// class HttpService {
//   constructor() {
//     this.request = useRequest();
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   }

//   getServiceUrl(url) {
//     return `${this.baseUrl}${url}`;
//   }

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
//     return axios.get(this.getServiceUrl(url));
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

// class HttpService {
//   constructor() {
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     this.axios = axios.create();
    
//     // Add token to all authenticated requests
//     this.axios.interceptors.request.use(config => {
//       const token = this.getToken();
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     });
    
//     // Handle token expiration (401/403 errors)
//     this.axios.interceptors.response.use(
//       response => response,
//       error => {
//         if (error.response?.status === 401 || error.response?.status === 403) {
//           this.handleTokenExpiration();
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   getServiceUrl(url) {
//     return `${this.baseUrl}${url}`;
//   }

//   getToken() {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token");
//     }
//     return null;
//   }

//   setToken(token) {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("token", token);
//     }
//   }

//   clearToken() {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // Redirect to login
//     }
//   }

//   handleTokenExpiration() {
//     this.clearToken();
//   }

//   // Authenticated methods
//   async postData(payload, url) {
//     return this.axios.post(this.getServiceUrl(url), payload);
//   }

//   async getData(url) {
//     return this.axios.get(this.getServiceUrl(url));
//   }

//   async putData(payload, url) {
//     return this.axios.put(this.getServiceUrl(url), payload);
//   }

//   async patchData(payload, url) {
//     return this.axios.patch(this.getServiceUrl(url), payload);
//   }

//   async deleteData(url) {
//     return this.axios.delete(this.getServiceUrl(url));
//   }

//   // Unauthenticated methods
//   async postDataWithoutToken(payload, url) {
//     return axios.post(this.getServiceUrl(url), payload);
//   }

//   async getDataWithoutToken(url) {
//     return axios.get(this.getServiceUrl(url));
//   }

//   async putDataWithoutToken(payload, url) {
//     return axios.put(this.getServiceUrl(url), payload);
//   }

//   async patchDataWithoutToken(payload, url) {
//     return axios.patch(this.getServiceUrl(url), payload);
//   }

//   async refreshToken() {
//     try {
//       const response = await axios.post(`${this.baseUrl}/refresh-token`, {
//         refreshToken: this.getRefreshToken()
//       });
//       this.setToken(response.data.token);
//       return response.data.token;
//     } catch (error) {
//       this.clearToken();
//       throw error;
//     }
//   }
  
//   getRefreshToken() {
//     // Implement based on your auth system
//     return localStorage.getItem("refreshToken");
//   }

//   // Update response interceptor to handle refresh
//   this.axios.interceptors.response.use(
//     response => response,
//     async error => {
//       const originalRequest = error.config;
      
//       if ((error.response?.status === 401 || error.response?.status === 403) && 
//           !originalRequest._retry) {
//         originalRequest._retry = true;
        
//         try {
//           const newToken = await this.refreshToken();
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return this.axios(originalRequest);
//         } catch (refreshError) {
//           this.clearToken();
//           return Promise.reject(refreshError);
//         }
//       }
      
//       return Promise.reject(error);
//     }
//   );
  
// }

// export default new HttpService();

// lib/httpService.js
// import axios from "axios";

// class HttpService {
//   constructor() {
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
//     this.axios = axios.create();
//     this.refreshPromise = null;
    
//     // Request interceptor
//     this.axios.interceptors.request.use((config) => {
//       const token = this.getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });
    
//     // Response interceptor
//     this.axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
        
//         if (
//           (error.response?.status === 401 || error.response?.status === 403) && 
//           !originalRequest._retry
//         ) {
//           originalRequest._retry = true;
          
//           try {
//             const newToken = await this.getRefreshedToken();
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             return this.axios(originalRequest);
//           } catch (refreshError) {
//             this.handleTokenExpiration();
//             return Promise.reject(refreshError);
//           }
//         }
        
//         return Promise.reject(error);
//       }
//     );
//   }

//   getServiceUrl(url) {
//     return `${this.baseUrl}${url}`;
//   }

//   getToken() {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token");
//     }
//     return null;
//   }

//   setToken(token) {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("token", token);
//     }
//   }

//   clearToken() {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//     }
//   }

//   handleTokenExpiration() {
//     this.clearToken();
//     if (typeof window !== "undefined") {
//       window.location.href = "/login";
//     }
//   }

//   async getRefreshedToken() {
//     if (!this.refreshPromise) {
//       this.refreshPromise = this.refreshToken().finally(() => {
//         this.refreshPromise = null;
//       });
//     }
//     return this.refreshPromise;
//   }

//   async refreshToken() {
//     try {
//       const refreshToken = this.getRefreshToken();
//       if (!refreshToken) throw new Error("No refresh token available");
      
//       const response = await axios.post(
//         `${this.baseUrl}/auth/refresh`,
//         { refreshToken }
//       );
      
//       const newToken = response.data.token;
//       this.setToken(newToken);
      
//       if (response.data.refreshToken) {
//         localStorage.setItem("refreshToken", response.data.refreshToken);
//       }
      
//       return newToken;
//     } catch (error) {
//       this.handleTokenExpiration();
//       throw error;
//     }
//   }
  
//   getRefreshToken() {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("refreshToken");
//     }
//     return null;
//   }

//   // Authenticated methods
//   async postData(payload, url) {
//     return this.axios.post(this.getServiceUrl(url), payload);
//   }

//   async getData(url) {
//     return this.axios.get(this.getServiceUrl(url));
//   }

//   async putData(payload, url) {
//     return this.axios.put(this.getServiceUrl(url), payload);
//   }

//   async patchData(payload, url) {
//     return this.axios.patch(this.getServiceUrl(url), payload);
//   }

//   async deleteData(url) {
//     return this.axios.delete(this.getServiceUrl(url));
//   }

//   // Unauthenticated methods
//   async postDataWithoutToken(payload, url) {
//     return axios.post(this.getServiceUrl(url), payload);
//   }

//   async getDataWithoutToken(url) {
//     return axios.get(this.getServiceUrl(url));
//   }

//   async putDataWithoutToken(payload, url) {
//     return axios.put(this.getServiceUrl(url), payload);
//   }

//   async patchDataWithoutToken(payload, url) {
//     return axios.patch(this.getServiceUrl(url), payload);
//   }
// }

// export default new HttpService();

class HttpService {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    this.axios = axios.create();

    // Request Interceptor: Adds Authorization header with token
    this.axios.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response Interceptor: Handles 401/403 errors by redirecting to login
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If the error is 401 or 403, handle token expiration directly
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.handleTokenExpiration(); // Clear tokens and redirect to login
          return Promise.reject(error); // Propagate the error
        }

        return Promise.reject(error); // For other errors, just reject the promise
      }
    );
  }

  /**
   * Constructs the full service URL.
   * @param {string} url The API endpoint path.
   * @returns {string} The complete URL.
   */
  getServiceUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  /**
   * Retrieves the access token from localStorage.
   * @returns {string|null} The access token or null if not found.
   */
  getToken() {
    if (typeof window!== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  /**
   * Stores the access token in localStorage.
   * @param {string} token The access token to store.
   */
  setToken(token) {
    if (typeof window!== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  /**
   * Clears the access token from localStorage.
   */
  clearToken() {
    if (typeof window!== "undefined") {
      localStorage.removeItem("token");
    }
  }

  /**
   * Handles token expiration by clearing tokens and redirecting to the login page.
   */
  handleTokenExpiration() {
    this.clearToken();
    if (typeof window!== "undefined") {
      window.location.href = "/login"; // Redirect to login page
    }
  }

  // Authenticated HTTP methods (using the Axios instance with interceptors)
  /**
   * Sends a POST request with authentication.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async postData(payload, url) {
    return this.axios.post(this.getServiceUrl(url), payload);
  }

  /**
   * Sends a GET request with authentication.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async getData(url) {
    return this.axios.get(this.getServiceUrl(url));
  }

  /**
   * Sends a PUT request with authentication.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async putData(payload, url) {
    return this.axios.put(this.getServiceUrl(url), payload);
  }

  /**
   * Sends a PATCH request with authentication.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async patchData(payload, url) {
    return this.axios.patch(this.getServiceUrl(url), payload);
  }

  /**
   * Sends a DELETE request with authentication.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async deleteData(url) {
    return this.axios.delete(this.getServiceUrl(url));
  }

  // Unauthenticated HTTP methods (using raw Axios, bypassing interceptors)
  /**
   * Sends an unauthenticated POST request.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async postDataWithoutToken(payload, url) {
    return axios.post(this.getServiceUrl(url), payload);
  }

  /**
   * Sends an unauthenticated GET request.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async getDataWithoutToken(url) {
    return axios.get(this.getServiceUrl(url));
  }

  /**
   * Sends an unauthenticated PUT request.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async putDataWithoutToken(payload, url) {
    return axios.put(this.getServiceUrl(url), payload);
  }

  /**
   * Sends an unauthenticated PATCH request.
   * @param {object} payload The request body.
   * @param {string} url The API endpoint path.
   * @returns {Promise<any>} The response data.
   */
  async patchDataWithoutToken(payload, url) {
    return axios.patch(this.getServiceUrl(url), payload);
  }
}

// Export an instance of HttpService for use throughout the application
const httpService = new HttpService();
export default httpService;