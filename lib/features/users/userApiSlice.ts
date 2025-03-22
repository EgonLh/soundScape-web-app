import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BackEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface User {
    _id: string;
    username: string;
    name: {
        firstName: string;
        lastName: string;
        _id: string;
    };
    contact: {
        email: string;
        phoneNo: string;
        _id: string;
    };
    billInfo: string;
    metadata: {
        createdAt: string;
        updatedAt: string;
        _id: string;
    };
    password: string;
    profileUrl: string;
    role: string;
    __v: number;
}

export const UserApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BackEND_URL }),
    reducerPath: "UserAPI",
    tagTypes: ["USERS"],
    endpoints: (build) => ({
        getAllUsers: build.query<User[], void>({
            query: () => `/users`,
            providesTags: () => ["USERS"],
        }),
        getUserById: build.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: () => ["USERS"],
        }),
        updateUser: build.mutation<User, { id: string; userInfo: Partial<User> }>({
            query: ({ userId, userInfo }) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: userInfo,
            }),invalidatesTags:["USERS"],
        }),
        deleteUser: build.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = UserApiSlice;
