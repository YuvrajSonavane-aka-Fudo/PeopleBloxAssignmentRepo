import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const imdbApi = createApi({
  reducerPath: "imdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
  }),

  endpoints: () => ({
    //Write your endpoints here
  }),
});

export const {} = imdbApi;

export default imdbApi;
