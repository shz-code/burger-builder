import apiSlice from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (id) => `order/${id}`,
    }),
    init: builder.mutation({
      query: (body) => ({
        url: `order`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useInitMutation } = orderApi;
