import { AxiosAdapter } from "./http/axiosAdapter";

export const fetcherDb = new AxiosAdapter({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  params: {},
});
