"use client"
import {useGetAllGenresQuery} from "@/lib/features/genres/genreAPISlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText} from "lucide-react";
import {GenreFormComponent} from "@/app/components/form/Forms";
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
    return ( <div className="p-4  w-full  ">
        <div className=" w-full py-3 px-2 grid grid-cols-3  text-xs font-semibold text-gray-500 uppercase rounded-t">
            <div className="mx-1 text-left hover:text-black transition-all duration-300">Genre</div>
            <div className="mx-1 text-center hover:text-black transition-all duration-300">Created At</div>
            <div className="mx-1 text-center hover:text-black transition-all duration-300">Actions</div>
        </div>

        {/* Genre Rows */}
        {genres?.map((genre) => (
            <GenreRecord key={genre._id} genre={genre} />
        ))}
    </div>)
}
const GenreRecord = ({ genre }) => {
    return (
        <div className=" border w-full my-3 py-4 grid grid-cols-3 items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300 ">
            {/* Genre Name */}
            <div className="flex items-center justify-start mx-1 transition-all duration-300">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {genre?.genre}
                </div>
            </div>

            {/* Created Date (Centered) */}
            <div className="mx-1 flex justify-center transition-all duration-300">
                <div className="align-middle w-fit max-w-[160px] truncate overflow-hidden whitespace-nowrap rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {genre?.metadata?.createdAt}
                </div>
            </div>

            {/* Actions (Stuck to the right) */}
            <div className="text-zinc-500 flex justify-end text-end mx-3 bg">
                <Dialog>
                    <DialogTrigger>
                        <div className="hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300">
                            <NotepadText />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription asChild>
                                <div>
                                    {/* <FormComponent data={genre} /> */}
                                    <GenreFormComponent data={genre} />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};