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
    } catch (error) {
      throw new Error(`Error fetching get :${url}`);
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
    } catch (error) {
      throw new Error(`Error creating post :${url}`);
    }
  }

  async put<T>(url: string, item?: unknown, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.put<T>(url, item,options)
      return data
    } catch (error) {
      throw new Error("Error editing player" + error)
    }
  }
  async delete<T>(url: string,options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url,options)
      return data
    } catch (error) {
      throw new Error("Error deleting player" + error)
    }
  }
}
