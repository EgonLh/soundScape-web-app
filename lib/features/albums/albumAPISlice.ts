import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";//This mfffff

const BackEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Here is the url", BackEND_URL);

export interface Meta_data {
    "createdAt": String,
    "updatedAt": String
}

export interface Album {
    "_id": String;
    "title": String;
    "albumUrl": String;
    "artist": String
    "genreId": String
    "releaseDate": String
    "description": String
    "songs": String[],
    "price": Number,
    "metadata": Meta_data
}


export const albumAPISlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BackEND_URL }),
    reducerPath: "albumAPI",
    tagTypes: ["ALBUMS"],
    endpoints: (build) => ({
        // GET all albums
        getAlbums: build.query<Album[]>({
            query: () => `/albums`,
            providesTags: ["ALBUMS"],
        }),
        // GET an album by ID
        getAlbumByID: build.query<Album, string>({
            query: (id) => `/albums/${id}`,
            providesTags: ["ALBUMS"],
        }),
        // GET albums based on a filter
        getAlbumByFilter: build.query<Album[], string>({
            query: (filter) => `/albums/${filter}`,
            providesTags: ["ALBUMS"],
        }),
        // GET albums by genre
        getAlbumByGenre: build.query<Album[], string>({
            query: (genre) => `/albums/genre/${genre}`,
            providesTags: ["ALBUMS"],
        }),
        // CREATE a new album
        createAlbum: build.mutation<Album, Partial<Album>>({
            query: (newAlbum) => ({
                url: `/albums`,
                method: "POST",
                body: newAlbum,
            }),
            invalidatesTags: ["ALBUMS"],
        }),
        // UPDATE an album by ID
        updateAlbum: build.mutation<Album, { id: string; updatedAlbum: Partial<Album> }>({
            query: ({ id, updatedAlbum }) => ({
                url: `/albums/${id}`,
                method: "PUT",
                body: updatedAlbum,
            }),
            invalidatesTags: ["ALBUMS"],
        }),
        // DELETE an album by ID
        deleteAlbum: build.mutation<{ id: string }, string>({
            query: (id) => ({
                url: `/albums/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ALBUMS"],
        }),
    }),
});

export const {useGetAlbumsQuery,useGetAlbumByIDQuery,useGetAlbumByGenreQuery,useGetAlbumByFilterQuery,useCreateAlbumMutation,useUpdateAlbumMutation,useDeleteAlbumMutation} = albumAPISlice;
