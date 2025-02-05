import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";//This mfffff

import {Meta_data} from "@/lib/features/albums/albumAPISlice";
const BackEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Here is the url", BackEND_URL);
export interface Genre {
    "genre" : String,
    "description":String,
    "metadata":Meta_data,
}
export const genreAPISlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:BackEND_URL}),
    reducerPath:"genreAPI",
    tagTypes:["GENRES"],
    endpoints:(build) => ({
        getAllGenres: build.query<Genre[]>({
            query:()=>`/genres`,
            providesTags:()=>["GENRES"]
        })
    })
})

export const {useGetAllGenresQuery} = genreAPISlice;
