"use client"
import {useGetAlbumsQuery} from "@/lib/features/albums/albumAPISlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText} from "lucide-react";
import {Any} from "@react-spring/types";
import FormComponent, {ProductFormComponent} from "@/app/components/form/Forms";
export default function AlbumListView({data:any}) {
    const {data,isLoading} = useGetAlbumsQuery();
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("Album :Data ",data)
    return (<div className={"w-full"}>
        <Album albums={data}/>
    </div>)
}

export const Album = ({albums}:{albums:Any})=>{
    console.log(albums)
    return ( <div className="p-4  w-full rounded-md border">
        <h2 className="text-2xl font-bold mb-4">albums List</h2>
        {albums?.map((album) => (
            <div className={"border w-full my-3 py-4 grid grid-cols-5 flex items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300"} key={album._id}>
                <div className={"flex items-center justify-start 2/8  mx-1 flex justify-start hover:px-2  transition-all duration-300"}>
                    <img src={album?.albumUrl} className={"max-w-12 rounded-full border me-3"}/>
                    <div className={" align-middle w-fit rounded  text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{album?.title}</div>
                </div>
                <div className={"  mx-1 flex justify-end transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{album?.artist}</div>
                </div>
                <div className={"  mx-1 flex justify-end   transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border"}>{album?.price.$numberDecimal}</div>
                </div>
                <div className={"  mx-1 flex justify-end  transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{album?.artist}</div>
                </div>
                <div className={" text-zinc-500 flex justify-end text-end mx-3"}>

                    <Dialog>
                        <DialogTrigger><div className={"hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300"}><NotepadText/></div> </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription asChild>
                                   <div>
                                       <ProductFormComponent data={album}/>
                                   </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        ))}
    </div>)
}

