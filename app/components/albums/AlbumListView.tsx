"use client"
import {useGetAlbumsQuery} from "@/lib/features/albums/albumAPISlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText,FilePlus,Search} from "lucide-react";
import {Any} from "@react-spring/types";
import {AlbumCreateFormComponent, AlbumFormComponent} from "@/app/components/form/Forms";
import {useState} from "react";
export default function AlbumListView({ data }: { data: any }) {
    const { data: albumData, isLoading } = useGetAlbumsQuery(); // Assuming you're using RTK Query to fetch albums

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchToggle = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        console.log(searchQuery)
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredAlbums = albumData?.filter((album: any) => {
        return album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            album.artist.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="w-full">
            <div className="w-full py-2 px-4 flex justify-end space-x-2">
                <div>
                    <Dialog>
                        <DialogTrigger>
                            <div className="hover:bg-black hover:text-white hover:p-1 rounded hover:border transition-all duration-300">
                                <FilePlus />
                            </div>
                        </DialogTrigger>
                        <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
                            {/*scrollable dialog*/}
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription asChild>
                                    <div>
                                        <AlbumCreateFormComponent />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <div
                    className="hover:bg-black  hover:text-white hover:p-1 rounded hover:border transition-all duration-300 cursor-pointer"
                    onClick={handleSearchToggle}
                >
                    <Search />
                </div>
            </div>

            {isSearchVisible && (
                <div className="my-3 transition-all duration-300 px-4 w-full flex justify-center ">
                    <div className={"md:w-3/5 w-4/5 flex justify-center "}>
                        <input
                            type="text"
                            placeholder="Search albums or artists..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                </div>
            )}

            <Album albums={filteredAlbums} />
        </div>
    );
}

export const Album = ({albums}:{albums:Any})=>{
    console.log(albums)
    return ( <div className="p-4  w-full rounded-md ">

        <div className=" w-full py-2 px-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-xs font-semibold text-gray-600 uppercase rounded-t">
            <div className="mx-1 text-left hover:text-black transition-all duration-300">Album</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Artist</div>
            <div className="mx-1 text-end hidden md:block hover:text-black transition-all duration-300">Price</div>
            <div className="mx-1 text-end hidden lg:block hover:text-black transition-all duration-300">Status</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Actions</div>
        </div>
        {albums?.map((album) => (
            <AlbumRecord key={album._id} album={album} />
        ))}
    </div>)
}

const AlbumRecord = ({ album }) => {
    return (
        <div className="border w-full my-3 py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300">

            {/* Album Image & Title */}
            <div className="flex items-center justify-start mx-1 hover:px-2 transition-all duration-300">
                <img src={album?.albumUrl} className="w-12 h-12 rounded-full border me-3" alt="Album Image" />
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {album?.title}
                </div>
            </div>

            {/* Artist */}
            <div className="mx-1 flex justify-end transition-all duration-300">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {album?.artist}
                </div>
            </div>

            {/* Price (Hidden on sm screens, visible on md and up) */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden md:flex">
                <div className="align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border">
                    {album?.price?.$numberDecimal}
                </div>
            </div>

            {/* Artist (Repeating, same as above, for larger screens) */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden lg:flex">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {album?.status}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="text-zinc-500 flex justify-end text-end mx-3 space-x-2">
                {/* Dialog Button */}
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
                                    <AlbumFormComponent data={album} />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
