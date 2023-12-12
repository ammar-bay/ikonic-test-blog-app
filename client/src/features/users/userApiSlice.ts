import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserByUsername: builder.query({
            query: (username) => `/users/${username}`, // Adjust the endpoint as needed
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useGetUserByUsernameQuery,
} = usersApiSlice;
