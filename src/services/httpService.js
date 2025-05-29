import axios from "axios";
import { useRequest } from "@/hooks/use-request";
import dotenv from 'dotenv';
dotenv.config();

class HttpService {
  constructor() {
    this.request = useRequest();
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  // constructor() {
  //   this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  //   this.instance = axios.create({
  //     baseURL: this.baseUrl,
  //     timeout: 30000, // 30s timeout
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
  getServiceUrl(url) {
    return `${this.baseUrl}${url}`;
    // return `${this.baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  }

  // httpService.js
// getServiceUrl(url) {
//   // Ensure base URL ends with a slash
//   const base = this.baseUrl.endsWith('/') 
//     ? this.baseUrl 
//     : this.baseUrl + '/';
  
//   // Remove leading slash from endpoint if present
//   const endpoint = url.startsWith('/') 
//     ? url.substring(1) 
//     : url;
    
//   return base + endpoint;
// }

getServiceUrl(url) {
  // Ensure base URL ends with a slash
  const base = this.baseUrl.endsWith('/') 
    ? this.baseUrl 
    : this.baseUrl + '/';
  
  // Remove leading slash from endpoint
  const endpoint = url.startsWith('/') 
    ? url.substring(1) 
    : url;
  
  return base + endpoint;
}
  // async postData(payload, url) {
  //   return this.request.post(this.getServiceUrl(url), payload);
  // }

  // async postDataWithoutToken(payload, url) {
  //   return axios.post(this.getServiceUrl(url), payload);
  // }

  // async getData(url) {
  //   return this.request.get(this.getServiceUrl(url));
  // }

  // async getDataWithoutToken(url) {
  //   return axios.get(this.getServiceUrl(service, url));
  // }

  async postData(payload, url) {
    return this.instance.post(url, payload);
  }

  // async postDataWithoutToken(payload, url) {
  //   return axios.post(`${this.baseUrl}${url}`, payload, {
  //     timeout: 30000
  //   });
  // }

  async postDataWithoutToken(payload, url) {
    try {
      const fullUrl = this.getServiceUrl(url);
      console.log("Request URL:", fullUrl); // For debugging
      return await axios.post(fullUrl, payload, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  // async postData(payload, url) {
  //   return this.request.post(this.getServiceUrl(url), payload);
  // }
  // async postDataWithoutToken(payload, url) {
  //   return axios.post(this.getServiceUrl(url), payload);
  // }
  async getData(url) {
    return this.request.get(this.getServiceUrl(url));
  }
  async getDataWithoutToken(url) {
    return axios.get(this.getServiceUrl(url));  // Fixed parameter usage
  }

  async putData(payload, url) {
    return this.request.put(this.getServiceUrl(url), payload);
  }

  async putDataWithoutToken(payload, url) {
    return axios.put(this.getServiceUrl(url), payload);
  }

  async patchData(payload, url) {
    return this.request.patch(this.getServiceUrl(url), payload);
  }

  async patchDataWithoutToken(payload, url) {
    return axios.patch(this.getServiceUrl(url), payload);
  }

  async deleteData(url) {
    return this.request.delete(this.getServiceUrl(url));
  }
}

export default new HttpService();
