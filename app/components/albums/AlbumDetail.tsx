"use client"
import {useGetAlbumByIDQuery} from "@/lib/features/albums/albumAPISlice";
import {useRouter} from "next/navigation";
export default function AlbumDetail({albumId}:{string}) {
    const router = useRouter();
    const {data,isLoading,isError} = useGetAlbumByIDQuery(albumId);
   if(isLoading){
       return<div>
           Loadig.....
       </div>
   }else if(isError){
       return <div>
           isError
       </div>
   }
   const btnBackHandler = () => {
       router.push('/albums');
   }
    console.log("Data",data)
    return<div key={Math.random()}>
        Hello World {albumId}
        <h5>{data.title}</h5>
        <img src={data.albumUrl}/>
        <h5>{data.artist}</h5>
        <h2>{(data.genreId).map(a=>(<div key={a._id}>{a.genre}</div>))}</h2>
        <h1>Song</h1>
        {data.songs?.map(song=><div key={song._id}>{song}</div>)}
        <h1>Price</h1>
        {data.price['$numberDecimal']}
        <h4>MetaData</h4>
        <div>{data.metadata.createdAt}</div>
        <div>{data.metadata.updatedAt}</div>

        <button onClick={btnBackHandler} type={"button"}>Go Back</button>
    </div>

}