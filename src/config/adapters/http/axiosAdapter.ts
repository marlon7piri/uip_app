import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpAdapter } from "./httpAdapter";

interface Options {
  baseUrl: string;
  params: Record<string, string>;
}
export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    });
  }

  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);

      return data;
    }catch (error:any) {
      const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      `Error al hacer GET a ${url}`;

    throw new Error(message);
    }
  }

  async post<T>(
    url: string,
    item: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.axiosInstance.post<T>(url, item, options);

      return data;
    } catch (error:any) {
      const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      `Error al hacer POST a ${url}`;

    throw new Error(message);
    }
  }

  async put<T>(url: string, item?: unknown, options?: AxiosRequestConfig): Promise<any> {
    try {
      const res = await this.axiosInstance.put<T>(url, item,options)
      return res
    } catch (error:any) {
      const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      `Error al hacer PUT a ${url}`;

    throw new Error(message);
    }
  }
  async delete<T>(url: string,options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url,options)
      return data
    }  catch (error:any) {
      const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      `Error al hacer DELETE a ${url}`;

    throw new Error(message);
    }
  }
}
