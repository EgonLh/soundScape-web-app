'use client';
import AlbumList from "@/app/components/albums/albumList";
import isAuth from "@/app/components/Auth/isAuth";

function Albums() {
    return (<div className={"container w-5/6 "}>
        <AlbumList/>
    </div>)
}

export default isAuth(Albums);

// export default (Albums);