"use client"
import {useGetAllGenresQuery} from "@/lib/features/genres/genreAPISlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText} from "lucide-react";
export default function GenreDetail({data:any}) {
    const {data,isLoading} = useGetAllGenresQuery();
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("Genre :Data ",data)
    return (<div className={"w-full"}>
        <Genre genres={data}/>
    </div>)
}

export const Genre = ({genres}:{genres:Any})=>{
    console.log(genres);
    return ( <div className="p-4  w-full rounded-md border">
        <h2 className="text-2xl font-bold mb-4">Genre List</h2>
        {genres?.map((genre) => (
            <div className={"border w-full my-3 py-4 grid grid-cols-5 flex items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300"} key={genre._id}>
                <div className={"flex items-center justify-start 2/8  mx-1 flex justify-start hover:px-2  transition-all duration-300"}>
                    <div className={" align-middle w-fit rounded  text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{genre.genre}</div>
                </div>
                <div className={"  mx-1 flex justify-end transition-all duration-300 "}>
                    <div className={" align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border"}>{genre?.metadata.createdAt}</div>
                </div>
                <div className={" text-zinc-500 flex justify-end text-end mx-3"}>
                    <Dialog>
                        <DialogTrigger><div className={"hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300"}><NotepadText/></div> </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle >Are you absolutely sure?</DialogTitle>
                                <DialogDescription asChild>
                                    <div>
                                        {/*<FormComponent data={order} />*/}
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

