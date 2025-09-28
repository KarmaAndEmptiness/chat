import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getToken } from "./auth";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 10000, 
  withCredentials: false, 
});
const requestOnFulfilled: (
  value: InternalAxiosRequestConfig<any>
) =>
  | InternalAxiosRequestConfig<any>
  | Promise<InternalAxiosRequestConfig<any>> = (
  config: InternalAxiosRequestConfig<any>
) => {
  const token: string = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
service.interceptors.request.use(requestOnFulfilled);

const responseOnFulfilled: (
  value: AxiosResponse<any, any, {}>
) => AxiosResponse<any, any, {}> | Promise<AxiosResponse<any, any, {}>> = (
  response: AxiosResponse<any, any, {}>
) => {
  if (response.status == 200) {
    return response.data;
  }
  if (response.status == 401) {
  }
  return response;
};

service.interceptors.response.use(responseOnFulfilled);

export function get<T=any>(url: string, params?: object): Promise<T> {
  return service.get(url, { params });
}

export function post<T=any>(url: string, data?: object): Promise<T> {
  return service.post(url, data);
}

export function put<T=any>(url: string, data?: object): Promise<T> {
  return service.put(url, data);
}

export function del<T=any>(url: string, params?: object): Promise<T> {
  return service.delete(url, { params });
}
