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
        baseQuery: fetchBaseQuery({baseUrl: BackEND_URL}),
        reducerPath: "albumAPI",
        // prepareHeaders: (headers, {getState}) => {
        // // By default, if we have a token in the store, let's use that for authenticated requests
        // const state = (getState() as RootState);
        // console.log('prepareHeaders State  >>>>', state);
        // if(state.auth.token)
        // {
        //     headers.set('Authorization', 'Bearer '+state.auth.TOKEN);
        // }
        // return headers;
        // },
        tagTypes: ["ALBUMS"],
        endpoints: (build) => ({
            getAlbums: build.query<Album[]>({
                query: () => `/albums`,
                providesTags: () => ["ALBUMS"],
            }),
            getAlbumByID:build.query<Album[]>({
                query: (id) => `/albums/${id}`,
                providesTags: () => ["ALBUMS"],
            }),
            getAlbumByFilter:build.query<Album[]>({
                query: (filter) => `/albums/${filter}`,
                providesTags: () => ["ALBUMS"],
            }),
            getAlbumByGenre:build.query<Album[]>({
                query: (filter) => `/albums/genre/${filter}`,
                providesTags: () => ["ALBUMS"],
            })
        })
    }
);

export const {useGetAlbumsQuery,useGetAlbumByIDQuery,useGetAlbumByGenreQuery,useGetAlbumByFilterQuery} = albumAPISlice;
