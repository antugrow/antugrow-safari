import axios, { AxiosRequestConfig } from "axios";
import { RequestHeader } from "@/types/RequestHeader";

interface CreateAxiosClientOptions {
  options?: AxiosRequestConfig;
  getAuthToken: () => Promise<string> | null;
}

export function createAxiosClient({
  options = {},
  getAuthToken,
}: CreateAxiosClientOptions) {
  const client = axios.create(options);

  // create a request interceptor to add firebase auth token to request header
  client.interceptors.request.use(
    async (config) => {
      // ensure firebase auth token header is not already set
      if (config.headers[RequestHeader.AUTHORIZATION] !== false) {
        const authToken = await getAuthToken();
        if (authToken) {
          config.headers[RequestHeader.AUTHORIZATION] = `Bearer ${authToken}`;
        }
      }

      return config;
    },
    (error) => {
      console.log("createAxiosClient:error", error);
      return Promise.reject(error);
    }
  );

  return client;
}
