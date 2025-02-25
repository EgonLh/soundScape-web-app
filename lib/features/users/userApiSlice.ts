import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const BackEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;





export const UserApiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl: BackEND_URL}),
    reducerPath: "UserAPI",
    tagTypes:["USERS"],
    endpoints: (build) => ({
        getAllUsers: build.query<>({
            query: () => `/users`,
            providesTags: () => ["USERS"],
        }),
    })
})


export const {useGetAllUsersQuery} = UserApiSlice;
