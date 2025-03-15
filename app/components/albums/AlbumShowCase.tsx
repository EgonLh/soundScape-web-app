import {useGetAlbumByGenreQuery, useGetAlbumsQuery} from "@/lib/features/albums/albumAPISlice";
import {useGetAllGenresQuery} from "@/lib/features/genres/genreAPISlice";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {MinusCircleIcon} from '@heroicons/react/24/outline'
import {AlbumCard} from "@/app/components/albums/AlbumCard";


export function AlbumFiter() {
    const [id,setId] = useState("");
    const [genre,setG] = useState("")
    const {data,isLoading,isError} = useGetAllGenresQuery();
    const setGenre = (data_id,genre)=>{
       setId(data_id);
       setG(genre);
    }

    const checkGenre = (_genre) => {
        if(_genre == genre){
            return ("bg-zinc-800")
        }else {
            return '';
        }
    }
    if(isLoading){
        return <div>
            Loading....
        </div>
    }else if(isError){
        return (<div>
            IS Error..
        </div>)
    }
    return (<div>


        <div className={"flex justify-between"}>
            <div>
                {
                    data.map(a => <button type={"button"} key={a._id} className={`active:border rounded text-sm font-semibold text-slate-400 me-3 px-3 hover:bg-black rounded hover:px-4 transition-all ease-in-out hover:text-white py-1 duration-300 ${checkGenre(a.genre)}`} onClick={()=>setGenre(a._id,a.genre)}>{a.genre}</button>)
                }
            </div>
            <button type={"button"} className={" rounded text-sm font-semibold text-slate-400 me-3 px-3 hover:font-bold text-zinc-300 hover:text-zinc-500 rounded hover:px-4 transition-all ease-in-out py-1 duration-300 "} onClick={()=>setGenre("")}>
                <MinusCircleIcon className={"size-4 font-semibold"}/>
            </button>
        </div>
        {id==""?<AllAlbum/>:<AlbumData albumData={id} key={"id"}/>}
    </div>)
}
function AllAlbum() {
    const {data,isLoading,isError,isSuccess,refetch} = useGetAlbumsQuery();

    if(isLoading){
        return(<div>
            isLoading
        </div>)
    }
    const limit = 8;
    const limitedData = data.slice(0, limit);
    return (<div className={"grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 my-4 "}>
        {limitedData.map(a => <AlbumCard key={a._id} a={a}/>)}
    </div>)
}


export function AlbumData(props){
    console.log("The data :",props.albumData);
    const {data,isLoading,isError} = useGetAlbumByGenreQuery(props.albumData);
    const path = usePathname();
    console.log("Data",data)
    if(isLoading){
        return <div>
            Loading....
        </div>
    }else if(isError){
        return (<div>
            IS Error..
        </div>)
    }
    return(<div className={"grid lg:grid-cols-4 grid-cols-2 gap-10 my-4"}>
        {data.map(a => <AlbumCard key={a._id} a={a}/>)}
    </div>)
}