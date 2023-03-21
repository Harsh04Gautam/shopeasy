import { apiSlice } from "../../api/apiSlice";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type LoginUserInput = {
  email: string;
  password: string;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.query<{ accessToken: string | null }, void>({
      query: () => ({
        url: "/auth/refreshtoken",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: { data: { accessToken: string } }) => {
        return { accessToken: response?.data?.accessToken || null };
      },
    }),

    signUpUser: builder.mutation({
      query: ({ ...body }: CreateUserInput) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      transformResponse: () => {
        return { message: "we have sent you a verification mail!" } as const;
      },
    }),

    signInUser: builder.mutation({
      query: ({ ...body }: LoginUserInput) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      transformResponse: () => {
        return { message: "you have successfully logged in" } as const;
      },
      transformErrorResponse: (response) => {
        if (response?.status === 400)
          return "invalid email or password, could not login";
        return "could not login";
      },
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
} = userApiSlice;
