"use client"
import AlbumList from "@/app/components/albums/albumList";
import isAuth from "@/app/components/Auth/isAuth";

function AlbumLists() {
    return (<AlbumList/>)
}

export default isAuth(AlbumLists);