"use client"
import {useGetAllUsersQuery} from "@/lib/features/users/userApiSlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {NotepadText, Send} from "lucide-react";
import {Any} from "@react-spring/types";
import {UserFormComponent} from "@/app/components/form/Forms";
import {useRouter} from "next/navigation";
export default function UserDetail({data:any}) {
    const {data,isLoading} = useGetAllUsersQuery(undefined,{refetchOnFocus: true});
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("User :Data ",data)
    return (<div className={"w-full"}>
        <User users={data}/>
    </div>)
}

export const User = ({users}:{users:Any})=>{
    const router = useRouter()
    console.log(users);
    const gotoDetail = (id) => {
        router.push(`/user/users/${id}`)
    }
    return ( <div className="p-4  w-full rounded-md ">
        <div className="font-mono w-full py-2 px-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-xs font-semibold text-gray-400 uppercase rounded-t">
            <div className="mx-1 text-left hover:text-black transition-all duration-300">User</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Username</div>
            <div className="mx-1 text-end hidden md:block hover:text-black transition-all duration-300">Role</div>
            <div className="mx-1 text-end hidden lg:block hover:text-black transition-all duration-300">Billing Info</div>
            <div className="mx-1 text-end hover:text-black transition-all duration-300">Actions</div>
        </div>
        {users?.map((user) => (
            <UserRecord key={user._id} user={user} gotoDetail={gotoDetail} />
        ))}
    </div>)
}
const UserRecord = ({ user, gotoDetail }) => {
    return (
        <div className="border w-full my-3 py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center px-2 bg-white rounded hover:shadow-sm shadow-slate-300 transition-all duration-300">

            {/* User Profile & Email (Hidden in sm) */}
            <div className="flex items-center justify-start mx-1 hover:px-2 transition-all duration-300">
                <img src={user.profileUrl} className="w-12 h-12 rounded-md border me-3 hidden md:block" alt="User Profile" />
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {user?.contact?.email}
                </div>
            </div>

            {/* Username */}
            <div className="mx-1 flex justify-end transition-all duration-300">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {user?.username}
                </div>
            </div>

            {/* Phone Number (Hidden in sm, visible in md and up) */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden md:flex">
                <div className="align-middle w-fit rounded text-lime-950 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-orange-100/[0.9] bg-orange-300 hover:border">
                    {user?.role}
                </div>
            </div>

            {/* Billing Info (Hidden in sm, visible in lg and up) */}
            <div className="mx-1 flex justify-end transition-all duration-300 hidden lg:flex">
                <div className="align-middle w-fit rounded text-zinc-600 transition-all duration-300 hover:text-black px-1 font-mono my-1 hover:bg-slate-100/[0.9] hover:border">
                    {(user?.billInfo) == "" ?"Empty":user?.billInfo}
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
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription asChild>
                                <div>
                                    <UserFormComponent data={user} />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Go to Detail Button */}
                <button onClick={() => gotoDetail(user?._id)} className="hover:bg-blue-500 hover:text-white hover:p-1 rounded hover:border transition-all duration-300">
                    <Send />
                </button>
            </div>
        </div>
    );
};

