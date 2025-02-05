import React from "react";
import AlbumDetail from "@/app/components/albums/AlbumDetail";

export default function Page({params}:{params:{id:String}}) {
    return <div>
        {/*Hello {params.id}*/}

        <AlbumDetail albumId={params.id}/>
    </div>
}