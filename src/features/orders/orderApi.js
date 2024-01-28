import apiSlice from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "orders.json",
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
