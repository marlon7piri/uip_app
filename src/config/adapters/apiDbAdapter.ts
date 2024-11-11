import { AxiosAdapter } from "./http/axiosAdapter";

export const fetcherDb = new AxiosAdapter({
  baseUrl: `http://localhost:3003/api/v1`,
  params: {},
});
