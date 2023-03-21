import { apiSlice } from "../../api/apiSlice";

export type TProduct = {
  id: string;
  name: string;
  description: string;
  category: "laptop" | "headphone" | "phone" | "tablet" | "camera" | "other";
  price: number;
  stock: number;
  brand: string;
  color: string;
  image: string;
  reviews: unknown[];
  averageRating: number;
  ratingsQuentity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SearchParams = {
  name?: string;
  limit?: number;
  page?: number;
  ["price[gte]"]?: number;
  ["price[lte]"]?: number;
  ["averageRating[gte]"]?: number;
  ["averageRating[lte]"]?: number;
};

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDisplayProducts: builder.query<TProduct[], Number>({
      query: (totalProducts) => ({
        url: `/products?limit=${totalProducts}`,
        method: "GET",
      }),
      transformResponse: (response: { data: { product: TProduct[] } }) => {
        const products = response?.data?.product;
        return products;
      },
    }),

    fetchSearchedProducts: builder.query<TProduct[], SearchParams>({
      query: (params) => ({
        url: `/products`,
        params,
      }),
      transformResponse: (response: { data: { product: TProduct[] } }) => {
        const products = response?.data?.product;
        return products;
      },
    }),
    fetachProductById: builder.query<TProduct, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { product: TProduct }) => {
        const product = response?.product;
        return product;
      },
    }),
  }),
});

export const {
  useFetchDisplayProductsQuery,
  useFetachProductByIdQuery,
  useFetchSearchedProductsQuery,
} = productsApiSlice;
