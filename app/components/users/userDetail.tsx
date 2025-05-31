"use client"
import {useGetAllUsersQuery,useGetUserByIdQuery} from "@/lib/features/users/userApiSlice";
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/app/components/ui/dialog"
import {CircleDotDashed, Loader, NotepadText, ScanSearch, Search, Send, Trash} from "lucide-react";
import {Any} from "@react-spring/types";
import {UserFormComponent} from "@/app/components/form/Forms";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/components/ui/select";

const StatusFilter = (props:{onChange: (value: string) => void}) =>{
    return (<div className="  flex  hover:border rounded">
        <Select onValueChange={props.onChange} >
            <SelectTrigger className="border-none shadow-none hover:border font-mono outline-none text-xs">
                <SelectValue placeholder={"Role"}/>
                <div className={"mx-3"}></div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"admin"} >Admin</SelectItem>
                <SelectItem value={"user"} >User</SelectItem>
                <SelectItem value={"reset"}><Trash className={"size-4"}/></SelectItem>
            </SelectContent>
        </Select>
    </div>)
}
export default function UserDetail({data:any}) {
    const [filter,setFilter] = useState("");
    const [user_role,setRole] = useState("");
    const {data,isLoading} = filter==""?useGetAllUsersQuery(undefined,{refetchOnFocus: true}):useGetUserByIdQuery(filter,{refetchOnFocus:true});
    if(isLoading){
        return (<div>Loading</div>)
    }
    console.log("User :Data ",data);
    const filter_user = user_role == ""|user_role == "reset" ? data:data.filter(user =>user.role == user_role);
    return (<div className={"w-full"}>
        <div className={"flex justify-center"}>
            <div className={" md:w-2/6 w-5/6 flex items-center hover:my-4 transitions-all duration-300 rounded overflow-hidden border shadow hover:shadow-none"}>
                <input onChange={(e)=>setFilter(e.target.value)} value={filter} className={"  w-5/6 text-xs font-mono  py-3  px-3   "} placeholder={"Enter username"}/>
                <StatusFilter onChange={value => setRole(value)} />
            </div>
        </div>
        <User users={filter_user}/>
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
        {users.length == 0?<div className={"flex justify-center font-mono items-center my-12 "}>
            <div className={"text-slate-300 hover:text-black transition-all duration-300"}>No Result</div>
            <Loader className={"size-4 animate-spin m-5"}/></div>:(users?.map((user) => (
            <UserRecord key={user._id} user={user} gotoDetail={gotoDetail} />
        )))}
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

